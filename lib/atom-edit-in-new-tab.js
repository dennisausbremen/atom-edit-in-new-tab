'use babel';

import { CompositeDisposable } from 'atom';

export default {

  atomEditInNewTabEditor: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-edit-in-new-tab:edit': () => this.edit()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomEditInNewTabEditor.destroy();
  },

  serialize() {},



  edit() {
    if (editor = atom.workspace.getActiveTextEditor()) {

      let selection = editor.getSelectedText();
      let grammar = editor.getGrammar();

      if (selection.length) {
        atomEditInNewTabEditor = atom.workspace.open();
        atomEditInNewTabEditor.then(function(pane) {
          pane.insertText(selection);
          if (grammar !== null && grammar.name) {
            atom.workspace.getActiveTextEditor().setGrammar(grammar);
          }
        }, function (error) {
          console.error(error);
        });
      }
    }
  }

};
