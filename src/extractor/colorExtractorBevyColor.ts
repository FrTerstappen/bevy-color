import { ColorSpace, fromBevyName } from "../colorSpace";
import { ColorExtractor } from "./colorExtractor";
import { Range } from "vscode";
import { ExtractionResult, ExtractionSource } from "./extractionResult";
import { ColorRegExpBuilder } from "./colorRegExpBuilder";
import { ExtractedValue } from "./extractedValue";
import { ExtractedNumber } from "./extractedNumber";
import { alphaNumberRange } from "../numberRange";
import { ColorDefinitionBevy } from "../colorDefinitionBevy";

export class ColorExtractorBevyColor implements ColorExtractor {
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
                colorRegExpBuilder.buildColorCapture(colorSpace);
            regularExpressions.push(regularExpression);
        }

        return regularExpressions;
    }

    extract(
        range: Range,
        match: RegExpExecArray
    ): ExtractionResult | undefined {
        if (match.length !== 8) {
            console.error("Wrong match length", match);
            return undefined;
        }

        const nameSpace = match.at(1) ?? "";
        const extractedNameSpace = new ExtractedValue<string>(nameSpace);

        const bevyType = match.at(2) ?? match.at(3);
        const colorSpace = fromBevyName(bevyType);

        if (colorSpace === undefined) {
            console.error(
                "Unable to determine color space from bevy name",
                bevyType
            );
            return undefined;
        }

        const extractedColorSpace = new ExtractedValue<ColorSpace>(colorSpace);

        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);
        const valueRanges = definition.colorCoordinateRange;

        // First
        const firstString = match.at(4);
        const normalizedFirstString = firstString?.replace("_", "");
        const first = Number(normalizedFirstString);
        const firstMatchIndex = match.indices?.at(4);
        const firstStart = range.start.with(undefined, firstMatchIndex?.at(0));
        const firstEnd = range.end.with(undefined, firstMatchIndex?.at(1));
        const firstRange = range.with(firstStart, firstEnd);
        const extractedFirst = new ExtractedNumber(
            first,
            valueRanges.first,
            firstRange
        );

        // Second
        const secondString = match.at(5);
        const normalizedSecondString = secondString?.replace("_", "");
        const second = Number(normalizedSecondString);
        const secondMatchIndex = match.indices?.at(5);
        const secondStart = range.start.with(
            undefined,
            secondMatchIndex?.at(0)
        );
        const secondEnd = range.end.with(undefined, secondMatchIndex?.at(1));
        const secondRange = range.with(secondStart, secondEnd);
        const extractedSecond = new ExtractedNumber(
            second,
            valueRanges.second,
            secondRange
        );

        // Third
        const thirdString = match.at(6);
        const normalizedThirdString = thirdString?.replace("_", "");
        const third = Number(normalizedThirdString);
        const thirdMatchIndex = match.indices?.at(6);
        const thirdStart = range.start.with(undefined, thirdMatchIndex?.at(0));
        const thirdEnd = range.end.with(undefined, thirdMatchIndex?.at(1));
        const thirdRange = range.with(thirdStart, thirdEnd);
        const extractedThird = new ExtractedNumber(
            third,
            valueRanges.third,
            thirdRange
        );

        // Alpha
        let extractedAlpha = undefined;
        const alphaString = match.at(7);
        if (alphaString) {
            const normalizedAlphaString = alphaString.replace("_", "");
            const alpha = Number(normalizedAlphaString);
            const alphaMatchIndex = match.indices?.at(7);
            const alphaStart = range.start.with(
                undefined,
                alphaMatchIndex?.at(0)
            );
            const alphaEnd = range.end.with(undefined, alphaMatchIndex?.at(1));
            const alphaRange = range.with(alphaStart, alphaEnd);
            extractedAlpha = new ExtractedNumber(
                alpha,
                alphaNumberRange,
                alphaRange
            );
        }

        const extraction = new ExtractionResult(
            ExtractionSource.BevyColor,
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
