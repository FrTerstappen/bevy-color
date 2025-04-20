# Bevy-Color

`Bevy Color` is an extension for VS Code to preview colors declared in rust files using the [Bevy](https://bevyengine.org/) game engine. It also allows adjusting them with the integrated color picker.

Currently tested with version `0.15.3` of `Bevy`.

## Features

### Color preview

Shows a preview of the color next to its declaration.
This currently works for colors declared with `Color::` as well as colors from the color palettes (tailwind and css).

![Color preview](image/ColorPreview.png)

### Color picker

Clicking on the color preview opens a color picker.
This replaces the existing color definition with `Color::srgb` or `Color::srgba` if it has a alpha value less than `1.0`.

![Color picker](image/ColorPicker.png)

## Requirements

This extension does currently not have any requirements.

## Extension Settings

This extension does currently not provide any settings.

## Known Issues

The color detection is based on multiple regular expressions and does currently not cover all possible ways to declare a color provided by `Bevy`.

While it is limited to rust files it does not actually know if `Bevy` is used.
As such it also adds a color preview to other code which resembles a color declaration in `Bevy`.

## Release Notes

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes.
