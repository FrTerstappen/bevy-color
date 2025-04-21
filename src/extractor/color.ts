import { Color } from "vscode";
import space from "color-space";
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

// Color::Srgba(red: f32, green: f32, blue: f32)
// Color::Srgb (red: f32, green: f32, blue: f32, alpha: f32)
function extractSrgbaColor(red: number, green: number, blue: number, alpha: number | undefined): Color | undefined {
    const color = new Color(red, green, blue, alpha ?? 1.0);
    return color;
}

// Color::SrgbaU8(red: u8, green: u8, blue: u8)
// Color::SrgbaU (red: u8, green: u8, blue: u8, alpha: u8)
function extractSrgbaU8Color(red: number, green: number, blue: number, alpha: number | undefined): Color | undefined {
    return extractSrgbaColor(red / 255, green / 255, blue / 255, alpha ? alpha / 255 : undefined);
}

// Color::LinearRgba(red: f32, green: f32, blue: f32)
// Color::LinearRgb (red: f32, green: f32, blue: f32, alpha: f32)
function extractLinearRgbaColor(red: number, green: number, blue: number, alpha: number | undefined): Color | undefined {
    const result = space.lrgb.rgb([red, green, blue]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
}

// Color::Hsla(hue: f32, saturation: f32, lightness: f32)
// Color::Hsl (hue: f32, saturation: f32, lightness: f32, alpha: f32)
function extractHslaColor(hue: number, saturation: number, lightness: number, alpha: number | undefined): Color | undefined {
    const result = space.hsl.rgb([hue, saturation, lightness]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
}

// Color::Hsva(hue: f32, saturation: f32, value: f32)
// Color::Hsv (hue: f32, saturation: f32, value: f32, alpha: f32)
function extractHsvaColor(hue: number, saturation: number, value: number, alpha: number | undefined): Color | undefined {
    const result = space.hsv.rgb([hue, saturation, value]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
}

// Color::Hwba(hue: f32, whiteness: f32, blackness: f32)
// Color::Hwb (hue: f32, whiteness: f32, blackness: f32, alpha: f32)
function extractHwbaColor(hue: number, whiteness: number, blackness: number, alpha: number | undefined): Color | undefined {
    const result = space.hwb.rgb([hue, whiteness, blackness]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
}

// Color::Laba(lightness: f32, a: f32, b: f32)
// Color::Lab (lightness: f32, a: f32, b: f32, alpha: f32)
function extractLabaColor(lightness: number, a: number, b: number, alpha: number | undefined): Color | undefined {
    const xyz = space.lab.xyz([lightness, a, b]);
    const result = space.xyz.rgb([xyz[0], xyz[1], xyz[2]]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
}

// Color::Lcha(lightness: f32, chroma: f32, hue: f32)
// Color::Lch (lightness: f32, chroma: f32, hue: f32, alpha: f32)
function extractLchaColor(lightness: number, chroma: number, hue: number, alpha: number | undefined): Color | undefined {
    const xyz = space.lchab.xyz([lightness, chroma, hue]);
    const result = space.xyz.rgb([xyz[0], xyz[1], xyz[2]]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
}

// Color::Oklaba(lightness: f32, a: f32, b: f32)
// Color::Oklab (lightness: f32, a: f32, b: f32, alpha: f32)
function extractOklabaColor(lightness: number, a: number, b: number, alpha: number | undefined): Color | undefined {
    const xyz = space.oklab.xyz([lightness, a, b]);
    const result = space.xyz.rgb([xyz[0], xyz[1], xyz[2]]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
}

// Color::Oklcha(lightness: f32, chroma: f32, hue: f32)
// Color::Oklch (lightness: f32, chroma: f32, hue: f32, alpha: f32)
function extractOklchaColor(_lightness: number, _chroma: number, _hue: number, _alpha: number | undefined): Color | undefined {
    // TODO
    return undefined;
}

// Color::Xyza(x: f32, y: f32, z: f32)
// Color::Xyz (x: f32, y: f32, z: f32, alpha: f32)
function extractXyzaColor(x: number, y: number, z: number, alpha: number | undefined): Color | undefined {
    const result = space.xyz.rgb([x, y, z]);
    const color = new Color(result[0], result[1], result[2], alpha ?? 1.0);
    return color;
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
