

$(document).ready(function(){




$('.compileButton').on('click',function(){
var editor = ace.edit("editor");
if($('.languageSelector').val()==""){
	alert("Please select a language");
}
else if(editor.getValue()=="")
{
	alert("cannot compile empty source");
}
else{
$("#runResponse").html("");
$("#runResponse").html("Compiling... Please Wait");
var testCases=[];
testCases[0]=$('.customInput').val();


if(testCases.length==-1){
	testCases.push(" ");
}

	 var config=
	{
	source:editor.getValue(), 
	input:JSON.stringify(testCases),  
	language:$('.languageSelector').val()};	 




	 $.ajax({
			type:'POST',
			url:'/compile',
			data:config,
			dataType:'json',
		}).done(function(data){
		data=JSON.parse(data);
		var str = (data.result.compilemessage).toString();
		str=decodeURIComponent(escape(str));



		$("#runResponse").html("");
		if(str==""){
			$("#runResponse").html("Compile Message: Compilation Successful <br><br>");
			$("#runResponse").append("Output: <br>");
			
			(data.result.stdout).forEach(function(item,index){
			$("#runResponse").append(data.result.stdout[index]+"<br>");
			
		});
		}
		else{
			$("#runResponse").html("Compile Message: "+ str+"<br><br>");
		}
		
		
	
		
		
		});
}
});



});

function changeLanguage(){
 var language=document.getElementById('languageSelector').value;
 var langCode;
 switch(language){
	 case "1":
	 	langCode="c_cpp";
		break;
	 case "2":
	 	langCode="c_cpp";
		break;
	 case "9":
	 	langCode="csharp";
		break;
	 case "3":
	 	langCode="java";
		break;
	 case "20":
	 	langCode="javascript";
		break;
	case "5":
	 	langCode="python";
		break;
 }
	var lang={
		langCode:langCode
	};
	
	window.location.href = '/changelang/'+langCode+'/'+language;
	
}
