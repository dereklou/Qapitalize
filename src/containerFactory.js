'use strict';

let path       = require('path');
let dependable = require('dependable');

module.exports = {
  createContainer
};

function createContainer() {
  let container = dependable.container();
  let entries   = [
    'app.js',
    'controllers',
    'db.js',
    'models.js'
  ];

  // load each entry as a module or a directory
  // with a list of modules inside without recursion
  entries.forEach(entry => {
    container.load(path.join(__dirname, entry));
  });

  return container;
}
