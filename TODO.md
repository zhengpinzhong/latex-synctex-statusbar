# TODO

## VS Marketplace 发布清单

- [ ] 解决 Azure DevOps / Microsoft 账号问题，确保可登录并可创建 PAT。
- [ ] 在 Azure DevOps 创建 PAT（Scope: `Marketplace > Manage`）。
- [ ] 在项目目录执行 `vsce login zpz` 并粘贴 PAT。
- [ ] 检查是否需要升级 `package.json` 版本号（当前为 `0.0.5`）。
- [ ] 执行 `npm run package` 验证可正常打包。
- [ ] 执行 `vsce publish`（或 `vsce publish patch`）发布到 VS Marketplace。
- [ ] 在 VS Marketplace 搜索 `cursor-latex-synctex-statusbar` / `zpz`，确认上架可见。
- [ ] 在 VS Code 和 Cursor 扩展商店中再次确认可见性。
- [ ] 可选：发布后打 git tag（如 `v0.0.5`）并推送 tags。

