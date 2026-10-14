// Optional local development agent. Install this file separately in Magpie;
// the package manifest continues to expose only the release Lake agent.
export const agent = {
  id: "lake-dev",
  name: "Lake Dev",
  bin: "lake",
  dir: "~/.lake-dev",
  config: "~/.lake-dev/secrets/magpie-agent.json",
  format: "json",
  model: "model",
  ua: ["lake"],
  icon: "https://raw.githubusercontent.com/Clean-Lakes/magpie-agent-lake/main/icon.png",
  notice: "Lake Dev keeps its models and credentials separate from Lake. Start Lake Dev once before connecting.",
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
