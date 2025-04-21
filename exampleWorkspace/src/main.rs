use bevy::{math::VectorSpace, prelude::*};

fn main() {
    css();
    tailwind();
    color();

    srgb();
    linear_rgb();
    hsl();
    hsv();
    hwb();
    lab();
    lch();
    oklab();
    oklch();
    xyz();
}

fn css() {
    use bevy::color::{
        self, palettes,
        palettes::{css, css::GREEN},
    };

    let _color = bevy_color::palettes::css::AZURE;
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

    let _color = bevy_color::palettes::tailwind::YELLOW_200;
    let _color = bevy::color::palettes::tailwind::YELLOW_200;
    let _color = color::palettes::tailwind::RED_500;
    let _color = palettes::tailwind::AMBER_700;
    let _color = tailwind::NEUTRAL_200;
    let _color = PURPLE_300;
}

fn color() {
    use bevy::color;

    let _color = Color::BLACK;
    let _color = Color::WHITE;
    let _color = Color::NONE;

    let _color = bevy_color::Color::srgb(1.0, 0.0, 0.0);
    let _color = bevy::color::Color::srgb(1.0, 0.0, 0.0);
    let _color = color::Color::srgb(1.0, 0.0, 0.0);
    let _color = Color::srgb(1.0, 0.0, 0.0);
}

fn srgb() {
    let _color = Srgba::BLACK;
    let _color = Srgba::BLUE;
    let _color = Srgba::GREEN;
    let _color = Srgba::NONE;
    let _color = Srgba::RED;
    let _color = Srgba::WHITE;
    let _color = Srgba::ZERO;

    let _color = Color::srgba(1.0, 0.0, 0.0, 1.0);
    let _color = Color::srgba(1.0, 0.0, 0.0, 1.0);

    let _color = Color::srgb(1.0, 0.0, 0.0);
    let _color = Color::srgb(1.0, 0.0, 0.0);

    let _color = Color::srgba_u8(255, 255, 255, 255);
    let _color = Color::srgba_u8(255, 255, 255, 255);

    let _color = Color::srgb_u8(255, 255, 255);
    let _color = Color::srgb_u8(255, 255, 255);
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

    let _color = Color::linear_rgba(1.0, 1.0, 1.0, 1.0);
    let _color = Color::linear_rgba(1.0, 1.0, 1.0, 1.0);

    let _color = Color::linear_rgb(1.0, 1.0, 1.0);
    let _color = Color::linear_rgb(1.0, 1.0, 1.0);
}

fn hsl() {
    let _color = Hsla::BLACK;
    let _color = Hsla::WHITE;

    let _color = Color::hsla(1.0, 1.0, 1.0, 1.0);
    let _color = Color::hsla(1.0, 1.0, 1.0, 1.0);

    let _color = Color::hsl(1.0, 1.0, 1.0);
    let _color = Color::hsl(1.0, 1.0, 1.0);
}

fn hsv() {
    let _color = Hsva::BLACK;
    let _color = Hsva::WHITE;

    let _color = Color::hsva(1.0, 1.0, 1.0, 1.0);
    let _color = Color::hsva(1.0, 1.0, 1.0, 1.0);

    let _color = Color::hsv(1.0, 1.0, 1.0);
    let _color = Color::hsv(1.0, 1.0, 1.0);
}

fn hwb() {
    let _color = Hwba::BLACK;
    let _color = Hwba::WHITE;

    let _color = Color::hwba(1.0, 1.0, 1.0, 1.0);
    let _color = Color::hwba(1.0, 1.0, 1.0, 1.0);

    let _color = Color::hwb(1.0, 1.0, 1.0);
    let _color = Color::hwb(1.0, 1.0, 1.0);
}

fn lab() {
    let _color = Laba::BLACK;
    let _color = Laba::WHITE;
    let _color = Laba::ZERO;

    let _color = Color::laba(1.0, 1.0, 1.0, 1.0);
    let _color = Color::laba(1.0, 1.0, 1.0, 1.0);

    let _color = Color::lab(1.0, 1.0, 1.0);
    let _color = Color::lab(1.0, 1.0, 1.0);
}

fn lch() {
    let _color = Lcha::BLACK;
    let _color = Lcha::WHITE;

    let _color = Color::lcha(1.0, 1.0, 1.0, 1.0);
    let _color = Color::lcha(1.0, 1.0, 1.0, 1.0);

    let _color = Color::lch(1.0, 1.0, 1.0);
    let _color = Color::lch(1.0, 1.0, 1.0);
}

fn oklab() {
    let _color = Oklaba::BLACK;
    let _color = Oklaba::WHITE;
    let _color = Oklaba::ZERO;

    let _color = Color::oklaba(1.0, 1.0, 1.0, 1.0);
    let _color = Color::oklaba(1.0, 1.0, 1.0, 1.0);

    let _color = Color::oklab(1.0, 0.0, 0.0);
    let _color = Color::oklab(1.0, 0.0, 0.0);
}

fn oklch() {
    let _color = Oklcha::BLACK;
    let _color = Oklcha::WHITE;

    let _color = Color::oklcha(1.0, 0.0, 0.0, 1.0);
    let _color = Color::oklcha(1.0, 0.0, 0.0, 1.0);

    let _color = Color::oklch(1.0, 0.0, 0.0);
    let _color = Color::oklch(1.0, 0.0, 0.0);
}

fn xyz() {
    let _color = Xyza::BLACK;
    let _color = Xyza::D65_WHITE;
    let _color = Xyza::WHITE;
    let _color = Xyza::ZERO;

    let _color = Color::xyza(1.0, 0.0, 0.0, 1.0);
    let _color = Color::xyza(1.0, 0.0, 0.0, 1.0);

    let _color = Color::xyz(1.0, 0.0, 0.0);
    let _color = Color::xyz(1.0, 0.0, 0.0);
}
