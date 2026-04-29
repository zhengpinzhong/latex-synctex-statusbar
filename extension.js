const vscode = require("vscode");

/**
 * Cursor/VS Code extension entry (plain JS).
 * Creates a status bar item that triggers LaTeX Workshop's SyncTeX.
 */
function activate(context) {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  item.text = "J";
  item.tooltip = "LaTeX Workshop: 从光标同步SyncTex";

  const WORKSHOP_EXTENSION_ID = "James-Yu.latex-workshop";
  const WORKSHOP_SYNC_COMMAND_ID = "latex-workshop.synctex";
  const OUR_SYNC_COMMAND_ID = "cursor-latex-synctex-statusbar.synctex";

  const isLaTeXWorkshopInstalled = () => {
    // If not installed, getExtension() returns undefined.
    return !!vscode.extensions.getExtension(WORKSHOP_EXTENSION_ID);
  };

  const syncTeXFromCursor = async () => {
    if (!isLaTeXWorkshopInstalled()) {
      const url =
        "https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop";
      const pick = await vscode.window.showWarningMessage(
        "未检测到 LaTeX Workshop 扩展，无法执行 SyncTeX。是否打开安装页面？",
        "打开"
      );
      if (pick === "打开") {
        await vscode.env.openExternal(vscode.Uri.parse(url));
      }
      return;
    }

    try {
      await vscode.commands.executeCommand(WORKSHOP_SYNC_COMMAND_ID);
    } catch (err) {
      vscode.window.showWarningMessage(
        "执行 SyncTeX 失败。请确认 LaTeX Workshop 已安装且命令可用。"
      );
    }
  };

  context.subscriptions.push(
    vscode.commands.registerCommand(OUR_SYNC_COMMAND_ID, syncTeXFromCursor),
  );

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
      // Clicking the button triggers our wrapper command, which may show an
      // install hint if LaTeX Workshop isn't available.
      item.command = OUR_SYNC_COMMAND_ID;
      item.tooltip = isLaTeXWorkshopInstalled()
        ? "LaTeX Workshop: 从光标同步SyncTex"
        : "未安装 LaTeX Workshop：点击后将给出安装提示";
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
    vscode.extensions.onDidChange(() => updateVisibility(vscode.window.activeTextEditor)),
    item,
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

