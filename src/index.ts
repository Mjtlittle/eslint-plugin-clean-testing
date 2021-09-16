import elementsRequireId, {
  RULE_NAME as elementsRequireIdName,
} from "./rules/elements-require-id";

export default {
  configs: {
    recommended: {
      parser: "@angular-eslint/template-parser",
      plugins: ["clean-testing"],
      rules: {
        [`clean-testing/${elementsRequireIdName}`]: "error",
      },
    },
  },
  rules: {
    [elementsRequireIdName]: elementsRequireId,
  },
};
