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
  notice: "Lake uses this as its default model and lists your Magpie models in its own picker. Run Lake once before connecting so it can prepare its private configuration file.",
};

export function connect({ gateway, model, models }) {
  const catalog = (Array.isArray(models) ? models : [])
    .filter(item => item && typeof item.id === "string")
    .map(item => ({
      id: item.id,
      name: typeof item.name === "string" ? item.name : item.id,
      contextWindow: item.context || 0,
      maxOutput: item.output || 0,
      supportsImageInput: Boolean(item.images),
      reasoningEfforts: Array.isArray(item.efforts) ? item.efforts : [],
    }));
  return {
    baseURL: gateway.v1,
    key: gateway.key,
    catalog,
    contextWindow: model.context || 0,
    maxOutput: model.output || 0,
    supportsImageInput: Boolean(model.images),
    reasoningEfforts: Array.isArray(model.efforts) ? model.efforts : [],
  };
}
