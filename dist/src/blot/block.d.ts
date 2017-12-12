import FormatBlot from './abstract/format';
import EditorRegistry, * as Registry from '../registry';
declare class BlockBlot extends FormatBlot {
    editorRegistry: EditorRegistry;
    static blotName: string;
    static editorRegistry: EditorRegistry;
    static scope: Registry.Scope;
    static tagName: string;
    static formats(domNode: HTMLElement, editorRegistry: EditorRegistry): any;
    constructor(editorRegistry: EditorRegistry, domNode: Node);
    format(name: string, value: any): void;
    formatAt(index: number, length: number, name: string, value: any): void;
    insertAt(index: number, value: string, def?: any): void;
    update(mutations: MutationRecord[], context: {
        [key: string]: any;
    }): void;
}
export default BlockBlot;
