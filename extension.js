const vscode = require("vscode");

/**
 * Converts any input text to ChunkCase.
 */
function toChunkCase(str) {
    if (!str) return str;

    // Step 1: Convert camelCase/PascalCase to spaced words
    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    str = str.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");

    // Step 2: Split on spaces, underscores, hyphens
    let words = str.split(/[\s_-]+/);

    // Step 3: Normalize to lowercase
    words = words.map(w => w.toLowerCase());

    // Step 4: Group meaningful chunks
    return words.join("__");
}

function activate(context) {
    let disposable = vscode.commands.registerCommand(
        "chunkcase.convert",
        function () {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            if (!text) return;

            const converted = toChunkCase(text);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, converted);
            });
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
