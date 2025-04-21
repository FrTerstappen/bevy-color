import { nameSpaceBaseRegExp, rustFloatRegExp, rustU8RegExp } from "./utility";
import { ExtractedColor } from "./extractor";
import { fromBevyName } from "../colorSpace";

export function getColorRegExps(): RegExp[] {
    const floatTypePart = "(srgba|srgb|linear_rgba|linear_rgb|hsla|hsl|hsva|hsv|hwba|hwb|laba|lab|lcha|lch|oklaba|oklab|oklcha|oklch|xyza|xyz)";
    const floatRegExpString = `${nameSpaceBaseRegExp}Color::${floatTypePart}\\(${rustFloatRegExp},${rustFloatRegExp},${rustFloatRegExp}(?:,${rustFloatRegExp})?\\)`;
    const floatRegExp = new RegExp(floatRegExpString, "g");

    const u8TypePart = "(srgba_u8|srgb_u8)";
    const u8RegExpString = `${nameSpaceBaseRegExp}Color::${u8TypePart}\\(${rustU8RegExp},${rustU8RegExp},${rustU8RegExp}(?:,${rustU8RegExp})?\\)`;
    const u8RegExp = new RegExp(u8RegExpString, "g");

    return [floatRegExp, u8RegExp];
}

export function extractColor(match: RegExpExecArray): ExtractedColor | undefined {
    if (match.length !== 6) {
        console.error("Wrong match length", match);
        return undefined;
    }

    if (!match[1]) {
        console.error("Falsy type", match);
        return undefined;
    }

    const type = match[1].toUpperCase().replace("_", "");
    const colorSpace = fromBevyName(type);

    if (colorSpace === undefined) {
        console.error("Unable to determine color space from bevy name");
        return undefined;
    }

    const firstString = match[2].replace("_", "");
    const secondString = match[3].replace("_", "");
    const thirdString = match[4].replace("_", "");


    const first = Number(firstString);
    const second = Number(secondString);
    const third = Number(thirdString);

    let alpha = 1.0;
    if (match[5]) {
        const alphaString = match[5].replace("_", "");
        alpha = Number(alphaString);
    }

    const extractedColor: ExtractedColor = {
        colorSpace: colorSpace,
        coordinate: {
            first: first,
            second: second,
            third: third,
        },
        alpha: alpha,

    };
    return extractedColor;
}
