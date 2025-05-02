use bevy::{math::VectorSpace, prelude::*};

fn main() {
    logo();

    no_highlight();

    name_space();

    css();
    tailwind();
    color();

    srgb();
    srgb_hex();
    srgb_unsigned();
    linear_rgb();
    hsl();
    hsv();
    hwb();
    lab();
    lch();
    oklab();
    oklch();
    xyz();

    multiple_in_line();
    out_of_range();
}

fn logo() {
    use bevy::color::palettes::css::{ALICE_BLUE, CORNSILK, DARK_ORCHID};
    use bevy_color::palettes::tailwind::{AMBER_700, EMERALD_900, PURPLE_300};

    let _color = AMBER_700;
    let _color = PURPLE_300;
    let _color = EMERALD_900;
    let _color = ALICE_BLUE;
    let _color = CORNSILK;
    let _color = DARK_ORCHID;
}

#[allow(
    unused_variables,
    reason = "Need variable names with specific patterns"
)]
#[allow(unused_parens, reason = "Need for example")]
fn no_highlight() {
    const RED: i32 = 1;
    const A_RED: i32 = 1;
    const RED_BUTTON: i32 = 1;
    const A_RED_BUTTON: i32 = 1;

    let red = RED;
    let a_red = A_RED;
    let red_button = RED_BUTTON;
    let a_red_button = A_RED_BUTTON;

    let _test = (RED);
    let _test = ("A", RED);
    let _test = (RED, "B");
    let _test = ("A", RED, "B");

    let _test = "RED";

    let _test = "SOME RED";
    let _test = "RED STRING";
    let _test = "SOME RED STRING";

    let _test = "SOMERED";
    let _test = "REDSTRING";
    let _test = "SOMEREDSTRING";

    // Comment taken from https://github.com/bevyengine/bevy/blob/main/crates/bevy_pbr/src/pbr_material.rs
    //
    // The default emissive color is [`LinearRgba::BLACK`], which doesn't add anything to the material color.
    //
    // To increase emissive strength, channel values for `emissive`
    // colors can exceed `1.0`. For instance, a `base_color` of
    // `LinearRgba::rgb(1.0, 0.0, 0.0)` represents the brightest
    // red for objects that reflect light, but an emissive color
    // like `LinearRgba::rgb(1000.0, 0.0, 0.0)` can be used to create
    // intensely bright red emissive effects.
}

