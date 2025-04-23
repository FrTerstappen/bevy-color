import { ColorSpace } from "../colorSpace";
import { ColorExtractor } from "./colorExtractor";
import { Range } from "vscode";
import { ExtractionResult, ExtractionSource } from "./extractionResult";
import { ExtractedValue } from "./extractedValue";
import { ExtractedNumber } from "./extractedNumber";
import { ColorRegExpBuilder } from "./colorRegExpBuilder";
import { ColorDefinitionBevy } from "../colorDefinitionBevy";
import { recordKeys } from "../utility";

export class ColorExtractorBevyCss implements ColorExtractor {
    buildRegularExpressions(colorRegExpBuilder: ColorRegExpBuilder): RegExp[] {
        const names = recordKeys(CSS_COLORS);

        const modulePathParts = ["palettes", "css"];
        const regExp = colorRegExpBuilder.buildCssCapture(
            modulePathParts,
            names
        );

        return [regExp];
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
        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);
        const valueRanges = definition.colorCoordinateRange;

        const extractedColorSpace = new ExtractedValue<ColorSpace>(colorSpace);

        const name = match[2];
        const values = CSS_COLORS[name];

        const r = new ExtractedNumber(values[0], valueRanges.first);
        const g = new ExtractedNumber(values[1], valueRanges.second);
        const b = new ExtractedNumber(values[2], valueRanges.third);

        const extraction = new ExtractionResult(
            ExtractionSource.BevyCss,
            range,
            extractedNameSpace,
            extractedColorSpace,
            r,
            g,
            b
        );

        return extraction;
    }
}

