var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var parser=new DOMParser();
var PostIt=require("./PostIt.js");
var FormPostAdd=require("./FormPostAdd.js");

var Components = _.extend({}, EventEmitter.prototype, {
	PostIt:PostIt,
	FormPostAdd:FormPostAdd

});


module.exports=Components;