fn name_space() {
    use bevy::color;

    let _color = ::bevy_color::Color::srgb(1.00, 0.00, 0.00);
    let _color = ::bevy_color::Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = ::bevy_color::Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = ::bevy_color::Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = ::bevy_color::Color::hsl(0.00, 1.00, 0.50);
    let _color = ::bevy_color::Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = ::bevy_color::Color::hsv(0.00, 1.00, 1.00);
    let _color = ::bevy_color::Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = ::bevy_color::Color::hwb(1.00, 0.00, 0.00);
    let _color = ::bevy_color::Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = ::bevy_color::Color::lab(0.81, 0.97, 0.84);
    let _color = ::bevy_color::Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = ::bevy_color::Color::lch(0.81, 1.07, 40.86);
    let _color = ::bevy_color::Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = ::bevy_color::Color::oklab(0.63, 0.56, 0.31);
    let _color = ::bevy_color::Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = ::bevy_color::Color::oklch(0.61, 0.63, 29.23);
    let _color = ::bevy_color::Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = ::bevy_color::Color::xyz(0.41, 0.21, 0.02);
    let _color = ::bevy_color::Color::xyza(0.41, 0.21, 0.02, 1.00);

    let _color = bevy_color::Color::srgb(1.00, 0.00, 0.00);
    let _color = bevy_color::Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = bevy_color::Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = bevy_color::Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = bevy_color::Color::hsl(0.00, 1.00, 0.50);
    let _color = bevy_color::Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = bevy_color::Color::hsv(0.00, 1.00, 1.00);
    let _color = bevy_color::Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = bevy_color::Color::hwb(1.00, 0.00, 0.00);
    let _color = bevy_color::Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = bevy_color::Color::lab(0.81, 0.97, 0.84);
    let _color = bevy_color::Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = bevy_color::Color::lch(0.81, 1.07, 40.86);
    let _color = bevy_color::Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = bevy_color::Color::oklab(0.63, 0.56, 0.31);
    let _color = bevy_color::Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = bevy_color::Color::oklch(0.61, 0.63, 29.23);
    let _color = bevy_color::Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = bevy_color::Color::xyz(0.41, 0.21, 0.02);
    let _color = bevy_color::Color::xyza(0.41, 0.21, 0.02, 1.00);

    let _color = ::bevy::color::Color::srgb(1.00, 0.00, 0.00);
    let _color = ::bevy::color::Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = ::bevy::color::Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = ::bevy::color::Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = ::bevy::color::Color::hsl(0.00, 1.00, 0.50);
    let _color = ::bevy::color::Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = ::bevy::color::Color::hsv(0.00, 1.00, 1.00);
    let _color = ::bevy::color::Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = ::bevy::color::Color::hwb(1.00, 0.00, 0.00);
    let _color = ::bevy::color::Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = ::bevy::color::Color::lab(0.81, 0.97, 0.84);
    let _color = ::bevy::color::Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = ::bevy::color::Color::lch(0.81, 1.07, 40.86);
    let _color = ::bevy::color::Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = ::bevy::color::Color::oklab(0.63, 0.56, 0.31);
    let _color = ::bevy::color::Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = ::bevy::color::Color::oklch(0.61, 0.63, 29.23);
    let _color = ::bevy::color::Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = ::bevy::color::Color::xyz(0.41, 0.21, 0.02);
    let _color = ::bevy::color::Color::xyza(0.41, 0.21, 0.02, 1.00);

    let _color = bevy::color::Color::srgb(1.00, 0.00, 0.00);
    let _color = bevy::color::Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = bevy::color::Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = bevy::color::Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = bevy::color::Color::hsl(0.00, 1.00, 0.50);
    let _color = bevy::color::Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = bevy::color::Color::hsv(0.00, 1.00, 1.00);
    let _color = bevy::color::Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = bevy::color::Color::hwb(1.00, 0.00, 0.00);
    let _color = bevy::color::Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = bevy::color::Color::lab(0.81, 0.97, 0.84);
    let _color = bevy::color::Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = bevy::color::Color::lch(0.81, 1.07, 40.86);
    let _color = bevy::color::Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = bevy::color::Color::oklab(0.63, 0.56, 0.31);
    let _color = bevy::color::Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = bevy::color::Color::oklch(0.61, 0.63, 29.23);
    let _color = bevy::color::Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = bevy::color::Color::xyz(0.41, 0.21, 0.02);
    let _color = bevy::color::Color::xyza(0.41, 0.21, 0.02, 1.00);

    let _color = ::bevy::prelude::Color::srgb(1.00, 0.00, 0.00);
    let _color = ::bevy::prelude::Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = ::bevy::prelude::Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = ::bevy::prelude::Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = ::bevy::prelude::Color::hsl(0.00, 1.00, 0.50);
    let _color = ::bevy::prelude::Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = ::bevy::prelude::Color::hsv(0.00, 1.00, 1.00);
    let _color = ::bevy::prelude::Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = ::bevy::prelude::Color::hwb(1.00, 0.00, 0.00);
    let _color = ::bevy::prelude::Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = ::bevy::prelude::Color::lab(0.81, 0.97, 0.84);
    let _color = ::bevy::prelude::Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = ::bevy::prelude::Color::lch(0.81, 1.07, 40.86);
    let _color = ::bevy::prelude::Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = ::bevy::prelude::Color::oklab(0.63, 0.56, 0.31);
    let _color = ::bevy::prelude::Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = ::bevy::prelude::Color::oklch(0.61, 0.63, 29.23);
    let _color = ::bevy::prelude::Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = ::bevy::prelude::Color::xyz(0.41, 0.21, 0.02);
    let _color = ::bevy::prelude::Color::xyza(0.41, 0.21, 0.02, 1.00);

    let _color = bevy::prelude::Color::srgb(1.00, 0.00, 0.00);
    let _color = bevy::prelude::Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = bevy::prelude::Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = bevy::prelude::Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = bevy::prelude::Color::hsl(0.00, 1.00, 0.50);
    let _color = bevy::prelude::Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = bevy::prelude::Color::hsv(0.00, 1.00, 1.00);
    let _color = bevy::prelude::Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = bevy::prelude::Color::hwb(1.00, 0.00, 0.00);
    let _color = bevy::prelude::Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = bevy::prelude::Color::lab(0.81, 0.97, 0.84);
    let _color = bevy::prelude::Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = bevy::prelude::Color::lch(0.81, 1.07, 40.86);
    let _color = bevy::prelude::Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = bevy::prelude::Color::oklab(0.63, 0.56, 0.31);
    let _color = bevy::prelude::Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = bevy::prelude::Color::oklch(0.61, 0.63, 29.23);
    let _color = bevy::prelude::Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = bevy::prelude::Color::xyz(0.41, 0.21, 0.02);
    let _color = bevy::prelude::Color::xyza(0.41, 0.21, 0.02, 1.00);

    let _color = color::Color::srgb(1.00, 0.00, 0.00);
    let _color = color::Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = color::Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = color::Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = color::Color::hsl(0.00, 1.00, 0.50);
    let _color = color::Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = color::Color::hsv(0.00, 1.00, 1.00);
    let _color = color::Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = color::Color::hwb(1.00, 0.00, 0.00);
    let _color = color::Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = color::Color::lab(0.81, 0.97, 0.84);
    let _color = color::Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = color::Color::lch(0.81, 1.07, 40.86);
    let _color = color::Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = color::Color::oklab(0.63, 0.56, 0.31);
    let _color = color::Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = color::Color::oklch(0.61, 0.63, 29.23);
    let _color = color::Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = color::Color::xyz(0.41, 0.21, 0.02);
    let _color = color::Color::xyza(0.41, 0.21, 0.02, 1.00);
}

