import EditorRegistry, * as Registry from '../registry';

export interface AttributorOptions {
  scope?: Registry.Scope;
  whitelist?: string[];
}

export default class Attributor {
  attrName: string;
  keyName: string;
  scope: Registry.Scope;
  whitelist: string[];

  static keys(node: HTMLElement): string[] {
    return [].map.call(node.attributes, function(item) {
      return item.name;
    });
  }

  constructor(attrName: string, keyName: string, options: AttributorOptions = {}) {
    this.attrName = attrName;
    this.keyName = keyName;
    let attributeBit = Registry.Scope.TYPE & Registry.Scope.ATTRIBUTE;
    if (options.scope != null) {
      // Ignore type bits, force attribute bit
      this.scope = (options.scope & Registry.Scope.LEVEL) | attributeBit;
    } else {
      this.scope = Registry.Scope.ATTRIBUTE;
    }
    if (options.whitelist != null) this.whitelist = options.whitelist;
  }

  add(node: HTMLElement, value: string, editorRegistry: EditorRegistry): boolean {
    if (!this.canAdd(node, value, editorRegistry)) return false;
    node.setAttribute(this.keyName, value);
    return true;
  }

  canAdd(node: HTMLElement, value: any, editorRegistry: EditorRegistry): boolean {
    let match = editorRegistry.query(node, Registry.Scope.BLOT & (this.scope | Registry.Scope.TYPE));
    if (match == null) return false;
    if (this.whitelist == null) return true;
    if (typeof value === 'string') {
      return this.whitelist.indexOf(value.replace(/["']/g, '')) > -1;
    } else {
      return this.whitelist.indexOf(value) > -1;
    }
  }

  remove(node: HTMLElement): void {
    node.removeAttribute(this.keyName);
  }

  value(node: HTMLElement, editorRegistry: EditorRegistry): string {
    let value = node.getAttribute(this.keyName);
    return this.canAdd(node, value, editorRegistry, ) ? value : '';
  }
}
