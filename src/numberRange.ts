export class NumberRange {
    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    min: number;
    max: number;

    isInside(value: number): boolean {
        if (value < this.min) {
            return false;
        }

        if (value > this.max) {
            return false;
        }

        return true;
    }

    convertToRange(value: number, targetRange: NumberRange): number {
        const targetDiff = targetRange.max - targetRange.min;
        const sourceDiff = this.max - this.min;
        const slope = targetDiff / sourceDiff;
        const result = targetRange.min + slope * (value - this.min);
        return result;
    }

    format(): string {
        const min = this.min.toFixed(2);
        const max = this.max.toFixed(2);
        return `[${min}, ${max}]`;
    }
}

export const alphaNumberRange = new NumberRange(0.0, 1.0);
