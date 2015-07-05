# co-dust

Basically this allows something like this

## Changelog

### 0.0.2

* Allowing [precompile] flag to be used in codust config, requires dust files to be built with dust.config.cjs

### 0.0.1

* Allowing render to be called with yielding

## Config

```javascript
var codust = require('co-dust');
dust = new codust({base:'./', precompiled: false});
var val = yield dust.render('test.dust');
dust.render('dust2.dust')
  .then(function(val){console.log(val);})
  .catch(function(err){throw err;});
```
