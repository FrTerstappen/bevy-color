export enum ColorSpace {
    Srgb,
    SrgbU8,
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

export function fromBevyName(name: string): ColorSpace | undefined {
    switch (name) {
        case "SRGB":
        case "SRGBA":
            return ColorSpace.Srgb;
        case "SRGBU8":
        case "SRGBAU8":
            return ColorSpace.SrgbU8;
        case "LINEARRGB":
        case "LINEARRGBA":
            return ColorSpace.LinearRgb;
        case "HSL":
        case "HSLA":
            return ColorSpace.Hsl;
        case "HSV":
        case "HSVA":
            return ColorSpace.Hsv;
        case "HWB":
        case "HWBA":
            return ColorSpace.Hwb;
        case "LAB":
        case "LABA":
            return ColorSpace.Lab;
        case "LCH":
        case "LCHA":
            return ColorSpace.Lch;
        case "OKLAB":
        case "OKLABA":
            return ColorSpace.OkLab;
        case "OKLCH":
        case "OKLCHA":
            return ColorSpace.OkLch;
        case "XYZ":
        case "XYZA":
            return ColorSpace.Xyz;
    }

    console.error("Unrecognized bevy color name", name);
    return undefined;
}

export function colorJsSpaceName(space: ColorSpace): string {
    switch (space) {
        case ColorSpace.Srgb:
        case ColorSpace.SrgbU8:
            return "srgb";
        case ColorSpace.LinearRgb:
            return "srgb-linear";
        case ColorSpace.Hsl:
            return "hsl";
        case ColorSpace.Hsv:
            return "hsv";
        case ColorSpace.Hwb:
            return "hwb";
        case ColorSpace.Lab:
            return "lab";
        case ColorSpace.Lch:
            return "lch";
        case ColorSpace.OkLab:
            return "oklab";
        case ColorSpace.OkLch:
            return "oklch";
        case ColorSpace.Xyz:
            return "xyz";
    }
}
