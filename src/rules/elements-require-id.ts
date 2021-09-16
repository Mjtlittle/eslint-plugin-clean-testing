import type { Node, TmplAstElement } from "@angular/compiler";

export const RULE_NAME = "elements-require-id";
const default_tags = ["select", "input", "textarea", "button", "a"];

export default {
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "require certain elements have an id",
      category: "Possible Errors",
      recommended: true,
      url: "",
    },
    fixable: "code",
    schema: [
      {
        // list of elements that must have an id
        type: "array",
        items: {
          type: "string",
        },
      },
    ],
  },
  create: (context: any) => {
    const parserServices = context.parserServices;

    const tag_names = context.options[0] || default_tags;
    const all_tags_regex = `/^(${tag_names.join("|")})$/`;

    return {
      // target all elements in all tags list
      [`Element[name=${all_tags_regex}]`](node: TmplAstElement) {
        // skip the element if it has an id
        if (element_has_id(node)) return;

        // report the error
        const loc = parserServices.convertElementSourceSpanToLoc(context, node);
        context.report({
          loc,
          message: `Element ${node.name} must have an id`,
          data: {
            element: node.name,
          },
        });
      },
    };
  },
};

const element_get_attribute = (
  node: TmplAstElement,
  attribute_name: string
) => {
  for (const attribute of node.attributes) {
    if (attribute.name === attribute_name) return attribute;
  }
  return null;
};

const element_has_id = (node: TmplAstElement) => {
  const id_attribute = element_get_attribute(node, "id");
  return !!id_attribute;
};
