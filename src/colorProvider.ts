import {
    DocumentColorProvider,
    TextDocument,
    ProviderResult,
    Color,
    ColorPresentation,
    ColorInformation,
    Range,
    CancellationToken,
    TextLine,
} from "vscode";
import { extractColorInformation } from "./extractor/utility";
import { formatNumber } from "./extractor/utility";
import { extractColor, getColorRegExps } from "./extractor/color";
import { extractTailWindColor, getTailWindRegExps } from "./extractor/tailwind";
import { extractCssColor, getCssRegExps } from "./extractor/css";

class ColorProvider implements DocumentColorProvider {

    constructor() { }

    provideDocumentColors(
        document: TextDocument,
        token: CancellationToken,
    ): ProviderResult<ColorInformation[]> {
        const colorInformation: ColorInformation[] = [];

        for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
            if (token.isCancellationRequested) {
                return colorInformation;
            }

            const line = document.lineAt(lineNumber);
            if (line.isEmptyOrWhitespace) {
                continue;
            }

            this.extractColors(line, colorInformation, token);
        }

        return colorInformation;
    }

    private extractColors(
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

    provideColorPresentations(
        color: Color,
        _context: { document: TextDocument, range: Range },
        _token: CancellationToken
    ): ProviderResult<ColorPresentation[]> {
        const r = formatNumber(color.red);
        const g = formatNumber(color.green);
        const b = formatNumber(color.blue);

        if (color.alpha === 1.0) {
            const colorLabel = `Color::srgb(${r}, ${g}, ${b})`;
            const colorPresentation = new ColorPresentation(colorLabel);

            return [colorPresentation];
        } else {

            const a = formatNumber(color.alpha);
            const colorLabel = `Color::srgba(${r}, ${g}, ${b}, ${a})`;
            const colorPresentation = new ColorPresentation(colorLabel);

            return [colorPresentation];
        }
    }
}

export default ColorProvider;
