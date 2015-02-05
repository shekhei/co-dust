# co-dust

Basically this allows something like this

```javascript
var codust = require('co-dust');
dust = new codust({base:'./'});
var val = yield dust.render('test.dust');
dust.render('dust2.dust')
  .then(function(val){console.log(val);})
  .catch(function(err){throw err;});
```
