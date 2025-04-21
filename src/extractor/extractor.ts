import {
    ColorInformation,
    Range,
    Position,
    TextLine,
    CancellationToken,
} from "vscode";
import { ColorSpace } from "../colorSpace";
import { extractColor, getColorRegExps } from "./color";
import { extractTailWindColor, getTailWindRegExps } from "./tailwind";
import { extractCssColor, getCssRegExps } from "./css";
import { convertToSrgb } from "../colorConversion";

export interface ExtractedColor {
    colorSpace: ColorSpace,
    coordinate: ColorCoordinate,
    alpha: number,
}

export interface ColorCoordinate {
    first: number,
    second: number,
    third: number,
}

export function extractColors(
    line: TextLine,
    colorInformation: ColorInformation[],
    token: CancellationToken,
): void {
    const markedRanges: Range[] = [];

    // Color
    const colorRegExps = getColorRegExps();
    extractColorInformation(line, colorInformation, markedRanges, colorRegExps, extractColor, token);

    if (token.isCancellationRequested) {
        return;
    }

    // Tailwind
    const tailWindRegExps = getTailWindRegExps();
    extractColorInformation(line, colorInformation, markedRanges, tailWindRegExps, extractTailWindColor, token);

    if (token.isCancellationRequested) {
        return;
    }

    // CSS
    const cssRegExps = getCssRegExps();
    extractColorInformation(line, colorInformation, markedRanges, cssRegExps, extractCssColor, token);
}

function extractColorInformation(line: TextLine, colorInformation: ColorInformation[], markedRanges: Range[], regExps: RegExp[], colorExtractor: (match: RegExpExecArray) => ExtractedColor | undefined, token: CancellationToken): void {
    const text = line.text;
    for (let regExp of regExps) {
        if (token.isCancellationRequested) {
            return;
        }

        const matches = text.matchAll(regExp);

        for (let match of matches) {
            if (token.isCancellationRequested) {
                return;
            }

            const range = new Range(
                new Position(line.lineNumber, match.index),
                new Position(line.lineNumber, match.index + match[0].length)
            );

            // Skip ranges intersecting with existing
            // Otherwise tailwinds RED_500 would later match RED from the css colors
            if (markedRanges.some((markedRange) => markedRange.intersection(range) !== undefined)) {
                continue;
            }

            markedRanges.push(range);

            const extractedColor = colorExtractor(match);

            if (extractedColor === undefined) {
                console.error("Unable to extract color from match", match);
                continue;
            }

            const convertedColor = convertToSrgb(extractedColor);

            if (convertedColor === undefined) {
                console.error("Unable to convert color", match);
                continue;
            }

            const newColorInformation = new ColorInformation(range, convertedColor);
            colorInformation.push(newColorInformation);
        }
    }
}
