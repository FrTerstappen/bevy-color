export function recordKeys<K extends PropertyKey, T>(object: Record<K, T>) {
    return Object.keys(object) as K[];
}

export function isDebugMode(): boolean {
    return process.env.VSCODE_DEBUG_MODE === "true";
}
