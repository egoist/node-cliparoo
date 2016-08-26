
/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var escape = require('shell-escape');
var os = require('os');
var switchy = require('switchy')

// platforms

switchy({
  freebsd() {
    module.exports = freebsd;
  },
  win32() {
    module.exports = windows;
  },
  linux() {
    module.exports = linux;
  },
  darwin() {
    module.exports = mac;
  },
  default() {
    module.exports = unsupported;
  }
})(os.platform())

// unsupported

function unsupported(str, fn) {
  fn(new Error('unsupported platform'));
}

// freebsd

function freebsd(str, fn) {
  execute('xsel -i -b', str, fn);
}

// windows

function windows(str, fn) {
  execute('clip', str, fn);
}

// linux

function linux(str, fn) {
  execute('xclip -selection clipboard', str, fn);
}

// mac

function mac(str, fn) {
  execute('pbcopy', str, fn);
}

// exec

function execute(program, str, fn) {
  var cmd = escape(['printf', str]) + ' | ' + program;
  exec(cmd, fn || function(){});
}
