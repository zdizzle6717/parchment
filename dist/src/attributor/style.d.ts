import Attributor from './attributor';
import EditorRegistry from '../registry';
declare class StyleAttributor extends Attributor {
    static keys(node: Element): string[];
    add(node: HTMLElement, value: string, editorRegistry: EditorRegistry): boolean;
    remove(node: HTMLElement): void;
    value(node: HTMLElement, editorRegistry: EditorRegistry): string;
}
export default StyleAttributor;
