import {
    DocumentColorProvider,
    TextDocument,
    ProviderResult,
    Color,
    ColorPresentation,
    ColorInformation,
    Range,
    CancellationToken,
} from "vscode";
import { formatNumber } from "./extractor/utility";
import { extractColors } from "./extractor/extractor";

class ColorProvider implements DocumentColorProvider {
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

            try {
                extractColors(line, colorInformation, token);
            } catch (error) {
                console.error("Failed to extract color from line");
            }
        }

        return colorInformation;
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
            const alpha = formatNumber(color.alpha);
            const colorLabel = `Color::srgba(${r}, ${g}, ${b}, ${alpha})`;
            const colorPresentation = new ColorPresentation(colorLabel);

            return [colorPresentation];
        }
    }
}

export default ColorProvider;
