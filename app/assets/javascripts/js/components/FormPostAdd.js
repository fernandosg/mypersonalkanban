var form=document.getElementById("formPost");
var PostIt=require("./PostIt.js");
var PostsList=[];
var PostItBackUp;
var create_or_update=0;
var Edit=function(ob,element){
	form.querySelector("#title-post").value=ob.title;
	form.querySelector("#description-post").value=ob.description;
	form.querySelector(".button").innerHTML="Editar nota";
	form.querySelector("#addPostToColumn").dataset.identify=ob.column;	
	PostItBackUp=element;
	create_or_update=1;
	$("#modal-1").modal("show");
}
module.exports={
	show:function(id){
		form.querySelector("#addPostToColumn").dataset.identify=id;	
		form.querySelector("#addPostToColumn").innerHTML="Añadir nota";
		form.querySelector("#title-post").value="";
		form.querySelector("#description-post").value="";
		create_or_update=0;			
	},
	add:function(id){
		if(create_or_update==0)
			PostIt.show({
				title:form.querySelector("#title-post").value,
				description:form.querySelector("#description-post").value,
				formpost:Edit,
				column:id				
			},document.getElementById("column"+id).querySelector(".container"));			
		else{
			PostIt.update({
				title:form.querySelector("#title-post").value,
				description:form.querySelector("#description-post").value,
				postsource:PostItBackUp,
				column:id
			});
			create_or_update=0;
		}
	},
	addRestore:function(ob,element){
		PostIt.show({
				title:ob.title,
				description:ob.description,
				formpost:Edit,
				column:ob.column,
				restored:true,
				dataset:ob.column,
				id:ob.id			
			},element);
	}
	
}