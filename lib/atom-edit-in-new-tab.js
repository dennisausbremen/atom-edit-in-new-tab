'use babel';

import { CompositeDisposable } from 'atom';

export default {
  config: {
    autoIndentSelection: {
      title: "Auto-Indent Selection",
      description: "Automatically indent selected text in new tab.",
      type: "boolean",
      default: true,
      order: 1
    },
    cutSelection: {
      title: "Cut Selection",
      description: "Cut selection in original document, instead of just copying it.",
      type: "boolean",
      default: false,
      order: 2
    }
  },
  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-edit-in-new-tab:edit': () => this.edit()
    }));
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  serialize() {},

  edit() {
    if (editor = atom.workspace.getActiveTextEditor()) {

      let selection = editor.getSelectedText()
      let grammar = editor.getGrammar()
      let cut = atom.config.get('atom-edit-in-new-tab.cutSelectionOnEdit');
      let ai = atom.config.get('atom-edit-in-new-tab.cutSelectionOnEdit');

      if (selection && selection.length) {

        if (cut) {
          editor.delete();
        }

        atom.workspace.open()
          .then(pane => {
            let ws = atom.workspace.getActiveTextEditor()
            pane.insertText(selection);
            if (grammar !== null && grammar.name) {
              ws.setGrammar(grammar)
            }
            ws.selectAll();

            if (ai) {
              ws.autoIndentSelectedRows();
            }
          })
          .catch (error => {
            atom.notifications.addError(error, {dismissable: true})
            atom.beep()
          });
      } else {
        atom.notifications.addWarning('No text selected to open in new tab.', {dismissable: true})
        atom.beep()
      }
    }
  }

};
