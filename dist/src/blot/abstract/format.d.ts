import AttributorStore from '../../attributor/store';
import { Blot, Parent, Formattable } from './blot';
import ContainerBlot from './container';
import EditorRegistry from '../../registry';
declare class FormatBlot extends ContainerBlot implements Formattable {
    editorRegistry: EditorRegistry;
    protected attributes: AttributorStore;
    static formats(domNode: any, editorRegistry: any): any;
    constructor(editorRegistry: EditorRegistry, domNode: Node);
    format(name: string, value: any): void;
    formats(): {
        [index: string]: any;
    };
    replaceWith(name: string | Blot, value?: any): Blot;
    update(mutations: MutationRecord[], context: {
        [key: string]: any;
    }): void;
    wrap(name: string | Parent, value?: any): Parent;
}
export default FormatBlot;
