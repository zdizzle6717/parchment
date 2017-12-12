import Attributor from './attributor/attributor';
import { Blot } from './blot/abstract/blot';
export interface BlotConstructor {
    blotName: string;
    new (editorRegistry: EditorRegistry, node: Node, value?: any): Blot;
    create(value?: any): Node;
}
export declare class ParchmentError extends Error {
    message: string;
    name: string;
    stack: string;
    constructor(message: string);
}
export declare const DATA_KEY = "__blot";
export declare enum Scope {
    TYPE = 3,
    LEVEL = 12,
    ATTRIBUTE = 13,
    BLOT = 14,
    INLINE = 7,
    BLOCK = 11,
    BLOCK_BLOT = 10,
    INLINE_BLOT = 6,
    BLOCK_ATTRIBUTE = 9,
    INLINE_ATTRIBUTE = 5,
    ANY = 15,
}
export default class EditorRegistry {
    attributes: {
        [key: string]: Attributor;
    };
    classes: {
        [key: string]: BlotConstructor;
    };
    tags: {
        [key: string]: BlotConstructor;
    };
    types: {
        [key: string]: Attributor | BlotConstructor;
    };
    create(input: Node | string | Scope, value?: any): Blot;
    find(node: Node | null, bubble?: boolean): Blot | null;
    query(query: string | Node | Scope, scope?: Scope): Attributor | BlotConstructor | null;
    register(...Definitions: any[]): any;
}