fn css() {
    use bevy::color::{
        self, palettes,
        palettes::{css, css::GREEN},
    };

    let _color = ::bevy_color::palettes::css::BLANCHED_ALMOND;
    let _color = bevy_color::palettes::css::DARK_ORANGE;
    let _color = ::bevy::color::palettes::css::GREEN_YELLOW;
    let _color = bevy::color::palettes::css::AZURE;
    let _color = color::palettes::css::BLUE;
    let _color = palettes::css::YELLOW;
    let _color = css::RED;
    let _color = GREEN;
}

fn tailwind() {
    use bevy::color::{
        self, palettes,
        palettes::{tailwind, tailwind::PURPLE_300},
    };

    let _color = ::bevy_color::palettes::tailwind::BLUE_700;
    let _color = bevy_color::palettes::tailwind::YELLOW_200;
    let _color = ::bevy::color::palettes::tailwind::INDIGO_400;
    let _color = bevy::color::palettes::tailwind::PINK_700;
    let _color = color::palettes::tailwind::RED_500;
    let _color = palettes::tailwind::AMBER_700;
    let _color = tailwind::NEUTRAL_200;
    let _color = PURPLE_300;
}

fn color() {
    let _color = Color::BLACK;
    let _color = Color::WHITE;
    let _color = Color::NONE;

    let _color = Color::srgb(1.00, 0.00, 0.00);
    let _color = Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = Color::hsl(0.00, 1.00, 0.50);
    let _color = Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = Color::hsv(0.00, 1.00, 1.00);
    let _color = Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = Color::hwb(1.00, 0.00, 0.00);
    let _color = Color::hwba(0.94, 0.00, 0.00, 1.00);
    let _color = Color::lab(0.81, 0.97, 0.84);
    let _color = Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = Color::lch(0.81, 1.07, 40.86);
    let _color = Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = Color::oklab(0.63, 0.56, 0.31);
    let _color = Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = Color::oklch(0.61, 0.63, 29.23);
    let _color = Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = Color::xyz(0.41, 0.21, 0.02);
    let _color = Color::xyza(0.41, 0.21, 0.02, 1.00);
}

