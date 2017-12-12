import Attributor from './attributor';
import { Formattable } from '../blot/abstract/blot';
import EditorRegistry from '../registry';
declare class AttributorStore {
    private attributes;
    private domNode;
    private editorRegistry;
    constructor(editorRegistry: EditorRegistry, domNode: HTMLElement);
    attribute(attribute: Attributor, value: any): void;
    build(): void;
    copy(target: Formattable): void;
    move(target: Formattable): void;
    values(): {
        [key: string]: any;
    };
}
export default AttributorStore;
