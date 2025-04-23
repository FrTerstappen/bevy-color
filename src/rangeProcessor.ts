import { CancellationToken, Position, Range } from "vscode";
import { ColorExtractor } from "./extractor/colorExtractor";
import { ExtractionResult } from "./extractor/extractionResult";
import { ColorRegExpBuilder } from "./extractor/colorRegExpBuilder";

export class RangeProcessor {
    private colorRegExpBuilder: ColorRegExpBuilder;
    private colorExtractors: [RegExp, ColorExtractor][];

    constructor() {
        this.colorRegExpBuilder = new ColorRegExpBuilder();
        this.colorExtractors = [];
    }

    addColorExtractor(colorExtractor: ColorExtractor) {
        const regularExpressions = colorExtractor.buildRegularExpressions(
            this.colorRegExpBuilder
        );

        for (const regularExpression of regularExpressions) {
            const extractor: [RegExp, ColorExtractor] = [
                regularExpression,
                colorExtractor,
            ];
            this.colorExtractors.push(extractor);
        }
    }

    *process(
        text: string,
        range: Range,
        token: CancellationToken
    ): Generator<ExtractionResult> {
        for (const [regExp, colorExtractor] of this.colorExtractors) {
            if (token.isCancellationRequested) {
                break;
            }

            for (const newExtractedInformation of this.extractColorInformation(
                text,
                range,
                regExp,
                colorExtractor,
                token
            )) {
                yield newExtractedInformation;
            }
        }
    }

    private *extractColorInformation(
        text: string,
        range: Range,
        regExp: RegExp,
        colorExtractor: ColorExtractor,
        token: CancellationToken
    ): Generator<ExtractionResult> {
        const matches = text.matchAll(regExp);

        for (const match of matches) {
            if (token.isCancellationRequested) {
                break;
            }

            const extraction = this.extractColorInformationFromMatch(
                range,
                match,
                colorExtractor
            );

            if (extraction) {
                yield extraction;
            }
        }
    }

    private extractColorInformationFromMatch(
        range: Range,
        match: RegExpExecArray,
        colorExtractor: ColorExtractor
    ): ExtractionResult | undefined {
        if (!range.isSingleLine) {
            console.error("Unable to process multi line range");
            return undefined;
        }

        const start = range.start;
        const line = start.line;

        const matchLength = match[0].length;

        const matchStart = new Position(line, match.index);
        const matchEnd = new Position(start.line, match.index + matchLength);
        const matchRange = new Range(matchStart, matchEnd);

        const extraction = colorExtractor.extract(matchRange, match);
        return extraction;
    }
}
