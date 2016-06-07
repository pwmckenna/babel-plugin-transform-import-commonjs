import template from "babel-template";

let buildPromise = template(`
  new Promise(function(_resolve) {
    _resolve(require($0));
  });
`);

export default function () {
  return {
    visitor: {
      CallExpression: function (path) {
        let callee = path.get("callee");
        let args   = path.get("arguments");

        if (!callee.matchesPattern("System.import") ||
            !args.length) return;

        path.replaceWith(buildPromise(args[0].node));
      }
    }
  };
};