fn srgb() {
    let _color = Srgba::BLACK;
    let _color = Srgba::BLUE;
    let _color = Srgba::GREEN;
    let _color = Srgba::NONE;
    let _color = Srgba::RED;
    let _color = Srgba::WHITE;
    let _color = Srgba::ZERO;

    let _color = Color::Srgba(Srgba::BLACK);
    let _color = Color::Srgba(Srgba::WHITE);

    let _color = Color::srgba(1.00, 0.00, 0.00, 1.00);
    let _color = Color::srgba(0.00, 1.00, 0.00, 1.00);

    let _color = Color::srgb(1.00, 0.00, 0.00);
    let _color = Color::srgb(0.00, 1.00, 0.00);

    let _color = Color::Srgba(Srgba::new(1.00, 0.00, 0.00, 1.00));
    let _color = Color::Srgba(Srgba::new(0.00, 1.00, 0.00, 1.00));

    let _color = Srgba::new(1.00, 0.00, 0.00, 1.00);
    let _color = Srgba::new(0.00, 1.00, 0.00, 1.00);

    let _color = Srgba::rgb(1.00, 0.00, 0.00);
    let _color = Srgba::rgb(0.00, 1.00, 0.00);
}

fn srgb_hex() {
    // 3
    let _color = Srgba::hex("F00").unwrap();
    let _color = Srgba::hex("0F0").unwrap();

    let _color = Srgba::hex("f00").unwrap();
    let _color = Srgba::hex("0f0").unwrap();

    let _color = Srgba::hex("#F00").unwrap();
    let _color = Srgba::hex("#0F0").unwrap();

    let _color = Srgba::hex("#f00").unwrap();
    let _color = Srgba::hex("#0f0").unwrap();

    // 4
    let _color = Srgba::hex("F00F").unwrap();
    let _color = Srgba::hex("0F0F").unwrap();

    let _color = Srgba::hex("f00f").unwrap();
    let _color = Srgba::hex("0f0f").unwrap();

    let _color = Srgba::hex("#F00F").unwrap();
    let _color = Srgba::hex("#0F0F").unwrap();

    let _color = Srgba::hex("#f00f").unwrap();
    let _color = Srgba::hex("#0f0f").unwrap();

    // 6
    let _color = Srgba::hex("FF0000").unwrap();
    let _color = Srgba::hex("00FF00").unwrap();

    let _color = Srgba::hex("ff0000").unwrap();
    let _color = Srgba::hex("00ff00").unwrap();

    let _color = Srgba::hex("#FF0000").unwrap();
    let _color = Srgba::hex("#00FF00").unwrap();

    let _color = Srgba::hex("#ff0000").unwrap();
    let _color = Srgba::hex("#00ff00").unwrap();

    // 8
    let _color = Srgba::hex("FF0000FF").unwrap();
    let _color = Srgba::hex("00FF00FF").unwrap();

    let _color = Srgba::hex("ff0000ff").unwrap();
    let _color = Srgba::hex("00ff00ff").unwrap();

    let _color = Srgba::hex("#FF0000FF").unwrap();
    let _color = Srgba::hex("#00FF00FF").unwrap();

    let _color = Srgba::hex("#ff0000ff").unwrap();
    let _color = Srgba::hex("#00ff00ff").unwrap();
}

