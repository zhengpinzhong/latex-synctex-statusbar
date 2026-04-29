const vscode = require("vscode");

/**
 * Cursor/VS Code extension entry (plain JS).
 * Creates a status bar item that triggers LaTeX Workshop's SyncTeX.
 */
function activate(context) {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  item.text = "J";
  item.tooltip = "LaTeX Workshop: 从光标同步SyncTex";

  const isTeXLikeEditor = (editor) => {
    if (!editor) return false;
    const doc = editor.document;
    const fileName = (doc.fileName || "").toLowerCase();
    const languageId = doc.languageId;
    // Language ID depends on VS Code/LaTeX Workshop; file name is a good fallback.
    return languageId === "latex" || languageId === "tex" || fileName.endsWith(".tex");
  };

  const updateVisibility = (editor) => {
    const shouldShow = isTeXLikeEditor(editor);
    if (shouldShow) {
      // Clicking the button triggers the existing LaTeX Workshop command.
      item.command = "latex-workshop.synctex";
      item.show();
    } else {
      item.command = undefined;
      item.hide();
    }
  };

  // Initialize based on current active editor.
  updateVisibility(vscode.window.activeTextEditor);

  // Keep status bar button in sync with the currently active editor.
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => updateVisibility(editor)),
    item
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

