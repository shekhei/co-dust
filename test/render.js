var codust = require('../lib/index.js');
var dust = new codust({base:require('path').resolve(process.cwd()+'/./test/views')});
var expect = require('chai').expect;
var co = require('co');

describe('loading simple template(Promises)', function(){
	it("should be able to load template", function(done){
		var template = dust.render('simple.dust').then(function(val){
			console.log(val);
			done();
		}).catch(done);
	});
	it("should be able to include partials", function(done){
		var template = dust.render('test.dust').then(function(val){
			console.log(val);
			done();
		}).catch(done);
	});

});

describe('loading simple template(yield)', function(){
	it("should be able to load template", function(done){
		co(function*(){
			return yield dust.render('simple.dust')
		}).then(function(){
			done();
		}).catch(done);
	});
	it("should be able to include partials", function(done){
		co(function*(){
			return yield dust.render('test.dust')
		}).then(function(){
			done();
		}).catch(done);
	});

});
