import parseJson from "./json.js";
import parseYaml from "./yaml.js";

export default (data, extname) => {
  switch (extname) {
    case ".json":
      return parseJson(data);
    case ".yml":
    case ".yaml":
      return parseYaml(data);
    default:
      throw new Error(`Unknown format: ${extname}`);
  }
};
