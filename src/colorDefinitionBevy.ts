import { ColorCoordinateRange } from "./colorCoordinateRange";
import { ColorSpace } from "./colorSpace";
import { NumberRange } from "./numberRange";

export class ColorDefinitionBevy {
    typeName: string;
    functionNames: string[];
    constructorNames: string[];
    parameterNames: string[];
    colorCoordinateRange: ColorCoordinateRange;
    associatedColors: Record<string, [number, number, number, number]>;

    constructor(
        typeName: string,
        constructorNames: string[],
        functionNames: string[],
        parameterNames: string[],
        colorCoordinateRange: ColorCoordinateRange,
        associatedColors: Record<string, [number, number, number, number]>
    ) {
        this.typeName = typeName;
        this.constructorNames = constructorNames;
        this.functionNames = functionNames;
        this.parameterNames = parameterNames;
        this.colorCoordinateRange = colorCoordinateRange;
        this.associatedColors = associatedColors;
    }

    static fromColorSpace(colorSpace: ColorSpace): ColorDefinitionBevy {
        switch (colorSpace) {
            case ColorSpace.Srgb: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionBevy(
                    "Srgba",
                    ["new", "rgb"],
                    ["srgba", "srgb"],
                    ["red", "green", "blue"],
                    range,
                    {
                        BLACK: [0.0, 0.0, 0.0, 1.0],
                        BLUE: [0.0, 0.0, 1.0, 1.0],
                        GREEN: [0.0, 1.0, 0.0, 1.0],
                        NONE: [0.0, 0.0, 0.0, 0.0],
                        RED: [1.0, 0.0, 0.0, 1.0],
                        WHITE: [1.0, 1.0, 1.0, 1.0],
                        ZERO: [0.0, 0.0, 0.0, 0.0],
                    }
                );
            }
            case ColorSpace.LinearRgb: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionBevy(
                    "LinearRgba",
                    ["new", "rgb"],
                    ["linear_rgba", "linear_rgb"],
                    ["red", "green", "blue"],
                    range,
                    {
                        BLACK: [0.0, 0.0, 0.0, 1.0],
                        BLUE: [0.0, 0.0, 1.0, 1.0],
                        GREEN: [0.0, 1.0, 0.0, 1.0],
                        NAN: [Number.NaN, Number.NaN, Number.NaN, Number.NaN],
                        NONE: [0.0, 0.0, 0.0, 0.0],
                        RED: [1.0, 0.0, 0.0, 1.0],
                        WHITE: [1.0, 1.0, 1.0, 1.0],
                        ZERO: [0.0, 0.0, 0.0, 0.0],
                    }
                );
            }
            case ColorSpace.Hsl: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 360.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionBevy(
                    "Hsla",
                    ["new", "hsl"],
                    ["hsla", "hsl"],
                    ["hue", "saturation", "lightness"],
                    range,
                    { BLACK: [0.0, 0.0, 0.0, 1.0], WHITE: [0.0, 0.0, 1.0, 1.0] }
                );
            }
            case ColorSpace.Hsv: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 360.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionBevy(
                    "Hsva",
                    ["new", "hsv"],
                    ["hsva", "hsv"],
                    ["hue", "saturation", "value"],
                    range,
                    { BLACK: [0.0, 0.0, 0.0, 1.0], WHITE: [0.0, 0.0, 1.0, 1.0] }
                );
            }
            case ColorSpace.Hwb: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 360.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionBevy(
                    "Hwba",
                    ["new", "hwb"],
                    ["hwba", "hwb"],
                    ["hue", "whiteness", "blackness"],
                    range,
                    { BLACK: [0.0, 0.0, 1.0, 1.0], WHITE: [0.0, 1.0, 0.0, 1.0] }
                );
            }
            case ColorSpace.Lab: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.5),
                    new NumberRange(-1.5, 1.5),
                    new NumberRange(-1.5, 1.5)
                );
                return new ColorDefinitionBevy(
                    "Laba",
                    ["new", "lab"],
                    ["laba", "lab"],
                    ["lightness", "a", "b"],
                    range,
                    {
                        BLACK: [0.0, 0.0, 0.0, 1.0],
                        WHITE: [1.0, 0.0, 0.0, 1.0],
                        ZERO: [0.0, 0.0, 0.0, 0.0],
                    }
                );
            }
            case ColorSpace.Lch: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.5),
                    new NumberRange(0.0, 1.5),
                    new NumberRange(0.0, 360.0)
                );
                return new ColorDefinitionBevy(
                    "Lcha",
                    ["new", "lch"],
                    ["lcha", "lch"],
                    ["lightness", "chroma", "hue"],
                    range,
                    {
                        BLACK: [0.0, 0.0, 1.36603785e-5, 1.0],
                        WHITE: [1.0, 0.0, 1.36603785e-5, 1.0],
                    }
                );
            }
            case ColorSpace.OkLab: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(-1.0, 1.0),
                    new NumberRange(-1.0, 1.0)
                );
                return new ColorDefinitionBevy(
                    "Oklaba",
                    ["new", "lab"],
                    ["oklaba", "oklab"],
                    ["lightness", "a", "b"],
                    range,
                    {
                        BLACK: [0.0, 0.0, 0.0, 1.0],
                        WHITE: [1.0, 0.0, 5.9604645e-8, 1.0],
                        ZERO: [0.0, 0.0, 0.0, 0.0],
                    }
                );
            }
            case ColorSpace.OkLch: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 360.0)
                );
                return new ColorDefinitionBevy(
                    "Oklcha",
                    ["new", "lch"],
                    ["oklcha", "oklch"],
                    ["lightness", "chroma", "hue"],
                    range,
                    {
                        BLACK: [0.0, 0.0, 0.0, 1.0],
                        WHITE: [1.0, 5.9604645e-8, 90.0, 1.0],
                    }
                );
            }
            case ColorSpace.Xyz: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionBevy(
                    "Xyza",
                    ["new", "xyz"],
                    ["xyza", "xyz"],
                    ["x", "y", "z"],
                    range,
                    {
                        BLACK: [0.0, 0.0, 0.0, 1.0],
                        D65_WHITE: [0.95047, 1.0, 1.08883, 1.0],
                        WHITE: [0.95047, 1.0, 1.08883, 1.0],
                        ZERO: [0.0, 0.0, 0.0, 0.0],
                    }
                );
            }
        }
    }
}