fn srgb_unsigned() {
    let _color = Color::srgba_u8(255, 0, 0, 255);
    let _color = Color::srgba_u8(0, 255, 0, 255);

    let _color = Color::srgb_u8(255, 0, 0);
    let _color = Color::srgb_u8(0, 255, 0);

    let _color = Color::Srgba(Srgba::rgb_u8(255, 0, 0));
    let _color = Color::Srgba(Srgba::rgb_u8(0, 255, 0));

    let _color = Srgba::rgb_u8(255, 0, 0);
    let _color = Srgba::rgb_u8(0, 255, 0);

    let _color = Srgba::rgba_u8(255, 0, 0, 255);
    let _color = Srgba::rgba_u8(0, 255, 0, 255);
}

fn linear_rgb() {
    let _color = LinearRgba::BLACK;
    let _color = LinearRgba::BLUE;
    let _color = LinearRgba::GREEN;
    let _color = LinearRgba::NAN;
    let _color = LinearRgba::NONE;
    let _color = LinearRgba::RED;
    let _color = LinearRgba::WHITE;
    let _color = LinearRgba::ZERO;

    let _color = Color::LinearRgba(LinearRgba::BLACK);
    let _color = Color::LinearRgba(LinearRgba::WHITE);

    let _color = Color::linear_rgba(1.00, 0.00, 0.00, 1.00);
    let _color = Color::linear_rgba(0.00, 1.00, 0.00, 1.00);

    let _color = Color::linear_rgb(1.00, 0.00, 0.00);
    let _color = Color::linear_rgb(0.00, 1.00, 0.00);

    let _color = LinearRgba::new(1.00, 0.00, 0.00, 1.00);
    let _color = LinearRgba::new(0.00, 1.00, 0.00, 1.00);

    let _color = LinearRgba::rgb(1.00, 0.00, 0.00);
    let _color = LinearRgba::rgb(1.00, 1.00, 0.00);
}

fn hsl() {
    let _color = Hsla::BLACK;
    let _color = Hsla::WHITE;

    let _color = Color::Hsla(Hsla::BLACK);
    let _color = Color::Hsla(Hsla::WHITE);

    let _color = Color::hsla(0.00, 1.00, 0.50, 1.00);
    let _color = Color::hsla(120.00, 1.00, 0.50, 1.00);

    let _color = Color::hsl(0.00, 1.00, 0.50);
    let _color = Color::hsl(120.00, 1.00, 0.50);

    let _color = Hsla::new(0.00, 1.00, 0.50, 1.00);
    let _color = Hsla::new(120.00, 1.00, 0.50, 1.00);

    let _color = Hsla::hsl(0.00, 1.00, 0.50);
    let _color = Hsla::hsl(120.00, 1.00, 0.50);
}

fn hsv() {
    let _color = Hsva::BLACK;
    let _color = Hsva::WHITE;

    let _color = Color::Hsva(Hsva::BLACK);
    let _color = Color::Hsva(Hsva::WHITE);

    let _color = Color::hsva(0.00, 1.00, 1.00, 1.00);
    let _color = Color::hsva(120.00, 1.00, 1.00, 1.00);

    let _color = Color::hsv(0.00, 1.00, 1.00);
    let _color = Color::hsv(120.00, 1.00, 1.00);

    let _color = Hsva::new(0.00, 1.00, 1.00, 1.00);
    let _color = Hsva::new(120.00, 1.00, 1.00, 1.00);

    let _color = Hsva::hsv(0.00, 1.00, 1.00);
    let _color = Hsva::hsv(120.00, 1.00, 1.00);
}

fn hwb() {
    let _color = Hwba::BLACK;
    let _color = Hwba::WHITE;

    let _color = Color::Hwba(Hwba::BLACK);
    let _color = Color::Hwba(Hwba::WHITE);

    let _color = Color::hwba(1.00, 0.00, 0.00, 1.00);
    let _color = Color::hwba(120.00, 0.00, 0.00, 1.00);

    let _color = Color::hwb(1.00, 0.00, 0.00);
    let _color = Color::hwb(120.00, 0.00, 0.00);

    let _color = Hwba::new(1.00, 0.00, 0.00, 1.00);
    let _color = Hwba::new(120.00, 0.00, 0.00, 1.00);

    let _color = Hwba::hwb(1.00, 0.00, 0.00);
    let _color = Hwba::hwb(120.00, 0.00, 0.00);
}

