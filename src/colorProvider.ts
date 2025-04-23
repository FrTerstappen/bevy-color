import {
    DocumentColorProvider,
    TextDocument,
    ProviderResult,
    Color,
    ColorPresentation,
    ColorInformation,
    Range,
    CancellationToken,
    DiagnosticCollection,
} from "vscode";
import { ColorPresenter } from "./colorPresenter";
import { DocumentProcessor } from "./documentProcessor";
import { RangeProcessor } from "./rangeProcessor";
import { ColorExtractorBevyTailwind } from "./extractor/colorExtractorBevyTailwind";
import { ColorExtractorBevyCss } from "./extractor/colorExtractorBevyCss";
import { ColorExtractorBevyColor } from "./extractor/colorExtractorBevyColor";
import { ColorExtractorBevyAssociated } from "./extractor/colorExtractorBevyAssociated";
import { ColorExtractorBevyColorUnsigned } from "./extractor/colorExtractorBevyColorUnsigned";
import { ColorExtractorBevyColorHex } from "./extractor/colorExtractorBevyColorHex";

class ColorProvider implements DocumentColorProvider {
    private documentProcessor: DocumentProcessor;
    private colorPresenter: ColorPresenter;

    constructor(diagnosticCollection: DiagnosticCollection) {
        const rangeProcessor = new RangeProcessor();

        const colorExtractorBevyAssociated = new ColorExtractorBevyAssociated();
        rangeProcessor.addColorExtractor(colorExtractorBevyAssociated);

        const colorExtractorBevyColor = new ColorExtractorBevyColor();
        rangeProcessor.addColorExtractor(colorExtractorBevyColor);

        const colorExtractorBevyColorHex = new ColorExtractorBevyColorHex();
        rangeProcessor.addColorExtractor(colorExtractorBevyColorHex);

        const colorExtractorBevyColorUnsignedColorExtractorBevyColorUnsigned =
            new ColorExtractorBevyColorUnsigned();
        rangeProcessor.addColorExtractor(
            colorExtractorBevyColorUnsignedColorExtractorBevyColorUnsigned
        );

        const colorExtractorBevyTailwind = new ColorExtractorBevyTailwind();
        rangeProcessor.addColorExtractor(colorExtractorBevyTailwind);

        const colorExtractorBevyCss = new ColorExtractorBevyCss();
        rangeProcessor.addColorExtractor(colorExtractorBevyCss);

        this.documentProcessor = new DocumentProcessor(
            diagnosticCollection,
            rangeProcessor
        );

        this.colorPresenter = new ColorPresenter(rangeProcessor);
    }

    provideDocumentColors(
        document: TextDocument,
        token: CancellationToken
    ): ProviderResult<ColorInformation[]> {
        const colorInformation = this.documentProcessor.process(
            document,
            token
        );

        return colorInformation;
    }

    provideColorPresentations(
        color: Color,
        context: { document: TextDocument; range: Range },
        token: CancellationToken
    ): ProviderResult<ColorPresentation[]> {
        const colorPresentations = this.colorPresenter.buildColorPresentations(
            color,
            context,
            token
        );

        return colorPresentations;
    }
}

export default ColorProvider;
