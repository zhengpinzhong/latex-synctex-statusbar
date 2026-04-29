const vscode = require("vscode");

/**
 * Cursor/VS Code extension entry (plain JS).
 * Creates a status bar item that triggers LaTeX Workshop's SyncTeX.
 */
function activate(context) {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  item.text = "J";
  item.tooltip = "LaTeX Workshop: 从光标同步SyncTex";
  // Clicking the button triggers the existing LaTeX Workshop command.
  item.command = "latex-workshop.synctex";
  item.show();
  context.subscriptions.push(item);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

