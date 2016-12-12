# "Edit in new tab"

The "Edit in new tab" Atom package creates a context menu entry for editing selected text in a new Atom pane/tab and set its syntax automatically if it's installed.

**That's it!**

## Installation

Install `atom-edit-in-new-tab` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or with Atoms CLI `apm`:

`$ apm install atom-edit-in-new-tab`

## Usage

![Edit in new tab usage](https://raw.githubusercontent.com/dennisausbremen/atom-edit-in-new-tab/master/edit-in-new-tab-usage.gif)


### Key Bindings
```javascipt
"atom-workspace": {
  "ctrl-alt-e": "atom-edit-in-new-tab:edit"
}
```


### Options

| Option           | Values              | Description                                                                                                                                          |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |                 |
| `Cut Selection` | `true` or `false`   | Cut selection in original document, instead of just copying it. **Default: `false`.**
| `Select` | `true` or `false`   | Selects the newly added text. **Default: `false`.**
| `Auto-indent` | `true` or `false`   | Indents all inserted text appropriately. **Default: `false`.**
| `Auto-indent newline` | `true` or `false`   | Indent newline appropriately. **Default: `false`.**
| `Auto-decrease indent` | `true` or `false`   | Decreases indent level appropriately (e.g. when a closing bracket is inserted). **Default: `false`.**
| `Normalize line endings` | `true` or `false`   | Normalize line endings after insert. **Default: `true`.**


#### KUDOS
_The idea is based on a tweet from [@LeaVerou on twitter](https://twitter.com/LeaVerou/status/807287092493553665)_
