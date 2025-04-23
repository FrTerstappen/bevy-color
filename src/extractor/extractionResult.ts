import {
    Color,
    ColorInformation,
    Diagnostic,
    DiagnosticSeverity,
    Range,
} from "vscode";
import { ColorSpace } from "../colorSpace";
import { ExtractedNumber } from "./extractedNumber";
import { ExtractedValue } from "./extractedValue";
import { ColorCoordinate } from "../colorCoordinate";
import { ColorDefinitionBevy } from "../colorDefinitionBevy";
import { isDebugMode } from "../utility";

export enum ExtractionSource {
    BevyAssociated,
    BevyColor,
    BevyCss,
    BevyTailwind,
}

export class ExtractionResult {
    extractionSource: ExtractionSource;
    range: Range;
    nameSpace: ExtractedValue<string>;
    colorSpace: ExtractedValue<ColorSpace>;
    extractedFirstNumber: ExtractedNumber;
    extractedSecondNumber: ExtractedNumber;
    extractedThirdNumber: ExtractedNumber;
    extractedAlpha?: ExtractedNumber;

    constructor(
        extractionSource: ExtractionSource,
        range: Range,
        nameSpace: ExtractedValue<string>,
        colorSpace: ExtractedValue<ColorSpace>,
        extractedFirstNumber: ExtractedNumber,
        extractedSecondNumber: ExtractedNumber,
        extractedThirdNumber: ExtractedNumber,
        extractedAlpha?: ExtractedNumber
    ) {
        this.extractionSource = extractionSource;
        this.range = range;
        this.nameSpace = nameSpace;
        this.colorSpace = colorSpace;

        this.extractedFirstNumber = extractedFirstNumber;
        this.extractedSecondNumber = extractedSecondNumber;
        this.extractedThirdNumber = extractedThirdNumber;
        this.extractedAlpha = extractedAlpha;
    }

    getColorInformation(): ColorInformation | undefined {
        const sourceColorSpace = this.colorSpace.value;
        const targetColorSpace = ColorSpace.Srgb;
        const sourceCoordinate = this.getColorCoordinate();

        const targetCoordinate = sourceCoordinate.convertColorCoordinate(
            sourceColorSpace,
            targetColorSpace
        );

        const alpha = this.extractedAlpha?.value ?? 1.0;

        const color = new Color(
            targetCoordinate.first,
            targetCoordinate.second,
            targetCoordinate.third,
            alpha
        );

        const range = this.range;
        const colorInformation = new ColorInformation(range, color);
        return colorInformation;
    }

    private getColorCoordinate(): ColorCoordinate {
        const colorCoordinate = new ColorCoordinate(
            this.extractedFirstNumber.value,
            this.extractedSecondNumber.value,
            this.extractedThirdNumber.value
        );

        return colorCoordinate;
    }

    *getDiagnostics(): Generator<Diagnostic> {
        const colorSpace = this.colorSpace.value;

        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);
        const parameterNames = definition.parameterNames;

        if (isDebugMode()) {
            const firstValue = this.extractedFirstNumber.value.toString();
            const secondValue = this.extractedSecondNumber.value.toString();
            const thirdValue = this.extractedThirdNumber.value.toString();
            const alphaValue =
                this.extractedAlpha?.value.toString() ?? "undefined";
            const diagnostic = new Diagnostic(
                this.range,
                `${ColorSpace[colorSpace]},  ${firstValue}, ${secondValue}, ${thirdValue}, ${alphaValue}`,
                DiagnosticSeverity.Hint
            );
            yield diagnostic;
        }

        // Do not report range warnings for values that the user can not change
        const fixedValueSources = [
            ExtractionSource.BevyAssociated,
            ExtractionSource.BevyCss,
            ExtractionSource.BevyTailwind,
        ];
        const isFixedValueSource = fixedValueSources.includes(
            this.extractionSource
        );
        if (!isFixedValueSource) {
            yield* this.getRangeViolationDiagnostics(parameterNames);
        }
    }

    private *getRangeViolationDiagnostics(
        parameterNames: string[]
    ): Generator<Diagnostic> {
        // First
        const firstDiagnostic = this.getRangeViolationDiagnostic(
            this.extractedFirstNumber,
            parameterNames.at(0) ?? "unknown"
        );

        if (firstDiagnostic) {
            yield firstDiagnostic;
        }

        // Second
        const secondDiagnostic = this.getRangeViolationDiagnostic(
            this.extractedSecondNumber,
            parameterNames.at(1) ?? "unknown"
        );

        if (secondDiagnostic) {
            yield secondDiagnostic;
        }

        // Third
        const thirdDiagnostic = this.getRangeViolationDiagnostic(
            this.extractedThirdNumber,
            parameterNames.at(2) ?? "unknown"
        );

        if (thirdDiagnostic) {
            yield thirdDiagnostic;
        }

        // Alpha
        if (this.extractedAlpha) {
            const alphaDiagnostic = this.getRangeViolationDiagnostic(
                this.extractedAlpha,
                "alpha"
            );

            if (alphaDiagnostic) {
                yield alphaDiagnostic;
            }
        }
    }

    private getRangeViolationDiagnostic(
        extractedNumber: ExtractedNumber,
        parameterName: string
    ): Diagnostic | undefined {
        const numberRange = extractedNumber.numberRange;
        const value = extractedNumber.value;

        if (numberRange.isInside(value)) {
            return undefined;
        }

        const range = extractedNumber.range ?? this.range;

        const formattedRange = numberRange.format();
        const message = `Parameter "${parameterName}" is out of range ${formattedRange}.`;
        const diagnostic = new Diagnostic(
            range,
            message,
            DiagnosticSeverity.Warning
        );

        return diagnostic;
    }
}
