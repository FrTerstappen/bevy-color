import { NumberRange } from "./numberRange";

export class ColorCoordinateRange {
    first: NumberRange;
    second: NumberRange;
    third: NumberRange;

    constructor(first: NumberRange, second: NumberRange, third: NumberRange) {
        this.first = first;
        this.second = second;
        this.third = third;
    }
}
