// Magpie Agent plugin for the Lake AI workbench.
// Lake creates this file with owner-only permissions when its server starts.
export const agent = {
  id: "lake",
  name: "Lake",
  bin: "lake",
  dir: "~/.lake",
  config: "~/.lake/secrets/magpie-agent.json",
  format: "json",
  model: "model",
  ua: ["lake"],
  icon: "https://raw.githubusercontent.com/Clean-Lakes/magpie-agent-lake/main/icon.png",
  notice: "Lake uses the new model on the next request. Run Lake once before connecting so it can prepare its private configuration file.",
};

export function connect({ gateway, model }) {
  return {
    baseURL: gateway.v1,
    key: gateway.key,
    contextWindow: model.context || 0,
    maxOutput: model.output || 0,
    supportsImageInput: Boolean(model.images),
    reasoningEfforts: Array.isArray(model.efforts) ? model.efforts : [],
  };
}
