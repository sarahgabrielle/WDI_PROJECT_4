process.env.NODE_ENV = 'test';
require('babel-register')();

function nullFunc() {
  return null;
}

require.extensions['.css'] = nullFunc;
require.extensions['.png'] = nullFunc;
require.extensions['.jpg'] = nullFunc;

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');

configure({ adapter: new Adapter() });

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

window.localStorage = (function(){
  var storage = {};

  return {
    getItem: function(key) {
      return storage[key];
    },
    removeItem: function(key) {
      delete storage[key];
    },
    setItem: function(key, item) {
      storage[key] = item;
    }
  };
})();

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.localStorage = window.localStorage;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);

documentRef = document; //eslint-disable-line no-undef
