import {
    CancellationToken,
    Color,
    ColorPresentation,
    Range,
    TextDocument,
    TextEdit,
} from "vscode";
import { RangeProcessor } from "./rangeProcessor";
import { ColorSpace } from "./colorSpace";
import { ColorCoordinate } from "./colorCoordinate";
import { ExtractionResult } from "./extractor/extractionResult";
import { ColorDefinitionBevy } from "./colorDefinitionBevy";

export class ColorPresenter {
    private rangeProcessor: RangeProcessor;

    constructor(rangeProcessor: RangeProcessor) {
        this.rangeProcessor = rangeProcessor;
    }

    buildColorPresentations(
        color: Color,
        context: { document: TextDocument; range: Range },
        token: CancellationToken
    ): ColorPresentation[] {
        const { document, range } = context;
        const text = document.getText(range);

        const colorPresentations: ColorPresentation[] = [];
        for (const extraction of this.rangeProcessor.process(
            text,
            range,
            token
        )) {
            const colorPresentation = this.buildColorPresentation(
                color,
                range,
                extraction
            );

            colorPresentations.push(colorPresentation);
        }

        return colorPresentations;
    }

    private buildColorPresentation(
        color: Color,
        range: Range,
        extraction: ExtractionResult
    ): ColorPresentation {
        const sourceCoordinate = new ColorCoordinate(
            color.red,
            color.green,
            color.blue
        );

        const sourceColorSpace = ColorSpace.Srgb;
        const targetColorSpace = extraction.colorSpace.value;
        const targetCoordinate = sourceCoordinate.convertColorCoordinate(
            sourceColorSpace,
            targetColorSpace
        );

        const first = this.formatNumber(targetCoordinate.first);
        const second = this.formatNumber(targetCoordinate.second);
        const third = this.formatNumber(targetCoordinate.third);

        const alpha = color.alpha;
        const hasAlpha = alpha !== 1.0;

        const definition = ColorDefinitionBevy.fromColorSpace(targetColorSpace);
        const bevyColorFunction = definition.functionNames[hasAlpha ? 0 : 1];

        const values = [first, second, third];
        if (alpha !== 1.0) {
            const formattedAlpha = this.formatNumber(alpha);
            values.push(formattedAlpha);
        }

        const valueString = values.join(", ");

        const colorLabel = `Color::${bevyColorFunction}(${valueString})`;
        const colorPresentation = new ColorPresentation(colorLabel);

        // Separate edit from label because entries with namespace are to long for the preview
        const nameSpace = extraction.nameSpace.value;
        const colorReplacement = `${nameSpace}${colorLabel}`;
        const textEdit = new TextEdit(range, colorReplacement);
        colorPresentation.textEdit = textEdit;

        return colorPresentation;
    }

    private formatNumber(number: number): string {
        if (Number.isNaN(number)) {
            return "f32::NAN";
        }

        return number.toFixed(2);
    }
}
