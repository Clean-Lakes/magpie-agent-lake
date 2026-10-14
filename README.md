# Lake 的 Magpie Agent 插件

在 Magpie 的 **Agent** 页面为 Lake 选择模型，Lake 发起的新请求就会通过 Magpie 网关使用该模型。关闭接入后，Lake 会恢复原来的模型配置。

安装前请先启动一次 Lake，让它创建仅当前用户可读的配置文件。随后在 Magpie 的非官方 Agent 插件列表中找到 **magpie-agent-lake** 并安装，或运行 `magpie plugin add github:Clean-Lakes/magpie-agent-lake`。Magpie 和 Lake 需在同一台机器上使用同一个用户账号。

## English

Choose a [Magpie](https://usemagpie.ai/docs/plugins#agents) model for the [Lake](https://github.com/Clean-Lakes/Lake) AI workbench from Magpie's **Agents** page. Magpie connects Lake to its local OpenAI-compatible gateway. Lake reads the selection on each new request.

## Install

1. Install a Lake release that supports the Magpie Agent configuration, and start Lake once. Lake prepares `~/.lake/secrets/magpie-agent.json` with owner-only permissions.
2. Install this plugin with `magpie plugin add github:Clean-Lakes/magpie-agent-lake`, or find **Lake** under Magpie's unofficial Agent plugins.
3. In Magpie's **Agents** page, select a model for **Lake**. New Lake requests use that model.

Magpie and Lake must run under the same user account on the same machine. The plugin's default configuration path assumes Lake's default home, `~/.lake`. Lake's `LAKE_HOME` override is not supported by this plugin.

## What it writes

Magpie edits only `~/.lake/secrets/magpie-agent.json`. It writes the selected model ID, gateway `/v1` URL, a Lake-specific gateway key, and model capability hints. Lake keeps its own provider catalog and credentials separately. Disconnecting Lake in Magpie restores the file's previous values; if there was no prior selection, Lake returns to its own active provider.

**Keep the configuration file private.** Magpie preserves an existing file's mode but creates a missing file as `0644`. Start Lake once before connecting to let Lake create it as `0600`. Lake also corrects an existing owner-owned file to `0600` when it starts. The parent `~/.lake/secrets` directory must remain `0700`. Never commit this file or paste its gateway key into an issue.

If Lake does not appear in Magpie, ensure the `lake` executable is on `PATH` or that Magpie can see the `~/.lake` directory.

## Development

The plugin uses Magpie's `agent` and `connect` exports. It does not import Node APIs and has no install-time scripts or dependencies. Lake's reader lives in the Lake repository.

## License

Apache-2.0. See [LICENSE](LICENSE).
