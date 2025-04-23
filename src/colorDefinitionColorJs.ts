import { ColorCoordinateRange } from "./colorCoordinateRange";
import { ColorSpace } from "./colorSpace";
import { NumberRange } from "./numberRange";

export class ColorDefinitionColorJs {
    name: string;
    colorCoordinateRange: ColorCoordinateRange;

    constructor(name: string, colorCoordinateRange: ColorCoordinateRange) {
        this.name = name;
        this.colorCoordinateRange = colorCoordinateRange;
    }

    static fromColorSpace(colorSpace: ColorSpace): ColorDefinitionColorJs {
        switch (colorSpace) {
            case ColorSpace.Srgb: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionColorJs("srgb", range);
            }
            case ColorSpace.LinearRgb: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionColorJs("srgb-linear", range);
            }
            case ColorSpace.Hsl: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 360.0),
                    new NumberRange(0.0, 100.0),
                    new NumberRange(0.0, 100.0)
                );
                return new ColorDefinitionColorJs("hsl", range);
            }
            case ColorSpace.Hsv: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 360.0),
                    new NumberRange(0.0, 100.0),
                    new NumberRange(0.0, 100.0)
                );
                return new ColorDefinitionColorJs("hsv", range);
            }
            case ColorSpace.Hwb: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 360.0),
                    new NumberRange(0.0, 100.0),
                    new NumberRange(0.0, 100.0)
                );
                return new ColorDefinitionColorJs("hwb", range);
            }
            case ColorSpace.Lab: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 100.0),
                    new NumberRange(-125.0, 125.0),
                    new NumberRange(-125.0, 125.0)
                );
                return new ColorDefinitionColorJs("lab", range);
            }
            case ColorSpace.Lch: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 100.0),
                    new NumberRange(0.0, 150.0),
                    new NumberRange(0.0, 360.0)
                );
                return new ColorDefinitionColorJs("lch", range);
            }
            case ColorSpace.OkLab: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(-0.4, 0.4),
                    new NumberRange(-0.4, 0.4)
                );
                return new ColorDefinitionColorJs("oklab", range);
            }
            case ColorSpace.OkLch: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 0.4),
                    new NumberRange(0.0, 360.0)
                );
                return new ColorDefinitionColorJs("oklch", range);
            }
            case ColorSpace.Xyz: {
                const range = new ColorCoordinateRange(
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0),
                    new NumberRange(0.0, 1.0)
                );
                return new ColorDefinitionColorJs("xyz", range);
            }
        }
    }
}
