'use strict';

class HeaderBlot extends BlockBlot {}
HeaderBlot.blotName = 'header';
HeaderBlot.tagName = ['h1', 'h2'];

EditorRegistry.register(HeaderBlot);
