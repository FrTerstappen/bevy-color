import { Range } from "vscode";
import { NumberRange } from "../numberRange";
import { ExtractedValue } from "./extractedValue";

export class ExtractedNumber extends ExtractedValue<number> {
    numberRange: NumberRange;

    constructor(number: number, numberRange: NumberRange, range?: Range) {
        super(number, range);
        this.numberRange = numberRange;
    }
}
