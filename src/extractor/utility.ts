import {
    ColorInformation,
    Range,
    Position,
    TextLine,
    CancellationToken,
    Color,
} from "vscode";

export function extractColorInformation(line: TextLine, colorInformation: ColorInformation[], markedRanges: Range[], regExps: RegExp[], colorExtractor: (match: RegExpExecArray) => Color | undefined, token: CancellationToken): void {
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

            const color = colorExtractor(match);

            // Unsupported or broken color
            if (color === undefined) {
                console.error("Unable to extract color", match);
                continue;
            }

            markedRanges.push(range);

            const newColorInformation = new ColorInformation(range, color);
            colorInformation.push(newColorInformation);
        }
    }
}

export const nameSpaceBaseRegExp = "(?:(?:bevy_color::)|(?:bevy::)?(?:color::))?";
export const rustFloatRegExp = "\\s*(-?(?:\\d(?:\\d|_\\d{3})*)\\.(?:\\d{3}_)*\\d*)(?:_f(?:16|32|64|128))?\\s*";
export const rustU8RegExp = "\\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(?:_u8)?\\s*";

export function formatNumber(value: number): string {
    if (value >= 1.0) {
        return "1.00";
    }

    if (value <= 0.0) {
        return "0.00";
    }

    const formatted = value.toFixed(2);
    return formatted;
}
