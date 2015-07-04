Effroi-as-promised is a lightweight wrapper around the [effroi](https://github.com/francejs/effroi) device event simulation library that results in promises for all device operations. Additionally, it provides support for jquery so that effroi operations can be invoked on elements using complex selectors. This is expected to be used with a javascript loader like webpack, and since effroi hasn't published a distribution, likely with [karma-effroi](https://github.com/francejs/karma-effroi).

# Usage
```javascript
var effroiAsPromised = require('effroi-as-promised')(effroi);
effroiAsPromised.click($('.something'))
	.then(function(){ return effroiAsPromised.click('.else')});
	.then(function(){ return effroiAsPromised.click('.again')});
```
