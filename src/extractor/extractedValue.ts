import { Range } from "vscode";

export class ExtractedValue<T> {
    value: T;
    range?: Range;

    constructor(value: T, range?: Range) {
        this.value = value;
        this.range = range;
    }
}
