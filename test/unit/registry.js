'use strict';

describe('EditorRegistry', function() {
  describe('create()', function() {
    it('name', function() {
      let blot = EditorRegistry.create('bold');
      expect(blot instanceof BoldBlot).toBe(true);
      expect(blot.statics.blotName).toBe('bold');
    });

    it('node', function() {
      let node = document.createElement('strong');
      let blot = EditorRegistry.create(node);
      expect(blot instanceof BoldBlot).toBe(true);
      expect(blot.statics.blotName).toBe('bold');
    });

    it('block', function() {
      let blot = EditorRegistry.create(Registry.Scope.BLOCK_BLOT);
      expect(blot instanceof BlockBlot).toBe(true);
      expect(blot.statics.blotName).toBe('block');
    });

    it('inline', function() {
      let blot = EditorRegistry.create(Registry.Scope.INLINE_BLOT);
      expect(blot instanceof InlineBlot).toBe(true);
      expect(blot.statics.blotName).toBe('inline');
    });

    it('string index', function() {
      let blot = EditorRegistry.create('header', '2');
      expect(blot instanceof HeaderBlot).toBe(true);
      expect(blot.formats()).toEqual({ header: 'h2' });
    });

    it('invalid', function() {
      expect(function() {
        EditorRegistry.create(BoldBlot);
      }).toThrowError(/\[Parchment\]/);
    });
  });

  describe('register()', function() {
    it('invalid', function() {
      expect(function() {
        EditorRegistry.register({});
      }).toThrowError(/\[Parchment\]/);
    });

    it('abstract', function() {
      expect(function() {
        EditorRegistry.register(ShadowBlot);
      }).toThrowError(/\[Parchment\]/);
    });
  });

  describe('find()', function() {
    it('exact', function() {
      let blockNode = document.createElement('p');
      blockNode.innerHTML = '<span>01</span><em>23<strong>45</strong></em>';
      let blockBlot = EditorRegistry.create(blockNode);
      expect(EditorRegistry.find(document.body)).toBeFalsy();
      expect(EditorRegistry.find(blockNode)).toBe(blockBlot);
      expect(EditorRegistry.find(blockNode.querySelector('span'))).toBe(blockBlot.children.head);
      expect(EditorRegistry.find(blockNode.querySelector('em'))).toBe(blockBlot.children.tail);
      expect(EditorRegistry.find(blockNode.querySelector('strong'))).toBe(
        blockBlot.children.tail.children.tail,
      );
      let text01 = blockBlot.children.head.children.head;
      let text23 = blockBlot.children.tail.children.head;
      let text45 = blockBlot.children.tail.children.tail.children.head;
      expect(EditorRegistry.find(text01.domNode)).toBe(text01);
      expect(EditorRegistry.find(text23.domNode)).toBe(text23);
      expect(EditorRegistry.find(text45.domNode)).toBe(text45);
    });

    it('bubble', function() {
      let blockBlot = EditorRegistry.create('block');
      let textNode = document.createTextNode('Test');
      blockBlot.domNode.appendChild(textNode);
      expect(EditorRegistry.find(textNode)).toBeFalsy();
      expect(EditorRegistry.find(textNode, true)).toEqual(blockBlot);
    });

    it('detached parent', function() {
      let blockNode = document.createElement('p');
      blockNode.appendChild(document.createTextNode('Test'));
      expect(EditorRegistry.find(blockNode.firstChild)).toBeFalsy();
      expect(EditorRegistry.find(blockNode.firstChild, true)).toBeFalsy();
    });
  });

  describe('query()', function() {
    it('class', function() {
      let node = document.createElement('em');
      node.setAttribute('class', 'author-blot');
      expect(EditorRegistry.query(node)).toBe(AuthorBlot);
    });

    it('type mismatch', function() {
      let match = EditorRegistry.query('italic', Registry.Scope.ATTRIBUTE);
      expect(match).toBeFalsy();
    });

    it('level mismatch for blot', function() {
      let match = EditorRegistry.query('italic', Registry.Scope.BLOCK);
      expect(match).toBeFalsy();
    });

    it('level mismatch for attribute', function() {
      let match = EditorRegistry.query('color', Registry.Scope.BLOCK);
      expect(match).toBeFalsy();
    });

    it('either level', function() {
      let match = EditorRegistry.query('italic', Registry.Scope.BLOCK | Registry.Scope.INLINE);
      expect(match).toBe(ItalicBlot);
    });

    it('level and type match', function() {
      let match = EditorRegistry.query('italic', Registry.Scope.INLINE & Registry.Scope.BLOT);
      expect(match).toBe(ItalicBlot);
    });

    it('level match and type mismatch', function() {
      let match = EditorRegistry.query('italic', Registry.Scope.INLINE & Registry.Scope.ATTRIBUTE);
      expect(match).toBeFalsy();
    });

    it('type match and level mismatch', function() {
      let match = EditorRegistry.query('italic', Registry.Scope.BLOCK & Registry.Scope.BLOT);
      expect(match).toBeFalsy();
    });
  });
});
