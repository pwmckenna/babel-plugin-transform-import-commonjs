# babel-plugin-transform-system-import-commonjs

[Babel](https://babeljs.io/) plugin that transforms ES2015 System.import into CommonJS require.

## How this works

This plugin transforms
```js
var myModule = "./path/to/myModule";

System.import(myModule).then(function (module) {
  console.log(module);
});
```
to
```js
var myModule = "./path/to/myModule";

new Promise(function(resolve) {
  resolve(require(myModule));
}.bind(this)).then(function (module) {
  console.log(module);
});
```

## Requirements

You need support for Promise, use polyfill if needed.

## Installation

```sh
$ npm install babel-plugin-transform-system-import-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["transform-system-import-commonjs"]
}
```

### Via CLI

```sh
$ babel --plugins transform-system-import-commonjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-system-import-commonjs"]
});
```