fn lab() {
    let _color = Laba::BLACK;
    let _color = Laba::WHITE;
    let _color = Laba::ZERO;

    let _color = Color::Laba(Laba::BLACK);
    let _color = Color::Laba(Laba::WHITE);

    let _color = Color::laba(0.81, 0.97, 0.84, 1.00);
    let _color = Color::laba(1.32, -0.94, 0.91, 1.00);

    let _color = Color::lab(0.81, 0.97, 0.84);
    let _color = Color::lab(1.32, -0.94, 0.91);

    let _color = Laba::new(0.81, 0.97, 0.84, 1.00);
    let _color = Laba::new(1.32, -0.94, 0.91, 1.00);

    let _color = Laba::lab(0.81, 0.97, 0.84);
    let _color = Laba::lab(1.32, -0.94, 0.91);
}

fn lch() {
    let _color = Lcha::BLACK;
    let _color = Lcha::WHITE;

    let _color = Color::Lcha(Lcha::BLACK);
    let _color = Color::Lcha(Lcha::WHITE);

    let _color = Color::lcha(0.81, 1.07, 40.86, 1.00);
    let _color = Color::lcha(1.32, 1.12, 133.46, 1.00);

    let _color = Color::lch(0.81, 1.07, 40.86);
    let _color = Color::lch(1.32, 1.12, 133.46);

    let _color = Lcha::new(0.81, 1.07, 40.86, 1.00);
    let _color = Lcha::new(1.32, 1.12, 133.46, 1.00);

    let _color = Lcha::lch(0.81, 1.07, 40.86);
    let _color = Lcha::lch(1.32, 1.12, 133.46);
}

fn oklab() {
    let _color = Oklaba::BLACK;
    let _color = Oklaba::WHITE;
    let _color = Oklaba::ZERO;

    let _color = Color::Oklaba(Oklaba::BLACK);
    let _color = Color::Oklaba(Oklaba::WHITE);

    let _color = Color::oklaba(0.63, 0.56, 0.31, 1.00);
    let _color = Color::oklaba(0.87, -0.58, 0.45, 1.00);

    let _color = Color::oklab(0.63, 0.56, 0.31);
    let _color = Color::oklab(0.87, -0.58, 0.45);

    let _color = Oklaba::new(0.63, 0.56, 0.31, 1.00);
    let _color = Oklaba::new(0.87, -0.58, 0.45, 1.00);

    let _color = Oklaba::lab(0.63, 0.56, 0.31);
    let _color = Oklaba::lab(0.87, -0.58, 0.45);
}

fn oklch() {
    let _color = Oklcha::BLACK;
    let _color = Oklcha::WHITE;

    let _color = Color::Oklcha(Oklcha::BLACK);
    let _color = Color::Oklcha(Oklcha::WHITE);

    let _color = Color::oklcha(0.61, 0.63, 29.23, 1.00);
    let _color = Color::oklcha(0.87, 0.73, 142.27, 1.00);

    let _color = Color::oklch(0.61, 0.63, 29.23);
    let _color = Color::oklch(0.87, 0.73, 142.27);

    let _color = Oklcha::new(0.61, 0.63, 29.23, 1.00);
    let _color = Oklcha::new(0.87, 0.73, 142.27, 1.00);

    let _color = Oklcha::lch(0.61, 0.63, 29.23);
    let _color = Oklcha::lch(0.87, 0.73, 142.27);
}

