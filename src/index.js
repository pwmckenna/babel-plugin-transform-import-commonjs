import template from "babel-template";

let buildPromise = template(`
  new Promise(function(resolve) {
    resolve(require($0));
  }.bind(this));
`);

export default function () {
  return {
    visitor: {
      CallExpression: function (path) {
        let callee = path.get("callee");
        let args   = path.get("arguments");

        if (callee.type !== 'Import' ||
            !args.length) return;

        path.scope.rename("require");
        path.replaceWith(buildPromise(args[0].node));
      }
    }
  };
}
