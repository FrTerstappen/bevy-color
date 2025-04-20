// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { DocumentSelector, ExtensionContext, languages } from "vscode";
import ColorProvider from "./colorProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log("Activating bevy-color");

    const documentSelector: DocumentSelector = [
        { scheme: "untitled", language: "rust" },
        { scheme: "file", language: "rust" }
    ];
    const colorProvider = new ColorProvider();

    const disposable = languages.registerColorProvider(
        documentSelector,
        colorProvider
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log("Deactivating bevy-color");
}
