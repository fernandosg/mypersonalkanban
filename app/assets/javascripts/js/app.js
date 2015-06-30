var Components,Backup;
function allowDrop(ev) {
   ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute("data-identify"));      
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(ev.target.tagName=="SECTION" && ev.target.className.contains("container")){
    	ev.target.appendChild(document.getElementsByClassName("post"+data)[0]);
 		Components.PostIt.changePostData(ev.target.parentNode,document.getElementsByClassName("post"+data)[0])   	
    }
    if(ev.target.tagName=="ARTICLE"){
    	ev.target.parentNode.appendChild(document.getElementsByClassName("post"+data)[0]);    	
 		Components.PostIt.changePostData(ev.target.parentNode.parentNode,document.getElementsByClassName("post"+data)[0]);   	
    }
}





function init(){
	Components=require("./components/Components.js");
	Backup=require("./utils/Backup.js");
	addPostButton=document.getElementsByClassName("addPost");
	for(i=0;i<addPostButton.length;i++){
		addPostButton[i].addEventListener("click",function(){
			Components.FormPostAdd.show(this.getAttribute("data-identify"));	
		});
	}

	addPostButtonToColumn=document.getElementById("addPostToColumn");
	addPostButtonToColumn.addEventListener("click",function(){
		Components.FormPostAdd.add(this.getAttribute("data-identify"));
	});

	document.getElementById("savepost").addEventListener("click",function(){		
		Backup.saveBackup();
		Backup.sendToDatabase();
		Backup.deleteBackup();
	});

	elements=document.getElementsByClassName("container");
	for(i=0;i<elements.length;i++){
		elements[i].addEventListener("drop",drop,false);	
		elements[i].addEventListener("dragover",allowDrop,false);
	};
	elements=document.getElementsByClassName("post");
	for(i=0;i<elements.length;i++){
		elements[i].addEventListener("dragstart",drag,false);	
		elements[i].setAttribute("id","post1");
	};

	window.onbeforeunload = function (event) {
	    var message = 'Important: Please click on \'Save\' button to leave this page.';	    
	    //if(localStorage.getItem("clean").length==0)
		   	if (event) {
		    	Backup.saveBackup();
		        event.returnValue = message;
		    } 			    
	    return message;
	   
	};
}
function login(){
			$("#modal-2").modal("show");
		}
		document.getElementById("send").addEventListener("click",function(){
		   	
		    $.ajax({
		        type: 'POST',
		        url: 'http://localhost:3000/inicio/login',
		        data:{
		        	username:document.getElementById("formPost").querySelector("#name").value,
		        	password:document.getElementById("formPost").querySelector("#password").value
		        },
		        dataType: 'text',
		        success: function (data_form) {
		            //$(divId).append(Mustache.render(data, htmlRenderValues));
		            localStorage.setItem("username",document.getElementById("formPost").querySelector("#name").value);
					if(data_form=="ok"){						
					    $("#modal-2").modal("hide");
		    			$("#modal-2").remove();	
						$.ajax({
					        type: 'GET',
					        url: '../js/components/views/main.html',
					        dataType: 'text',
					        success: function (data) {
					            //$(divId).append(Mustache.render(data, htmlRenderValues));
					            var render=Mustache.render(data,{});
					            $("main.row").html(render);
					            init();			
								Backup.restoreBackup(Components.FormPostAdd);
					        },
					        error:function(data){
					        	console.log("Error en el servidor");
					        }
					    });
					}else{
						console.log("CUENTA INVALIDA");
						document.getElementById("error-msg").innerHTML="La cuenta es incorrecta";
					}
				 }
		    });
		});

login();
console.log("error");
