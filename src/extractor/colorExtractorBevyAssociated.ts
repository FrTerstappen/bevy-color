import { ColorSpace, fromBevyName } from "../colorSpace";
import { ColorExtractor } from "./colorExtractor";
import { Range } from "vscode";
import { ExtractionResult, ExtractionSource } from "./extractionResult";
import { ColorRegExpBuilder } from "./colorRegExpBuilder";
import { ExtractedValue } from "./extractedValue";
import { ExtractedNumber } from "./extractedNumber";
import { alphaNumberRange } from "../numberRange";
import { ColorDefinitionBevy } from "../colorDefinitionBevy";

export class ColorExtractorBevyAssociated implements ColorExtractor {
    buildRegularExpressions(colorRegExpBuilder: ColorRegExpBuilder): RegExp[] {
        const variants: ColorSpace[] = [
            ColorSpace.Srgb,
            ColorSpace.LinearRgb,
            ColorSpace.Hsl,
            ColorSpace.Hsv,
            ColorSpace.Hwb,
            ColorSpace.Lab,
            ColorSpace.Lch,
            ColorSpace.OkLab,
            ColorSpace.OkLch,
            ColorSpace.Xyz,
        ];

        const regularExpressions = [];
        for (const variant of variants) {
            const colorSpace = variant;

            const regularExpression =
                colorRegExpBuilder.buildAssociatedCapture(colorSpace);
            regularExpressions.push(regularExpression);
        }

        const colorAssociatesRegularExpression =
            colorRegExpBuilder.buildAssociatedTypeCapture(
                "Color",
                ["BLACK", "WHITE", "NONE"],
                false
            );
        regularExpressions.push(colorAssociatesRegularExpression);

        return regularExpressions;
    }

    extract(
        range: Range,
        match: RegExpExecArray
    ): ExtractionResult | undefined {
        if (match.length !== 4) {
            console.error("Wrong match length", match);
            return undefined;
        }

        const nameSpace = match.at(1) ?? "";
        const extractedNameSpace = new ExtractedValue<string>(nameSpace);

        const bevyType = match[2];
        const colorSpace = fromBevyName(bevyType);

        if (colorSpace === undefined) {
            console.error("Unable to determine color space from bevy name");
            return undefined;
        }

        const extractedColorSpace = new ExtractedValue<ColorSpace>(colorSpace);

        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);

        const color = match[3];
        const values = definition.associatedColors[color];
        const valueRanges = definition.colorCoordinateRange;

        const extractedFirst = new ExtractedNumber(
            values[0],
            valueRanges.first
        );

        const extractedSecond = new ExtractedNumber(
            values[1],
            valueRanges.second
        );

        const extractedThird = new ExtractedNumber(
            values[2],
            valueRanges.third
        );

        const extractedAlpha = new ExtractedNumber(values[3], alphaNumberRange);

        const extraction = new ExtractionResult(
            ExtractionSource.BevyAssociated,
            range,
            extractedNameSpace,
            extractedColorSpace,
            extractedFirst,
            extractedSecond,
            extractedThird,
            extractedAlpha
        );

        return extraction;
    }
}
