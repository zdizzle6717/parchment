import ContainerBlot from './abstract/container';
import EditorRegistry, * as Registry from '../registry';
declare class ScrollBlot extends ContainerBlot {
    editorRegistry: EditorRegistry;
    static blotName: string;
    static defaultChild: string;
    static scope: Registry.Scope;
    static tagName: string;
    observer: MutationObserver;
    constructor(editorRegistry: EditorRegistry, node: HTMLDivElement);
    detach(): void;
    deleteAt(index: number, length: number): void;
    formatAt(index: number, length: number, name: string, value: any): void;
    insertAt(index: number, value: string, def?: any): void;
    optimize(mutations?: MutationRecord[], context?: {
        [key: string]: any;
    }): void;
    update(mutations?: MutationRecord[], context?: {
        [key: string]: any;
    }): void;
}
export default ScrollBlot;
