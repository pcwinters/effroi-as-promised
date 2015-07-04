var $ = require('jquery');
var _ = require('lodash');

var factory = function(effroi){
	// Wrap effroi methods to allow for passing jquery element results and returning promises
	var effroiAsPromised = {};
	_.each(_.keys(effroi), function(deviceKey){
		var device = effroi[deviceKey];
		var deviceAsPromised = effroiAsPromised[deviceKey] = {};
		_.each(_.keys(device), function(methodKey){
			var method = device[methodKey];
			deviceAsPromised[methodKey] = _.wrap(method, function(originalFn){
				var args = _.rest(arguments);
				if('jquery' in Object(_.first(args))){
					var el = _.first(args).get(0);
					args = [el].concat(_.rest(args));
				}
				var context = device; // let internally chained calls use the original device as context
				return new Promise(function(resolve, reject){
					try{
						resolve(originalFn.apply(context, args));
					} catch(e){
						reject(e);
					}
				});
			});
		});
	});
	return effroiAsPromised;
};

module.exports = factory;
