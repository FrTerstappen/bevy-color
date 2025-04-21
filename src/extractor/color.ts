import { Color } from "vscode";
import ColorJS from "colorjs.io";
import { nameSpaceBaseRegExp, rustFloatRegExp, rustU8RegExp } from "./utility";

export function getColorRegExps(): RegExp[] {
    const floatTypePart = "(srgba|srgb|linear_rgba|linear_rgb|hsla|hsl|hsva|hsv|hwba|hwb|laba|lab|lcha|lch|oklaba|oklab|oklcha|oklch|xyza|xyz)";
    const floatRegExpString = `${nameSpaceBaseRegExp}Color::${floatTypePart}\\(${rustFloatRegExp},${rustFloatRegExp},${rustFloatRegExp}(?:,${rustFloatRegExp})?\\)`;
    const floatRegExp = new RegExp(floatRegExpString, "g");

    const u8TypePart = "(srgba_u8|srgb_u8)";
    const u8RegExpString = `${nameSpaceBaseRegExp}Color::${u8TypePart}\\(${rustU8RegExp},${rustU8RegExp},${rustU8RegExp}(?:,${rustU8RegExp})?\\)`;
    const u8RegExp = new RegExp(u8RegExpString, "g");

    return [floatRegExp, u8RegExp];
}

function extractSrgbaColor(red: number, green: number, blue: number, alpha: number | undefined): Color | undefined {
    const color = new Color(red, green, blue, alpha ?? 1.0);
    return color;
}

function extractSrgbaU8Color(red: number, green: number, blue: number, alpha: number | undefined): Color | undefined {
    return extractSrgbaColor(red / 255.0, green / 255.0, blue / 255.0, alpha ? alpha / 255.0 : undefined);
}

function extractLinearRgbaColor(red: number, green: number, blue: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("srgb-linear", [red, green, blue]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

function extractHslaColor(hue: number, saturation: number, lightness: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("hsl", [hue, saturation, lightness]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

function extractHsvaColor(hue: number, saturation: number, value: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("hsv", [hue, saturation, value]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

function extractHwbaColor(hue: number, whiteness: number, blackness: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("hwb", [hue, whiteness, blackness]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

function extractLabaColor(lightness: number, a: number, b: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("lab", [lightness, a, b]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

function extractLchaColor(lightness: number, chroma: number, hue: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("lch", [lightness, chroma, hue]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

function extractOklabaColor(lightness: number, a: number, b: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("oklab", [lightness, a, b]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}


function extractOklchaColor(lightness: number, chroma: number, hue: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("oklch", [lightness, chroma, hue]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

function extractXyzaColor(x: number, y: number, z: number, alpha: number | undefined): Color | undefined {
    const color = new ColorJS("xyz", [x, y, z]);
    const srgb = color.to("srgb");
    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], alpha ?? 1.0);
}

export function extractColor(match: RegExpExecArray): Color | undefined {
    if (match.length !== 6) {
        console.error("Wrong match length", match);
        return undefined;
    }

    if (!match[1]) {
        console.error("Falsy type", match);
        return undefined;
    }

    const type = match[1].toUpperCase().replace("_", "");

    const aString = match[2].replace("_", "");
    const bString = match[3].replace("_", "");
    const cString = match[4].replace("_", "");
    const alphaString = match[5] ? match[5].replace("_", "") : undefined;

    const a = Number(aString);
    const b = Number(bString);
    const c = Number(cString);
    const alpha = alphaString ? Number(alphaString) : undefined;

    switch (type) {
        case "SRGB":
        case "SRGBA":
            return extractSrgbaColor(a, b, c, alpha);
        case "SRGBU8":
        case "SRGBAU8":
            return extractSrgbaU8Color(a, b, c, alpha);
        case "LINEARRGB":
        case "LINEARRGBA":
            return extractLinearRgbaColor(a, b, c, alpha);
        case "HSL":
        case "HSLA":
            return extractHslaColor(a, b, c, alpha);
        case "HSV":
        case "HSVA":
            return extractHsvaColor(a, b, c, alpha);
        case "HWB":
        case "HWBA":
            return extractHwbaColor(a, b, c, alpha);
        case "LAB":
        case "LABA":
            return extractLabaColor(a, b, c, alpha);
        case "LCH":
        case "LCHA":
            return extractLchaColor(a, b, c, alpha);
        case "OKLAB":
        case "OKLABA":
            return extractOklabaColor(a, b, c, alpha);
        case "OKLCH":
        case "OKLCHA":
            return extractOklchaColor(a, b, c, alpha);
        case "XYZ":
        case "XYZA":
            return extractXyzaColor(a, b, c, alpha);

    }

    console.error("Unknown type", type);
    return undefined;
}
