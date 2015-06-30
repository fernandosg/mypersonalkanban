var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var parser=new DOMParser();
var Components = _.extend({}, EventEmitter.prototype, {

	Events:{
	  allowDrop:function(ev) {
		   ev.preventDefault();
		},

		drag:function(ev) {
			console.log(ev.target);
			console.log("testeo");
		    ev.dataTransfer.setData("text", ev.target.getAttribute("data-identify"));      
		},

		drop:function(ev) {
		    ev.preventDefault();
		    var data = ev.dataTransfer.getData("text");
		    console.log(data);
		    ev.target.appendChild(document.getElementById("post"+data));
		},
	}

});


module.exports=Components;