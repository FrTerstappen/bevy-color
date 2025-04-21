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
