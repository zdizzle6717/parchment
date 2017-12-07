import FormatBlot from './abstract/format';
import EditorRegistry, * as Registry from '../registry';
declare class InlineBlot extends FormatBlot {
    editorRegistry: EditorRegistry;
    static blotName: string;
    static scope: Registry.Scope;
    static tagName: string;
    static formats(domNode: any): any;
    constructor(editorRegistry: EditorRegistry, domNode: Node);
    format(name: string, value: any): void;
    formatAt(index: number, length: number, name: string, value: any): void;
    optimize(context: {
        [key: string]: any;
    }): void;
}
export default InlineBlot;
