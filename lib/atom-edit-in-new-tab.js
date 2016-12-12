'use babel';

import { CompositeDisposable } from 'atom';

export default {
  config: {
    // from https://atom.io/docs/api/v1.5.3/Selection#instance-insertText
    actions: {
      title: 'Selection Actions',
      type: 'object',
      properties: {
        cutSelection: {
          title: 'Cut Selection',
          description: 'Cut selection in original document, instead of just copying it. (e.g. while splitting file in seperate parts)',
          type: 'boolean',
          default: false,
          order: 1
        }
      }
    },
    format: {
      title: 'Output Format',
      type: 'object',
      properties: {
        select: {
          title: 'Select',
          description: 'Selects the newly added text',
          type: 'boolean',
          'default': false,
          order: 1
        },
        autoIndent: {
          title: 'Auto-indent',
          description: 'Indents all inserted text appropriately',
          type: 'boolean',
          'default': false,
          order: 2
        },
        autoIndentNewline: {
          title: 'Auto-indent newline',
          description: 'Indent newline appropriately',
          type: 'boolean',
          'default': false,
          order: 3
        },
        autoDecreaseIndent: {
          title: 'Auto-decrease indent',
          description: 'Decreases indent level appropriately (e.g. when a closing bracket is inserted)',
          type: 'boolean',
          'default': false,
          order: 4
        },
        normalizeLineEndings: {
          title: 'Normalize line endings',
          type: 'boolean',
          'default': true,
          order: 5
        }
      }
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
      const config = atom.config
      const options = {
        select: config.get('atom-edit-in-new-tab.format.select'),
        autoIndent: config.get('atom-edit-in-new-tab.format.autoIndent'),
        autoIndentNewline: config.get('atom-edit-in-new-tab.format.autoIndentNewline'),
        autoDecreaseIndent: config.get('atom-edit-in-new-tab.format.autoDecreaseIndent'),
        normalizeLineEndings: config.get('atom-edit-in-new-tab.format.normalizeLineEndings')
      }
      let selection = editor.getSelectedText()
      let grammar = editor.getGrammar()

      if (selection && selection.length) {

        if (config.get('atom-edit-in-new-tab.actions.cutSelection')) {
          editor.delete();
        }

        atom.workspace.open()
          .then(pane => {
            let ws = atom.workspace.getActiveTextEditor()
            if (grammar !== null && grammar.name) {
              ws.setGrammar(grammar)
            }
            pane.insertText(selection, options);
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
