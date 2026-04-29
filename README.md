# LaTeX Workshop SyncTeX StatusBar Button (Cursor)

## 项目目的

在 Cursor（VS Code 系列编辑器）里，LaTeX Workshop 的 SyncTeX（从光标同步到 PDF）通常需要打开扩展相关的侧边栏/入口才能触发。

本项目希望把“从光标同步 SyncTeX”做成一个 **状态栏(Status Bar)** 按钮，避免频繁打开侧边栏；你只需要点击底部状态栏左侧的按钮即可执行 `latex-workshop.synctex`。

## 已经做了什么

1. 创建了一个很小的 Cursor/VS Code 扩展。
2. 在状态栏左侧显示按钮 `J`，并且只在当前编辑器打开的是 `.tex` / LaTeX 文件时显示。
3. 点击按钮执行 LaTeX Workshop 的命令 `latex-workshop.synctex`。
4. 若未安装 LaTeX Workshop（`James-Yu.latex-workshop`），点击按钮会弹出提示并提供安装页面。

## 安装与使用

1. 建议先安装 LaTeX Workshop（`James-Yu.latex-workshop`）。
2. 打开一个 `.tex` / LaTeX 文件后，状态栏左侧会显示按钮 `J`（非 LaTeX 文件时会隐藏）。
3. 点击按钮：已安装则执行 `latex-workshop.synctex`；未安装则弹出提示并提供安装入口。

## 发布说明
项目已补齐 `package.json` 中用于公开发布的元信息（`repository` / `license` / `icon` / `contributes` / `files` 等），并提供 `vsce package` 用于生成发行用 `.vsix`。

