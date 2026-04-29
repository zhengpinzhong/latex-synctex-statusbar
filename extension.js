const vscode = require("vscode");

/**
 * Cursor/VS Code extension entry (plain JS).
 * Creates a status bar item that triggers LaTeX Workshop's SyncTeX.
 */
function activate(context) {
  // Lower priority moves it towards the right within the left-aligned group.
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -1000);
  item.text = "J";
  item.tooltip = "LaTeX Workshop: 从光标同步SyncTex";

  const WORKSHOP_EXTENSION_ID = "James-Yu.latex-workshop";
  const WORKSHOP_SYNC_COMMAND_ID = "latex-workshop.synctex";
  const OUR_SYNC_COMMAND_ID = "cursor-latex-synctex-statusbar.synctex";

  const LANGUAGE_SETTING = "cursor-latex-synctex-statusbar.language";

  const STRINGS = {
    zh: {
      tooltipInstalled: "LaTeX Workshop: 从光标同步SyncTex",
      tooltipMissing: "未安装 LaTeX Workshop：点击后将给出安装提示",
      warnMissing:
        "未检测到 LaTeX Workshop 扩展，无法执行 SyncTeX。是否打开安装页面？",
      warnOpen: "打开",
      warnSyncFailed:
        "执行 SyncTeX 失败。请确认 LaTeX Workshop 已安装且命令可用。",
    },
    en: {
      tooltipInstalled: "LaTeX Workshop: SyncTeX from cursor",
      tooltipMissing: "LaTeX Workshop is not installed: click for install hint",
      warnMissing:
        "LaTeX Workshop extension not detected; cannot run SyncTeX. Open the installation page?",
      warnOpen: "Open",
      warnSyncFailed:
        "SyncTeX failed. Please ensure LaTeX Workshop is installed and the command is available.",
    },
  };

  const resolveLanguage = (raw) => {
    // raw: "zh" | "en" | "auto"
    if (raw === "en" || raw === "zh") return raw;
    if (raw !== "auto") return "zh";

    const uiLang = (vscode.env.language || "").toLowerCase();
    return uiLang.startsWith("en") ? "en" : "zh";
  };

  const getLanguage = () => {
    const cfg = vscode.workspace.getConfiguration();
    const raw = cfg.get(LANGUAGE_SETTING, "auto");
    return resolveLanguage(raw);
  };

  const isLaTeXWorkshopInstalled = () => {
    // If not installed, getExtension() returns undefined.
    return !!vscode.extensions.getExtension(WORKSHOP_EXTENSION_ID);
  };

  const syncTeXFromCursor = async () => {
    const lang = getLanguage();
    const s = STRINGS[lang];

    if (!isLaTeXWorkshopInstalled()) {
      const url =
        "https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop";
      const pick = await vscode.window.showWarningMessage(
        s.warnMissing,
        s.warnOpen
      );
      if (pick === s.warnOpen) {
        await vscode.env.openExternal(vscode.Uri.parse(url));
      }
      return;
    }

    try {
      await vscode.commands.executeCommand(WORKSHOP_SYNC_COMMAND_ID);
    } catch (err) {
      vscode.window.showWarningMessage(
        s.warnSyncFailed
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
      const lang = getLanguage();
      const s = STRINGS[lang];
      item.tooltip = isLaTeXWorkshopInstalled() ? s.tooltipInstalled : s.tooltipMissing;
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
    vscode.extensions.onDidChange(() =>
      updateVisibility(vscode.window.activeTextEditor)
    ),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(LANGUAGE_SETTING)) {
        updateVisibility(vscode.window.activeTextEditor);
      }
    }),
    item,
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