fn xyz() {
    let _color = Xyza::BLACK;
    let _color = Xyza::D65_WHITE;
    let _color = Xyza::WHITE;
    let _color = Xyza::ZERO;

    let _color = Color::Xyza(Xyza::BLACK);
    let _color = Color::Xyza(Xyza::WHITE);

    let _color = Color::xyza(0.41, 0.21, 0.02, 1.00);
    let _color = Color::xyza(0.36, 0.72, 0.13, 1.00);

    let _color = Color::xyz(0.41, 0.21, 0.02);
    let _color = Color::xyz(0.36, 0.72, 0.13);

    let _color = Xyza::new(0.41, 0.21, 0.02, 1.00);
    let _color = Xyza::new(0.36, 0.72, 0.13, 1.00);

    let _color = Xyza::xyz(0.41, 0.21, 0.02);
    let _color = Xyza::xyz(0.36, 0.72, 0.13);
}

fn multiple_in_line() {
    use bevy::color::palettes::{tailwind::CYAN_300, tailwind::PURPLE_300};

    let _colors = (CYAN_300, PURPLE_300);
}

fn out_of_range() {
    let _color = Color::srgb(1000.00, 0.00, 0.00);
    let _color = Color::srgb(0.00, 1000.00, 0.00);
    let _color = Color::srgb(0.00, 0.00, 1000.00);

    let _color = Color::srgba(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::srgba(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::srgba(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::srgba(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::linear_rgb(1000.00, 0.00, 0.00);
    let _color = Color::linear_rgb(0.00, 1000.00, 0.00);
    let _color = Color::linear_rgb(0.00, 0.00, 1000.00);

    let _color = Color::linear_rgba(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::linear_rgba(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::linear_rgba(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::linear_rgba(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::hsl(1000.00, 0.00, 0.00);
    let _color = Color::hsl(0.00, 1000.00, 0.00);
    let _color = Color::hsl(0.00, 0.00, 1000.00);

    let _color = Color::hsla(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::hsla(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::hsla(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::hsla(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::hsv(1000.00, 0.00, 0.00);
    let _color = Color::hsv(0.00, 1000.00, 0.00);
    let _color = Color::hsv(0.00, 0.00, 1000.00);

    let _color = Color::hsva(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::hsva(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::hsva(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::hsva(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::hwb(1000.00, 0.00, 0.00);
    let _color = Color::hwb(0.00, 1000.00, 0.00);
    let _color = Color::hwb(0.00, 0.00, 1000.00);

    let _color = Color::hwba(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::hwba(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::hwba(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::hwba(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::lab(1000.00, 0.00, 0.00);
    let _color = Color::lab(0.00, 1000.00, 0.00);
    let _color = Color::lab(0.00, 0.00, 1000.00);

    let _color = Color::laba(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::laba(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::laba(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::laba(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::lch(1000.00, 0.00, 0.00);
    let _color = Color::lch(0.00, 1000.00, 0.00);
    let _color = Color::lch(0.00, 0.00, 1000.00);

    let _color = Color::lcha(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::lcha(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::lcha(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::lcha(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::oklab(1000.00, 0.00, 0.00);
    let _color = Color::oklab(0.00, 1000.00, 0.00);
    let _color = Color::oklab(0.00, 0.00, 1000.00);

    let _color = Color::oklaba(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::oklaba(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::oklaba(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::oklaba(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::oklch(1000.00, 0.00, 0.00);
    let _color = Color::oklch(0.00, 1000.00, 0.00);
    let _color = Color::oklch(0.00, 0.00, 1000.00);

    let _color = Color::oklcha(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::oklcha(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::oklcha(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::oklcha(0.00, 0.00, 0.00, 1000.00);

    let _color = Color::xyz(1000.00, 0.00, 0.00);
    let _color = Color::xyz(0.00, 1000.00, 0.00);
    let _color = Color::xyz(0.00, 0.00, 1000.00);

    let _color = Color::xyza(1000.00, 0.00, 0.00, 0.00);
    let _color = Color::xyza(0.00, 1000.00, 0.00, 0.00);
    let _color = Color::xyza(0.00, 0.00, 1000.00, 0.00);
    let _color = Color::xyza(0.00, 0.00, 0.00, 1000.00);
}
