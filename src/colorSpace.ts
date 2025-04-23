export enum ColorSpace {
    Srgb,
    LinearRgb,
    Hsl,
    Hsv,
    Hwb,
    Lab,
    Lch,
    OkLab,
    OkLch,
    Xyz,
}

export function fromBevyName(name: string | undefined): ColorSpace | undefined {
    const normalizedName = name?.toUpperCase().replace("_", "");

    switch (normalizedName) {
        case "SRGB":
        case "SRGBA": {
            return ColorSpace.Srgb;
        }
        case "COLOR": // Extra for associated colors
        case "LINEARRGB":
        case "LINEARRGBA": {
            return ColorSpace.LinearRgb;
        }
        case "HSL":
        case "HSLA": {
            return ColorSpace.Hsl;
        }
        case "HSV":
        case "HSVA": {
            return ColorSpace.Hsv;
        }
        case "HWB":
        case "HWBA": {
            return ColorSpace.Hwb;
        }
        case "LAB":
        case "LABA": {
            return ColorSpace.Lab;
        }
        case "LCH":
        case "LCHA": {
            return ColorSpace.Lch;
        }
        case "OKLAB":
        case "OKLABA": {
            return ColorSpace.OkLab;
        }
        case "OKLCH":
        case "OKLCHA": {
            return ColorSpace.OkLch;
        }
        case "XYZ":
        case "XYZA": {
            return ColorSpace.Xyz;
        }
    }

    console.error("Unrecognized bevy color name", name, normalizedName);
    return undefined;
}
