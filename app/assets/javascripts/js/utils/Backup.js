
module.exports={
	saveBackup:function(){
		if (typeof window.localStorage != "undefined") {     
    		columns=document.getElementsByClassName("columns");
    		string_for_json='{';
    		for(var i=0;i<columns.length;i++){
    			postit=columns[i].getElementsByClassName("container")[0].getElementsByTagName("article");
    			if(postit.length>0){
    				string_for_json+="\""+columns[i].id+"\":[";
	    			for(var x=0;x<postit.length;x++){
	    				string_for_json+=postit[x].dataset.dataft+",";
	    			}
	    			string_for_json=string_for_json.slice(0,-1);
					string_for_json+="],";
	    		}
    		}
    		string_for_json=(string_for_json.endsWith(",")) ? string_for_json.slice(0,-1) : string_for_json;
    		string_for_json+="}";
    		localStorage.setItem(localStorage.getItem("username"), string_for_json); 
    		console.log("guardando cadena "+localStorage.getItem("username")+" "+localStorage.getItem(localStorage.getItem("username")));
    		console.log(string_for_json);
		}
	},
	restoreBackup:function(FormPostAdd){
		backup=localStorage.getItem(localStorage.getItem("username"));
		if(backup!=undefined && !backup.length==0){
			json_list=JSON.parse(backup);
			columns=document.getElementsByClassName("columns");
			for(var i=0;i<columns.length;i++){
				if(json_list[""+columns[i].id]!=undefined){
					postits=json_list[""+columns[i].id];
					for(var x=0;x<postits.length;x++){
						FormPostAdd.addRestore(postits[x],columns[i].querySelector(".container"));
					}
				}
			}
		}else{
			console.log("no existia un respaldo? "+localStorage.getItem("username")+" "+localStorage.getItem(localStorage.getItem("username")));
			$.ajax({
		        type: 'GET',
		        url: 'http://localhost:3000/inicio/restore',
		        dataType: 'text',
		        data:{username:localStorage.getItem("username")},
		        success: function (data) {
		            //$(divId).append(Mustache.render(data, htmlRenderValues));
		            if(data!="error"){
		            	console.log("a ver "+data);
		            	json_list=JSON.parse(data);
						columns=document.getElementsByClassName("columns");
						for(var i=0;i<columns.length;i++){
							if(json_list[""+columns[i].id]!=undefined){
								postits=json_list[""+columns[i].id];
								for(var x=0;x<postits.length;x++){
									FormPostAdd.addRestore(postits[x],columns[i].querySelector(".container"));
								}
							}
						}
		            }
		            else
		            	console.log("algo fallo");
		        },
		        error:function(data){
		        	console.log("Error en el servidor");
		        }
			});
		}
	},
	deleteBackup:function(){
		localStorage.removeItem(localStorage.getItem("username"));
		localStorage.setItem("clean","ok");
	},
	sendToDatabase:function(){
		backup=localStorage.getItem(localStorage.getItem("username"));
		console.log("veamos "+localStorage.getItem("username")+" "+localStorage.getItem(localStorage.getItem("username")));
		if(backup!=undefined && !backup.length==0){
			console.log("le enviare el backup");
			console.log(backup);
			$.ajax({
		        type: 'POST',
		        url: 'http://localhost:3000/inicio/backup',
		        dataType: 'text',
		        data:{backupjson:backup,username:localStorage.getItem("username")},
		        success: function (data) {
		            //$(divId).append(Mustache.render(data, htmlRenderValues));
		            if(data=="ok")
		            	console.log("Funciono");
		            else
		            	console.log("algo fallo");
		        },
		        error:function(data){
		        	console.log("Error en el servidor");
		        }
			});
		}
	}
}