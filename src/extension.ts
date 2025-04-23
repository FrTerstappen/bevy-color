import { DocumentSelector, ExtensionContext, languages } from "vscode";
import ColorProvider from "./colorProvider";

export function activate(context: ExtensionContext) {
    console.log("Activating bevy-color");

    // Diagnostic collection
    const diagnosticCollection =
        languages.createDiagnosticCollection("bevy-color");
    context.subscriptions.push(diagnosticCollection);

    const documentSelector: DocumentSelector = [
        { scheme: "untitled", language: "rust" },
        { scheme: "file", language: "rust" },
    ];

    // Color provider
    const colorProvider = new ColorProvider(diagnosticCollection);
    const colorProviderDisposable = languages.registerColorProvider(
        documentSelector,
        colorProvider
    );
    context.subscriptions.push(colorProviderDisposable);
}

export function deactivate() {
    console.log("Deactivating bevy-color");
}
