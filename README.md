# LaTeX Workshop SyncTeX StatusBar Button (Cursor)

## 项目目的

在 Cursor（VS Code 系列编辑器）里，LaTeX Workshop 的 SyncTeX（从光标同步到 PDF）通常需要打开扩展相关的侧边栏/入口才能触发。

本项目希望把“从光标同步 SyncTeX”做成一个 **状态栏(Status Bar)** 按钮，避免频繁打开侧边栏；你只需要点击底部状态栏左侧的按钮即可执行 `latex-workshop.synctex`。

## 已经做了什么

1. 创建了一个很小的 Cursor/VS Code 扩展（本地扩展）。
2. 扩展启动后在状态栏左侧创建一个按钮：
   - 按钮显示内容：大写 `J`
   - 点击行为：触发 LaTeX Workshop 命令 `latex-workshop.synctex`
   - 悬停提示(tooltip)：`LaTeX Workshop: 从光标同步SyncTex`

## 将要做什么

1. 规范化扩展信息（让它更容易发布到公开平台）：
   - 在 `package.json` 补全 `repository` / `license` / `icon` 等信息
   - 调整 `engines.vscode` 为更合适的版本范围
2. 从“本地扩展”升级为“可发布扩展”：
   - 使用 `vsce`（VS Code Extension tool）生成 `.vsix`
   - 发布到你选择的平台（VS Marketplace 或 OpenVSX）
3.（可选）进一步改进体验：
   - 让按钮在未安装 LaTeX Workshop 时给出提示（目前假设命令可用）
   - 提供更友好的显示文本（例如 `Synctex`）或可配置按钮文案

