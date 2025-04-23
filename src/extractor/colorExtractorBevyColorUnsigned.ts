import { ColorSpace } from "../colorSpace";
import { ColorExtractor } from "./colorExtractor";
import { Range } from "vscode";
import { ExtractionResult, ExtractionSource } from "./extractionResult";
import { ColorRegExpBuilder } from "./colorRegExpBuilder";
import { ExtractedValue } from "./extractedValue";
import { ExtractedNumber } from "./extractedNumber";
import { alphaNumberRange } from "../numberRange";
import { ColorDefinitionBevy } from "../colorDefinitionBevy";

export class ColorExtractorBevyColorUnsigned implements ColorExtractor {
    buildRegularExpressions(colorRegExpBuilder: ColorRegExpBuilder): RegExp[] {
        const srgbRegularExpression =
            colorRegExpBuilder.buildColorCaptureUnsigned(
                "Srgba",
                ["rgba_u8", "rgb_u8"],
                true
            );
        const colorRegularExpression =
            colorRegExpBuilder.buildColorCaptureUnsigned(
                "Color",
                ["srgba_u8", "srgb_u8"],
                false
            );

        return [srgbRegularExpression, colorRegularExpression];
    }

    extract(
        range: Range,
        match: RegExpExecArray
    ): ExtractionResult | undefined {
        if (match.length !== 6) {
            console.error("Wrong match length", match);
            return undefined;
        }

        const nameSpace = match.at(1) ?? "";
        const extractedNameSpace = new ExtractedValue<string>(nameSpace);

        const colorSpace = ColorSpace.Srgb;
        const extractedColorSpace = new ExtractedValue<ColorSpace>(colorSpace);

        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);
        const valueRanges = definition.colorCoordinateRange;

        // First
        const firstString = match.at(2);
        const first = Number(firstString) / 255.0;
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
        const secondString = match.at(3);
        const second = Number(secondString) / 255.0;
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
        const thirdString = match.at(4);
        const third = Number(thirdString) / 255.0;
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
        const alphaString = match.at(5);
        if (alphaString) {
            const alpha = Number(alphaString) / 255.0;
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
