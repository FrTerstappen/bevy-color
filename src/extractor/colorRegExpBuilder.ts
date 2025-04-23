import { ColorDefinitionBevy } from "../colorDefinitionBevy";
import { ColorSpace } from "../colorSpace";
import { recordKeys } from "../utility";

export enum NumberType {
    Float,
    Unsigned,
}

export class ColorRegExpBuilder {
    buildAssociatedCapture(colorSpace: ColorSpace): RegExp {
        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);

        const typeName = definition.typeName;
        const associatedColors = recordKeys(definition.associatedColors);

        return this.buildAssociatedTypeCapture(
            typeName,
            associatedColors,
            true
        );
    }

    buildAssociatedTypeCapture(
        typeName: string,
        associatedColors: string[],
        innerTypeCapture: boolean
    ) {
        const typeCapture = `(${typeName})`;
        const colorOptions = associatedColors.join("|");
        const colorCapture = `(${colorOptions})`;

        const capture = `${typeCapture}::${colorCapture}`;

        if (innerTypeCapture) {
            const innerTypeCapture = this.buildInnerTypeCapture(
                capture,
                typeName
            );
            return this.buildRegExp(innerTypeCapture, [], true, true, true);
        }

        return this.buildRegExp(capture, [], true, true, true);
    }

    buildColorCapture(colorSpace: ColorSpace): RegExp {
        const definition = ColorDefinitionBevy.fromColorSpace(colorSpace);

        const functionNameAlpha = definition.functionNames[0];
        const functionName = definition.functionNames[1];
        const functionCapture = `Color::(${functionNameAlpha}|${functionName})`;

        const typeName = definition.typeName;
        const ctorNameAlpha = definition.constructorNames[0];
        const ctorName = definition.constructorNames[1];
        const ctorCapture = `(${typeName})::(?:${ctorNameAlpha}|${ctorName})`;

        const typeCapture = `(?:${functionCapture}|${ctorCapture})`;

        const numbersCapture = this.buildNumbersCapture(NumberType.Float);

        const capture = `${typeCapture}${numbersCapture}`;
        const innerTypeCapture = this.buildInnerTypeCapture(capture, typeName);

        return this.buildRegExp(innerTypeCapture, [], true, true, true);
    }

    buildColorCaptureUnsigned(
        typeName: string,
        functionNames: string[],
        allowInnerCapture: boolean
    ): RegExp {
        const numbersCapture = this.buildNumbersCapture(NumberType.Unsigned);
        const functionOptions = functionNames.join("|");
        let capture = `${typeName}::(?:${functionOptions})${numbersCapture}`;

        if (allowInnerCapture) {
            capture = this.buildInnerTypeCapture(capture, typeName);
        }

        return this.buildRegExp(capture, [], true, true, true);
    }

    buildColorCaptureHex(): RegExp {
        const hexPartCapture = "[0-9a-fA-F]";
        const hexCapture = `(${hexPartCapture}{3}|${hexPartCapture}{4}|${hexPartCapture}{6}|${hexPartCapture}{8})`;
        const capture = String.raw`Srgba::hex\(\"(?:#)?${hexCapture}?\"\)`;

        return this.buildRegExp(capture, [], true, true, true);
    }

    private buildInnerTypeCapture(capture: string, typeName: string): string {
        return `(?:Color::${typeName}\\()?${capture}(?:\\))?`;
    }

    buildCssCapture(modulePathParts: string[], colors: string[]): RegExp {
        const colorOptions = colors.join("|");
        const capture = `(${colorOptions})`;
        return this.buildRegExp(capture, modulePathParts, true, false, true);
    }

    buildTailwindCapture(
        modulePathParts: string[],
        colors: string[],
        steps: string[]
    ): RegExp {
        const colorOptions = colors.join("|");
        const stepOptions = steps.join("|");
        const capture = `(${colorOptions})_(${stepOptions})`;
        return this.buildRegExp(capture, modulePathParts, true, false, true);
    }

    private buildRegExp(
        capture: string,
        modulePathParts: string[],
        bevy: boolean,
        bevyPrelude: boolean,
        bevyColor: boolean
    ) {
        const whiteSpacesNoNewLine = String.raw`[^\S\r\n]*`;
        const invalidPrefix = `(?<!["_\\w]${whiteSpacesNoNewLine})`;
        const invalidPostfix = `(?!${whiteSpacesNoNewLine}["_:\\w])`;

        const nameSpaceCapture = this.buildNameSpaceCapture(
            modulePathParts,
            bevy,
            bevyPrelude,
            bevyColor
        );
        const regExpString = `${nameSpaceCapture}${invalidPrefix}${capture}${invalidPostfix}`;
        return new RegExp(regExpString, "gd");
    }

    private buildNumbersCapture(numberType: NumberType): string {
        let numberCapture = "";
        switch (numberType) {
            case NumberType.Float: {
                const rustFloatCapture = String.raw`((?:f32::)?NAN|-?(?:\d(?:\d|_\d{3})*)\.(?:\d{3}_)*\d*)(?:_f(?:16|32|64|128))?`;
                numberCapture = rustFloatCapture;
                break;
            }
            case NumberType.Unsigned: {
                const rustU8Capture = "([0-9]{1,3})(?:_u8)?";
                numberCapture = rustU8Capture;
                break;
            }
        }

        const numberSpaceCapture = `\\s*${numberCapture}\\s*`;
        const numbersCapture = `\\(${numberSpaceCapture},${numberSpaceCapture},${numberSpaceCapture}(?:,${numberSpaceCapture})?\\)`;
        return numbersCapture;
    }

    private buildNameSpaceCapture(
        modulePathParts: string[],
        bevy: boolean,
        bevyPrelude: boolean,
        bevyColor: boolean
    ): string {
        const possibilities: string[] = [];

        if (bevy) {
            const rootPath = ["bevy", "color"];
            const pathParts = [...rootPath, ...modulePathParts];
            const modulePathOptions = this.buildModulePathOptions(pathParts);
            possibilities.push(...modulePathOptions);
        }

        if (bevyPrelude) {
            const rootPath = ["bevy", "prelude"];
            const pathParts = [...rootPath, ...modulePathParts];
            const modulePathOptions = this.buildModulePathOptions(pathParts);
            possibilities.push(...modulePathOptions);
        }

        if (bevyColor) {
            const rootPath = ["bevy_color"];
            const pathParts = [...rootPath, ...modulePathParts];
            const modulePathOptions = this.buildModulePathOptions(pathParts);
            possibilities.push(...modulePathOptions);
        }

        const possibilityOptions = possibilities.join("|");
        const nameSpaceCapture = `(${possibilityOptions})?`;
        return nameSpaceCapture;
    }

    private buildModulePathOptions(modulePathParts: string[]): string[] {
        const possibilities: string[] = [];

        for (let index = 0; index < modulePathParts.length; index++) {
            const modulePathPartsSlice = modulePathParts.slice(index);
            const modulePath = modulePathPartsSlice.join("::");

            possibilities.push(`${modulePath}::`);

            if (index === 0) {
                possibilities.push(`::${modulePath}::`);
            }
        }

        return possibilities;
    }
}
