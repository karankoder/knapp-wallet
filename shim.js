// Injects node.js shims for compatibility with crypto libraries
if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in global.process)) {
      global.process[p] = bProcess[p];
    }
  }
}

global.Buffer = require('buffer').Buffer;
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';
global.process.version = 'v9.4.0';
