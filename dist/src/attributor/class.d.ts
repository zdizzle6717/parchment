import Attributor from './attributor';
import EditorRegistry from '../registry';
declare class ClassAttributor extends Attributor {
    static keys(node: HTMLElement): string[];
    add(node: HTMLElement, value: string, editorRegistry: EditorRegistry): boolean;
    remove(node: HTMLElement): void;
    value(node: HTMLElement, editorRegistry: EditorRegistry): string;
}
export default ClassAttributor;
