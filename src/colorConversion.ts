import { Color } from "vscode";
import ColorJS, { Coords } from "colorjs.io";
import { colorJsSpaceName, ColorSpace } from "./colorSpace";
import { ColorCoordinate, ExtractedColor } from "./extractor/extractor";

interface CoordinateValueRange {
    first: ValueRange,
    second: ValueRange,
    third: ValueRange,
}

interface ValueRange {
    min: number,
    max: number,
}

const alphaRange: ValueRange = { min: 0.0, max: 1.0 };

export function convertToSrgb(extractedColor: ExtractedColor): Color | undefined {
    const bevyRange = getBevyValueRange(extractedColor.colorSpace);
    const colorJsRange = getColorJsValueRange(extractedColor.colorSpace);

    const clampedCoordinate = clampCoordinateToRange(extractedColor.coordinate, bevyRange);
    const clampedAlpha = clampNumberToRange(extractedColor.alpha, alphaRange);

    const convertedCoordinate = convertCoordinateToRange(clampedCoordinate, bevyRange, colorJsRange);

    const sourceSpaceName = colorJsSpaceName(extractedColor.colorSpace);
    const targetSpaceName = colorJsSpaceName(ColorSpace.Srgb);

    const coordinate: Coords = [convertedCoordinate.first, convertedCoordinate.second, convertedCoordinate.third];
    const color = new ColorJS(sourceSpaceName, coordinate);
    const srgb = color.to(targetSpaceName);

    return new Color(srgb.coords[0], srgb.coords[1], srgb.coords[2], clampedAlpha);
}



function convertNumberToRange(value: number, sourceRange: ValueRange, targetRange: ValueRange): number {
    const slope = (targetRange.max - targetRange.min) / (sourceRange.max - sourceRange.min);
    const result = targetRange.min + slope * (value - sourceRange.min);
    return result;
}

function convertCoordinateToRange(coordinate: ColorCoordinate, sourceRange: CoordinateValueRange, targetRange: CoordinateValueRange): ColorCoordinate {
    return {
        first: convertNumberToRange(coordinate.first, sourceRange.first, targetRange.first),
        second: convertNumberToRange(coordinate.second, sourceRange.second, targetRange.second),
        third: convertNumberToRange(coordinate.third, sourceRange.third, targetRange.third),
    };
}

function clampNumberToRange(value: number, range: ValueRange): number {
    if (value < range.min) {
        console.error("Clamped value to minimum", value, range.min);
        return range.min;
    }

    if (value > range.max) {
        console.error("Clamped value to maximum", value, range.max);
        return range.min;
    }

    return value;
}

function clampCoordinateToRange(coordinate: ColorCoordinate, range: CoordinateValueRange): ColorCoordinate {
    return {
        first: clampNumberToRange(coordinate.first, range.first),
        second: clampNumberToRange(coordinate.second, range.second),
        third: clampNumberToRange(coordinate.third, range.third),
    };
}

function getBevyValueRange(colorSpace: ColorSpace): CoordinateValueRange {
    switch (colorSpace) {
        case ColorSpace.Srgb:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
        case ColorSpace.SrgbU8:
            return {
                first: { min: 0.0, max: 255.0 },
                second: { min: 0.0, max: 255.0 },
                third: { min: 0.0, max: 255.0 },
            };
        case ColorSpace.LinearRgb:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
        case ColorSpace.Hsl:
            return {
                first: { min: 0.0, max: 360.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
        case ColorSpace.Hsv:
            return {
                first: { min: 0.0, max: 360.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
        case ColorSpace.Hwb:
            return {
                first: { min: 0.0, max: 360.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
        case ColorSpace.Lab:
            return {
                first: { min: 0.0, max: 1.5 },
                second: { min: -1.5, max: 1.5 },
                third: { min: -1.5, max: 1.5 },
            };
        case ColorSpace.Lch:
            return {
                first: { min: 0.0, max: 1.5 },
                second: { min: 0.0, max: 1.5 },
                third: { min: 0.0, max: 360.0 },
            };
        case ColorSpace.OkLab:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: -1.0, max: 1.0 },
                third: { min: -1.0, max: 1.0 },
            };
        case ColorSpace.OkLch:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 360.0 },
            };
        case ColorSpace.Xyz:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
    }
}


function getColorJsValueRange(colorSpace: ColorSpace): CoordinateValueRange {
    switch (colorSpace) {
        case ColorSpace.Srgb:
        case ColorSpace.SrgbU8:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
        case ColorSpace.LinearRgb:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
        case ColorSpace.Hsl:
            return {
                first: { min: 0.0, max: 360.0 },
                second: { min: 0.0, max: 100.0 },
                third: { min: 0.0, max: 100.0 },
            };
        case ColorSpace.Hsv:
            return {
                first: { min: 0.0, max: 360.0 },
                second: { min: 0.0, max: 100.0 },
                third: { min: 0.0, max: 100.0 },
            };
        case ColorSpace.Hwb:
            return {
                first: { min: 0.0, max: 360.0 },
                second: { min: 0.0, max: 100.0 },
                third: { min: 0.0, max: 100.0 },
            };
        case ColorSpace.Lab:
            return {
                first: { min: 0.0, max: 100.0 },
                second: { min: -125.0, max: 125.0 },
                third: { min: -125.0, max: 125.0 },
            };
        case ColorSpace.Lch:
            return {
                first: { min: 0.0, max: 100.0 },
                second: { min: 0.0, max: 150.0 },
                third: { min: 0.0, max: 360.0 },
            };
        case ColorSpace.OkLab:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: -0.4, max: 0.4 },
                third: { min: -0.4, max: 0.4 },
            };
        case ColorSpace.OkLch:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 0.4 },
                third: { min: 0.0, max: 0.360 },
            };
        case ColorSpace.Xyz:
            return {
                first: { min: 0.0, max: 1.0 },
                second: { min: 0.0, max: 1.0 },
                third: { min: 0.0, max: 1.0 },
            };
    }
}
