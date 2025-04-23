import { Range } from "vscode";
import { ExtractionResult } from "./extractionResult";
import { ColorRegExpBuilder } from "./colorRegExpBuilder";

export interface ColorExtractor {
    buildRegularExpressions(colorRegExpBuilder: ColorRegExpBuilder): RegExp[];
    extract(
        range: Range,
        match: RegExpMatchArray
    ): ExtractionResult | undefined;
}
