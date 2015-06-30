var form=document.getElementById("formPost");
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute("data-identify"));      
}

function PostIt(ob){
	this.id=ob.id;
	this.title=ob.title;
	this.description=ob.description;
	this.postsource=ob.postsource;
	this.column=ob.column;
}

function findElement(array,object){
	for(i=0;i<array.length;i++){
		if((array[i].id+""+array[i].column)==(object.id+""+object.column)){
			array[i].title=object.title;
			array[i].description=object.description;
			return array[i];
		}
	}
	return false;
}

PostIt.prototype.toString=function doStrings(){
	var test=this.id+" y "+this.title+" y "+this.description+" y column "+this.column;
	return test;
}
module.exports={
	  show:function(ob,ElementParent){
	  		id=(ob.restored==undefined) ? document.getElementsByClassName("post").length+1 : ob.id;
	  		$.ajax({
		        type: 'GET',
		        url: '../js/components/views/post.html',
		        async:false,
		        dataType: 'text',
		        success: function (data) {
		            var render=Mustache.render(data,
		            	{id:id,dataset:id,title:ob.title,description:ob.description,column:ob.column}
		            );
		            $(ElementParent).append(render);
		            ElementParent.getElementsByClassName("post"+id)[0].dataset.dataft=new String('{"id":'+id+',"dataset":'+id+',"title":"'+ob.title+'","description":"'+ob.description+'","column":'+ob.column+'}');
	  				ElementParent.getElementsByClassName("post"+id)[0].addEventListener("dragstart",drag,false);
		            ElementParent.getElementsByClassName("post"+id)[0].getElementsByClassName("close")[0].addEventListener("click",function(){
		            	parent=this.parentNode;
			  			while(parent.className!="col-12 container"){
			  				parent=parent.parentNode;
			  			}
	  					parent.removeChild(this.parentNode);
		            });
		            ElementParent.getElementsByClassName("post"+id)[0].getElementsByClassName("edit")[0].addEventListener("click",function(){		            	
			  			parent=this.parentNode;
			  			while(parent.className!="col-12 container"){
			  				parent=parent.parentNode;
			  			}
			  			obj=JSON.parse(this.parentNode.parentNode.dataset.dataft);
			  			ob.formpost(obj,this.parentNode.parentNode);
		            });

		        }
		    });
		},
		update:function(ob){
			ob.postsource.getElementsByClassName("title")[0].innerHTML=ob.title;
			ob.postsource.getElementsByClassName("description")[0].innerHTML=ob.description;
			json=JSON.parse(ob.postsource.dataset.dataft);
			ob.postsource.dataset.dataft=new String('{"id":'+json.id+',"dataset":'+json.id+',"title":"'+ob.title+'","description":"'+ob.description+'","column":'+json.column+'}');//new String('{}')						
			$("#modal-1").modal("hide");
		},
		changePostData:function(column,postit){
			preview_info=JSON.parse(postit.dataset.dataft);
			postit.dataset.dataft=new String('{"id":'+preview_info.id+',"dataset":'+preview_info.id+',"title":"'+preview_info.title+'","description":"'+preview_info.description+'","column":'+((""+column.id).split("column")[1])+'}');
		}
	}