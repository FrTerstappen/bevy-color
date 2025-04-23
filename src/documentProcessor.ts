import {
    CancellationToken,
    ColorInformation,
    Diagnostic,
    DiagnosticCollection,
    Range,
    TextDocument,
    TextLine,
} from "vscode";
import { RangeProcessor } from "./rangeProcessor";
import { ExtractionResult } from "./extractor/extractionResult";

export class DocumentProcessor {
    private diagnosticCollection: DiagnosticCollection;
    private rangeProcessor: RangeProcessor;

    constructor(
        diagnosticCollection: DiagnosticCollection,
        rangeProcessor: RangeProcessor
    ) {
        this.diagnosticCollection = diagnosticCollection;
        this.rangeProcessor = rangeProcessor;
    }

    process(
        document: TextDocument,
        token: CancellationToken
    ): ColorInformation[] {
        const colorInformation: ColorInformation[] = [];
        const markedRanges: Range[] = [];

        const diagnostics: Diagnostic[] = [];

        for (
            let lineNumber = 0;
            lineNumber < document.lineCount;
            lineNumber++
        ) {
            if (token.isCancellationRequested) {
                break;
            }

            const line = document.lineAt(lineNumber);

            for (const extraction of this.processLine(line, token)) {
                const color = extraction.getColorInformation();

                if (color) {
                    const range = color.range;

                    // Skip ranges intersecting with existing
                    // Otherwise tailwinds RED_500 would later match RED from the css colors
                    const isAlreadyMarked = markedRanges.some(
                        (markedRange) =>
                            markedRange.intersection(range) !== undefined
                    );

                    if (!isAlreadyMarked) {
                        colorInformation.push(color);
                        markedRanges.push(range);
                    }
                }

                for (const diagnostic of extraction.getDiagnostics()) {
                    diagnostics.push(diagnostic);
                }
            }
        }

        const diagnosticsCount = diagnostics.length;
        const uri = document.uri.toString();
        if (diagnosticsCount > 0) {
            const countString = diagnosticsCount.toString();
            console.info(`Adding ${countString} diagnostics to ${uri}`);

            this.diagnosticCollection.set(document.uri, diagnostics);
            return colorInformation;
        }

        console.info(`Deleting diagnostics from ${uri}`);
        this.diagnosticCollection.delete(document.uri);

        return colorInformation;
    }

    private *processLine(
        line: TextLine,
        token: CancellationToken
    ): Generator<ExtractionResult> {
        if (line.isEmptyOrWhitespace) {
            return;
        }

        const text = line.text;
        const range = line.range;

        try {
            for (const extraction of this.rangeProcessor.process(
                text,
                range,
                token
            )) {
                yield extraction;
            }
        } catch (error) {
            console.error("Failed to process range", line.lineNumber, error);
        }
    }
}
