import { Blot, Leaf } from './abstract/blot';
import LeafBlot from './abstract/leaf';
import EditorRegistry, * as Registry from '../registry';
declare class TextBlot extends LeafBlot implements Leaf {
    editorRegistry: EditorRegistry;
    static blotName: string;
    static scope: Registry.Scope;
    domNode: Text;
    protected text: string;
    static create(value: string): Text;
    static value(domNode: Text): string;
    constructor(editorRegistry: EditorRegistry, node: HTMLDivElement);
    deleteAt(index: number, length: number): void;
    index(node: Node, offset: number): number;
    insertAt(index: number, value: string, def?: any): void;
    length(): number;
    optimize(context: {
        [key: string]: any;
    }): void;
    position(index: number, inclusive?: boolean): [Node, number];
    split(index: number, force?: boolean): Blot;
    update(mutations: MutationRecord[], context: {
        [key: string]: any;
    }): void;
    value(): string;
}
export default TextBlot;
