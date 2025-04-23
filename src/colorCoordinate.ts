import ColorJS, { Coords } from "colorjs.io";
import { ColorCoordinateRange } from "./colorCoordinateRange";
import { ColorSpace } from "./colorSpace";
import { ColorDefinitionColorJs } from "./colorDefinitionColorJs";
import { ColorDefinitionBevy } from "./colorDefinitionBevy";

export class ColorCoordinate {
    first: number;
    second: number;
    third: number;

    constructor(first: number, second: number, third: number) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    convertColorCoordinate(
        sourceColorSpace: ColorSpace,
        targetColorSpace: ColorSpace
    ): ColorCoordinate {
        const sourceBevyDefinition =
            ColorDefinitionBevy.fromColorSpace(sourceColorSpace);
        const sourceColorJsDefinition =
            ColorDefinitionColorJs.fromColorSpace(sourceColorSpace);

        const sourceBevyRange = sourceBevyDefinition.colorCoordinateRange;
        const sourceColorJsRange = sourceColorJsDefinition.colorCoordinateRange;

        const rangeTransformedSourceCoordinate = this.convertToRange(
            sourceBevyRange,
            sourceColorJsRange
        );

        const colorJsSource =
            ColorDefinitionColorJs.fromColorSpace(sourceColorSpace);
        const spaceNameSource = colorJsSource.name;

        const colorJsTarget =
            ColorDefinitionColorJs.fromColorSpace(targetColorSpace);
        const spaceNameTarget = colorJsTarget.name;

        const rangeTransformedSourceCoords: Coords = [
            rangeTransformedSourceCoordinate.first,
            rangeTransformedSourceCoordinate.second,
            rangeTransformedSourceCoordinate.third,
        ];
        const colorJs = new ColorJS(
            spaceNameSource,
            rangeTransformedSourceCoords
        );
        const targetColor = colorJs.to(spaceNameTarget);

        const targetColorCoordinate = new ColorCoordinate(
            targetColor.coords[0],
            targetColor.coords[1],
            targetColor.coords[2]
        );

        const targetColorJsDefinition =
            ColorDefinitionColorJs.fromColorSpace(targetColorSpace);
        const targetBevyDefinition =
            ColorDefinitionBevy.fromColorSpace(targetColorSpace);

        const targetColorJsRange = targetColorJsDefinition.colorCoordinateRange;
        const targetBevyRange = targetBevyDefinition.colorCoordinateRange;

        const rangeTransformedTargetCoordinate =
            targetColorCoordinate.convertToRange(
                targetColorJsRange,
                targetBevyRange
            );

        return rangeTransformedTargetCoordinate;
    }

    private convertToRange(
        sourceRange: ColorCoordinateRange,
        targetRange: ColorCoordinateRange
    ): ColorCoordinate {
        const first = sourceRange.first.convertToRange(
            this.first,
            targetRange.first
        );
        const second = sourceRange.second.convertToRange(
            this.second,
            targetRange.second
        );
        const third = sourceRange.third.convertToRange(
            this.third,
            targetRange.third
        );

        const coordinate = new ColorCoordinate(first, second, third);
        return coordinate;
    }
}
