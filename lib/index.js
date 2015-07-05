var dust = require('dustjs-linkedin'), extend = require('extend'), debug = require('debug')('co-dust');
var helpers = require('dustjs-helpers')
var DEFAULTOPTIONS = {
  base: process.cwd(),
  whitespace: false,
  precompiled: false
}
var codust = function(opts){
  this._opts = extend(DEFAULTOPTIONS, opts);
  dust.config = this._opts || { whitespace: false };
  var self = this;
  dust.onLoad = function(filepath, callback){
    debug("loading partial: "+filepath);
    var name = filepath;
    var fullpath = require('path').resolve(require('path').join(self._opts.base,filepath));
    if ( self._opts.precompiled ) {
      var tmpl = require(fullpath)(dust);
      callback();
    } else {
      require('fs').readFile(fullpath, function(err, data){
        if ( err ) { return callback(err); }
        callback(undefined, data.toString());
      });
    }

  }
  this._dust = dust
}
codust.prototype = {
  render: function(filepath, context) {
    var self = this, context = context || {};
    debug("rendering: "+filepath);
    return new Promise(function(resolve, reject) {
      var name = filepath;
      var fullpath = require('path').resolve(require('path').join(self._opts.base,filepath));
      try {
          debug("rendering fullpath: "+fullpath);
        if ( self._opts.precompiled ) {
          var tmpl = require(fullpath)(dust);
          tmpl(context, function(err, output){
            if ( err ) { return reject(err); }
            resolve(output);
          });
        } else {
          require('fs').readFile(fullpath, function(err, data){
            if ( err ) { debug("failed to load: "+err); return reject(err); }
            debug("loading source");
            dust.loadSource(dust.compile(data.toString(), name));
            dust.render(name, context, function(err, output) {
              if ( err ) { return reject(err); }
              resolve(output);
            });
          });
        }
      } catch(err) {
        reject(err);
      }
    });
  }
}


module.exports = codust;

