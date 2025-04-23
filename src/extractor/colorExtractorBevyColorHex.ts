import { ColorSpace } from "../colorSpace";
import { ColorExtractor } from "./colorExtractor";
import { Range } from "vscode";
import { ExtractionResult, ExtractionSource } from "./extractionResult";
import { ColorRegExpBuilder } from "./colorRegExpBuilder";
import { ExtractedValue } from "./extractedValue";
import { ExtractedNumber } from "./extractedNumber";
import { alphaNumberRange } from "../numberRange";
import { ColorDefinitionBevy } from "../colorDefinitionBevy";

export class ColorExtractorBevyColorHex implements ColorExtractor {
    buildRegularExpressions(colorRegExpBuilder: ColorRegExpBuilder): RegExp[] {
        const regularExpression = colorRegExpBuilder.buildColorCaptureHex();

        return [regularExpression];
    }

    extract(
        range: Range,
        match: RegExpExecArray
    ): ExtractionResult | undefined {
        if (match.length !== 3) {
            console.error("Wrong match length", match);
            return undefined;
        }

        const nameSpace = match.at(1) ?? "";
        const extractedNameSpace = new ExtractedValue<string>(nameSpace);

        const colorSpace = ColorSpace.Srgb;
        const extractedColorSpace = new ExtractedValue<ColorSpace>(colorSpace);

        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);
        const valueRanges = definition.colorCoordinateRange;

        const hexString = match[2];
        const hexLength = hexString.length;

        let firstString = undefined;
        let secondString = undefined;
        let thirdString = undefined;
        let alphaString = undefined;

        switch (hexLength) {
            case 3: {
                firstString = hexString.slice(0, 1).repeat(2);
                secondString = hexString.slice(1, 2).repeat(2);
                thirdString = hexString.slice(2, 3).repeat(2);
                alphaString = "FF";
                break;
            }
            case 4: {
                firstString = hexString.slice(0, 1).repeat(2);
                secondString = hexString.slice(1, 2).repeat(2);
                thirdString = hexString.slice(2, 3).repeat(2);
                alphaString = hexString.slice(3, 4).repeat(2);
                break;
            }
            case 6: {
                firstString = hexString.slice(0, 2);
                secondString = hexString.slice(2, 4);
                thirdString = hexString.slice(4, 6);
                alphaString = "FF";
                break;
            }
            case 8: {
                firstString = hexString.slice(0, 2);
                secondString = hexString.slice(2, 4);
                thirdString = hexString.slice(4, 6);
                alphaString = hexString.slice(6, 8);
                break;
            }
            default: {
                console.error("Invalid length of hex string");
                return undefined;
            }
        }

        // First
        const first = Number.parseInt(`0x${firstString}`, 16) / 255.0;
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
        const second = Number.parseInt(`0x${secondString}`, 16) / 255.0;
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
        const third = Number.parseInt(`0x${thirdString}`, 16) / 255.0;
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
        const alpha = Number.parseInt(`0x${alphaString}`, 16) / 255.0;
        const alphaMatchIndex = match.indices?.at(7);
        const alphaStart = range.start.with(undefined, alphaMatchIndex?.at(0));
        const alphaEnd = range.end.with(undefined, alphaMatchIndex?.at(1));
        const alphaRange = range.with(alphaStart, alphaEnd);
        const extractedAlpha = new ExtractedNumber(
            alpha,
            alphaNumberRange,
            alphaRange
        );

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
