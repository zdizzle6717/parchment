import EditorRegistry, * as Registry from '../registry';
export interface AttributorOptions {
    scope?: Registry.Scope;
    whitelist?: string[];
}
export default class Attributor {
    attrName: string;
    keyName: string;
    scope: Registry.Scope;
    whitelist: string[] | null;
    static keys(node: HTMLElement): string[];
    constructor(attrName: string, keyName: string, options?: AttributorOptions);
    add(node: HTMLElement, value: string, editorRegistry: EditorRegistry): boolean;
    canAdd(node: HTMLElement, value: any, editorRegistry: EditorRegistry): boolean;
    remove(node: HTMLElement): void;
    value(node: HTMLElement, editorRegistry: EditorRegistry): string;
}
