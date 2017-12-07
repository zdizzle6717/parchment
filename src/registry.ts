import Attributor from './attributor/attributor';
import { Blot, Formattable } from './blot/abstract/blot';

export interface BlotConstructor {
  blotName: string;
  new (editorRegistry: EditorRegistry, node: Node, value?: any): Blot;
  create(value?): Node;
}

export class ParchmentError extends Error {
  message: string;
  name: string;
  stack: string;

  constructor(message) {
    message = '[Parchment] ' + message;
    super(message);
    this.message = message;
    this.name = (<any>this.constructor).name;
  }
}

export const DATA_KEY = '__blot';

export enum Scope {
  TYPE = (1 << 2) - 1, // 0011 Lower two bits
  LEVEL = ((1 << 2) - 1) << 2, // 1100 Higher two bits

  ATTRIBUTE = (1 << 0) | LEVEL, // 1101
  BLOT = (1 << 1) | LEVEL, // 1110
  INLINE = (1 << 2) | TYPE, // 0111
  BLOCK = (1 << 3) | TYPE, // 1011

  BLOCK_BLOT = BLOCK & BLOT, // 1010
  INLINE_BLOT = INLINE & BLOT, // 0110
  BLOCK_ATTRIBUTE = BLOCK & ATTRIBUTE, // 1001
  INLINE_ATTRIBUTE = INLINE & ATTRIBUTE, // 0101

  ANY = TYPE | LEVEL,
}

export default class EditorRegistry {
    attributes: { [key: string]: Attributor } = {};
    classes: { [key: string]: BlotConstructor } = {};
    tags: { [key: string]: BlotConstructor } = {};
    types: { [key: string]: Attributor | BlotConstructor } = {};

    create(input: Node | string | Scope, value?: any): Blot {
      let match = this.query(input);
      if (match == null) {
        throw new ParchmentError(`Unable to create ${input} blot`);
      }
      let BlotClass = <BlotConstructor>match;
      let node =
        input instanceof Node || input['nodeType'] === Node.TEXT_NODE ? input : BlotClass.create(value);
      return new BlotClass(this, <Node>node, value);
    }

    find(node: Node, bubble: boolean = false): Blot {
      if (node == null) return null;
      if (node[DATA_KEY] != null) return node[DATA_KEY].blot;
      if (bubble) return this.find(node.parentNode, bubble);
      return null;
    }

    query(
      query: string | Node | Scope,
      scope: Scope = Scope.ANY,
    ): Attributor | BlotConstructor {
      let match;
      if (typeof query === 'string') {
        match = this.types[query] || this.attributes[query];
      } else if (query instanceof Text || query['nodeType'] === Node.TEXT_NODE) {
        match = this.types['text'];
      } else if (typeof query === 'number') {
        if (query & Scope.LEVEL & Scope.BLOCK) {
          match = this.types['block'];
        } else if (query & Scope.LEVEL & Scope.INLINE) {
          match = this.types['inline'];
        }
      } else if (query instanceof HTMLElement) {
        let names = (query.getAttribute('class') || '').split(/\s+/);
        for (let i in names) {
          match = this.classes[names[i]];
          if (match) break;
        }
        match = match || this.tags[query.tagName];
      }
      if (match == null) return null;
      if (scope & Scope.LEVEL & match.scope && scope & Scope.TYPE & match.scope) return match;
      return null;
    }

    register(...Definitions) {
      if (Definitions.length > 1) {
        return Definitions.map((d) => {
          return this.register(d);
        });
      }
      let Definition = Definitions[0];
      if (typeof Definition.blotName !== 'string' && typeof Definition.attrName !== 'string') {
        throw new ParchmentError('Invalid definition');
      } else if (Definition.blotName === 'abstract') {
        throw new ParchmentError('Cannot register abstract class');
      }
      this.types[Definition.blotName || Definition.attrName] = Definition;
      if (typeof Definition.keyName === 'string') {
        this.attributes[Definition.keyName] = Definition;
      } else {
        if (Definition.className != null) {
          this.classes[Definition.className] = Definition;
        }
        if (Definition.tagName != null) {
          if (Array.isArray(Definition.tagName)) {
            Definition.tagName = Definition.tagName.map(function(tagName) {
              return tagName.toUpperCase();
            });
          } else {
            Definition.tagName = Definition.tagName.toUpperCase();
          }
          let tagNames = Array.isArray(Definition.tagName) ? Definition.tagName : [Definition.tagName];
          tagNames.forEach((tag) => {
            if (this.tags[tag] == null || Definition.className == null) {
              this.tags[tag] = Definition;
            }
          });
        }
      }
      return Definition;
    }
};