const CSS_COLORS: Record<string, [number, number, number]> = {
    AQUA: [0.0, 1.0, 1.0],
    BLACK: [0.0, 0.0, 0.0],
    BLUE: [0.0, 0.0, 1.0],
    FUCHSIA: [1.0, 0.0, 1.0],
    GRAY: [0.5019608, 0.5019608, 0.5019608],
    GREEN: [0.0, 0.5019608, 0.0],
    LIME: [0.0, 1.0, 0.0],
    MAROON: [0.5019608, 0.0, 0.0],
    NAVY: [0.0, 0.0, 0.5019608],
    OLIVE: [0.5019608, 0.5019608, 0.0],
    PURPLE: [0.5019608, 0.0, 0.5019608],
    RED: [1.0, 0.0, 0.0],
    SILVER: [0.7529412, 0.7529412, 0.7529412],
    TEAL: [0.0, 0.5019608, 0.5019608],
    WHITE: [1.0, 1.0, 1.0],
    YELLOW: [1.0, 1.0, 0.0],
    ALICE_BLUE: [0.941, 0.973, 1.0],
    ANTIQUE_WHITE: [0.98, 0.922, 0.843],
    AQUAMARINE: [0.498, 1.0, 0.831],
    AZURE: [0.941, 1.0, 1.0],
    BEIGE: [0.961, 0.961, 0.863],
    BISQUE: [1.0, 0.894, 0.769],
    BLANCHED_ALMOND: [1.0, 0.922, 0.804],
    BLUE_VIOLET: [0.541, 0.169, 0.886],
    BROWN: [0.647, 0.165, 0.165],
    BURLYWOOD: [0.871, 0.722, 0.529],
    CADET_BLUE: [0.373, 0.62, 0.627],
    CHARTREUSE: [0.498, 1.0, 0.0],
    CHOCOLATE: [0.824, 0.412, 0.118],
    CORAL: [1.0, 0.498, 0.314],
    CORNFLOWER_BLUE: [0.392, 0.584, 0.929],
    CORNSILK: [1.0, 0.973, 0.863],
    CRIMSON: [0.863, 0.078, 0.235],
    DARK_BLUE: [0.0, 0.0, 0.545],
    DARK_CYAN: [0.0, 0.545, 0.545],
    DARK_GOLDENROD: [0.722, 0.525, 0.043],
    DARK_GRAY: [0.663, 0.663, 0.663],
    DARK_GREEN: [0.0, 0.392, 0.0],
    DARK_GREY: [0.663, 0.663, 0.663],
    DARK_KHAKI: [0.741, 0.718, 0.42],
    DARK_MAGENTA: [0.545, 0.0, 0.545],
    DARK_OLIVEGREEN: [0.333, 0.42, 0.184],
    DARK_ORANGE: [1.0, 0.549, 0.0],
    DARK_ORCHID: [0.6, 0.196, 0.8],
    DARK_RED: [0.545, 0.0, 0.0],
    DARK_SALMON: [0.914, 0.588, 0.478],
    DARK_SEA_GREEN: [0.561, 0.737, 0.561],
    DARK_SLATE_BLUE: [0.282, 0.239, 0.545],
    DARK_SLATE_GRAY: [0.184, 0.31, 0.31],
    DARK_SLATE_GREY: [0.184, 0.31, 0.31],
    DARK_TURQUOISE: [0.0, 0.808, 0.82],
    DARK_VIOLET: [0.58, 0.0, 0.827],
    DEEP_PINK: [1.0, 0.078, 0.576],
    DEEP_SKY_BLUE: [0.0, 0.749, 1.0],
    DIM_GRAY: [0.412, 0.412, 0.412],
    DIM_GREY: [0.412, 0.412, 0.412],
    DODGER_BLUE: [0.118, 0.565, 1.0],
    FIRE_BRICK: [0.698, 0.133, 0.133],
    FLORAL_WHITE: [1.0, 0.98, 0.941],
    FOREST_GREEN: [0.133, 0.545, 0.133],
    GAINSBORO: [0.863, 0.863, 0.863],
    GHOST_WHITE: [0.973, 0.973, 1.0],
    GOLD: [1.0, 0.843, 0.0],
    GOLDENROD: [0.855, 0.647, 0.125],
    GREEN_YELLOW: [0.678, 1.0, 0.184],
    GREY: [0.502, 0.502, 0.502],
    HONEYDEW: [0.941, 1.0, 0.941],
    HOT_PINK: [1.0, 0.412, 0.706],
    INDIAN_RED: [0.804, 0.361, 0.361],
    INDIGO: [0.294, 0.0, 0.51],
    IVORY: [1.0, 1.0, 0.941],
    KHAKI: [0.941, 0.902, 0.549],
    LAVENDER: [0.902, 0.902, 0.98],
    LAVENDER_BLUSH: [1.0, 0.941, 0.961],
    LAWN_GREEN: [0.486, 0.988, 0.0],
    LEMON_CHIFFON: [1.0, 0.98, 0.804],
    LIGHT_BLUE: [0.678, 0.847, 0.902],
    LIGHT_CORAL: [0.941, 0.502, 0.502],
    LIGHT_CYAN: [0.878, 1.0, 1.0],
    LIGHT_GOLDENROD_YELLOW: [0.98, 0.98, 0.824],
    LIGHT_GRAY: [0.827, 0.827, 0.827],
    LIGHT_GREEN: [0.565, 0.933, 0.565],
    LIGHT_GREY: [0.827, 0.827, 0.827],
    LIGHT_PINK: [1.0, 0.714, 0.757],
    LIGHT_SALMON: [1.0, 0.627, 0.478],
    LIGHT_SEA_GREEN: [0.125, 0.698, 0.667],
    LIGHT_SKY_BLUE: [0.529, 0.808, 0.98],
    LIGHT_SLATE_GRAY: [0.467, 0.533, 0.6],
    LIGHT_SLATE_GREY: [0.467, 0.533, 0.6],
    LIGHT_STEEL_BLUE: [0.69, 0.769, 0.871],
    LIGHT_YELLOW: [1.0, 1.0, 0.878],
    LIMEGREEN: [0.196, 0.804, 0.196],
    LINEN: [0.98, 0.941, 0.902],
    MAGENTA: [1.0, 0.0, 1.0],
    MEDIUM_AQUAMARINE: [0.4, 0.804, 0.667],
    MEDIUM_BLUE: [0.0, 0.0, 0.804],
    MEDIUM_ORCHID: [0.729, 0.333, 0.827],
    MEDIUM_PURPLE: [0.576, 0.439, 0.859],
    MEDIUM_SEA_GREEN: [0.235, 0.702, 0.443],
    MEDIUM_SLATE_BLUE: [0.482, 0.408, 0.933],
    MEDIUM_SPRING_GREEN: [0.0, 0.98, 0.604],
    MEDIUM_TURQUOISE: [0.282, 0.82, 0.8],
    MEDIUM_VIOLET_RED: [0.78, 0.082, 0.522],
    MIDNIGHT_BLUE: [0.098, 0.098, 0.439],
    MINT_CREAM: [0.961, 1.0, 0.98],
    MISTY_ROSE: [1.0, 0.894, 0.882],
    MOCCASIN: [1.0, 0.894, 0.71],
    NAVAJO_WHITE: [1.0, 0.871, 0.678],
    OLD_LACE: [0.992, 0.961, 0.902],
    OLIVE_DRAB: [0.42, 0.557, 0.137],
    ORANGE: [1.0, 0.647, 0.0],
    ORANGE_RED: [1.0, 0.271, 0.0],
    ORCHID: [0.855, 0.439, 0.839],
    PALE_GOLDENROD: [0.933, 0.91, 0.667],
    PALE_GREEN: [0.596, 0.984, 0.596],
    PALE_TURQUOISE: [0.686, 0.933, 0.933],
    PALE_VIOLETRED: [0.859, 0.439, 0.576],
    PAPAYA_WHIP: [1.0, 0.937, 0.835],
    PEACHPUFF: [1.0, 0.855, 0.725],
    PERU: [0.804, 0.522, 0.247],
    PINK: [1.0, 0.753, 0.796],
    PLUM: [0.867, 0.627, 0.867],
    POWDER_BLUE: [0.69, 0.878, 0.902],
    REBECCA_PURPLE: [0.4, 0.2, 0.6],
    ROSY_BROWN: [0.737, 0.561, 0.561],
    ROYAL_BLUE: [0.255, 0.412, 0.882],
    SADDLE_BROWN: [0.545, 0.271, 0.075],
    SALMON: [0.98, 0.502, 0.447],
    SANDY_BROWN: [0.957, 0.643, 0.376],
    SEA_GREEN: [0.18, 0.545, 0.341],
    SEASHELL: [1.0, 0.961, 0.933],
    SIENNA: [0.627, 0.322, 0.176],
    SKY_BLUE: [0.529, 0.808, 0.922],
    SLATE_BLUE: [0.416, 0.353, 0.804],
    SLATE_GRAY: [0.439, 0.502, 0.565],
    SLATE_GREY: [0.439, 0.502, 0.565],
    SNOW: [1.0, 0.98, 0.98],
    SPRING_GREEN: [0.0, 1.0, 0.498],
    STEEL_BLUE: [0.275, 0.51, 0.706],
    TAN: [0.824, 0.706, 0.549],
    THISTLE: [0.847, 0.749, 0.847],
    TOMATO: [1.0, 0.388, 0.278],
    TURQUOISE: [0.251, 0.878, 0.816],
    VIOLET: [0.933, 0.51, 0.933],
    WHEAT: [0.961, 0.871, 0.702],
    WHITE_SMOKE: [0.961, 0.961, 0.961],
    YELLOW_GREEN: [0.604, 0.804, 0.196],
};
