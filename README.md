# ChunkCase Converter

A VS Code extension that converts identifier-style names (camelCase, PascalCase, snake_case, kebab-case)
into ChunkCase: a clear, chunked naming style that joins lowercase words with double underscores (`__`).

# Example:

- `numberOfPages`  -> `number__of__pages`
- `Number_ofPages` -> `number__of__pages`
- `number-of-pages` -> `number__of__pages`

## Why use ChunkCase?

ChunkCase groups words into readable chunks, which can improve visual scanning and consistency across codebases that prefer explicit separators.

#  Features

- Convert symbols across the current file or the entire workspace.
- Uses VS Code's symbol and reference providers to safely rename declarations and usages.
- Skips external or non-workspace files to avoid breaking external dependencies.

# Usage
-----

1. Open a JavaScript or TypeScript file (the extension is optimized for `*.js`, `*.jsx`, `*.ts`, `*.tsx`).
2. Use the Command Palette (Ctrl+Shift+P) and run one of the commands:

- `ChunkCase: Smart Rename (Current File)` — renames symbols only in the active file.
- `ChunkCase: Smart Rename (Workspace)` — scans workspace JS/TS files and renames symbols across files (use with care).

You can also select a symbol or place the cursor on a symbol and invoke the command; the extension will detect the symbol under the cursor via document symbols and rename its declaration + references.

# Examples
--------

- Rename a function `getUserName` to `get__user__name` across the current file.
- Convert a class `XMLHttpRequest` to `xml__http__request` across the workspace.

# How it works
------------

1. The extension asks the document symbol provider for the active document and normalizes results from providers that return either `DocumentSymbol[]` or `SymbolInformation[]`.
2. For each relevant symbol (variables, functions, methods, properties, classes, constants, parameters, fields), it computes the ChunkCase form.
3. It asks the reference provider for that symbol's references and filters the results to files inside your workspace.
4. It builds a `WorkspaceEdit` grouping edits per file and applies replacements in descending order to avoid range shifting issues.

# Safety & Limitations
--------------------

- The extension filters references to files inside workspace folders only — it will not modify files outside the workspace (for safety).
- It targets JS/TS languages; results may be unpredictable for other file types.
- Dynamic or computed references (e.g., string-based property accesses, reflective usages) may not be found by the reference provider and therefore will not be renamed.
- Always ensure your workspace is under version control (Git) or create a backup before running workspace-wide renames.

#  Development
-----------
License
-------

This project is provided as-is; add your preferred license file if you plan to publish it.

Questions or changes? Open an issue or PR and I'll review it.