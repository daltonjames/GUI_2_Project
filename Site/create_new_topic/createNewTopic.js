//Dalton James, Dalton_James@student.uml.edu   
//Jares Perreault, Jared_Perreault@student.uml.edu
//Kyle_White, Kyle_White@student.uml.edu
//
//UMass Lowell Computer Science
//Student in Jesse Heines GUI Programming II
//    
//File: createNewTopic.js
//

$(document).ready(function(){
    window.usernameStr = "";
	
    $("#new-topic").submit(function(event){
        event.preventDefault();
		$("p.tagError").css( 'visibility', 'hidden' );
		
        //serialzes the form as a string for submission
		var $this = $(this);
        formData = $this.serialize();
		formData = formData + '&username=' + usernameStr;
		
		//Extract the tags
		var tagArr = $("#tags-list").val().split(", ");
		var regex = /\W/;
		console.log(tagArr);
		tagArr.forEach( function(str, index) {
			console.log(str);
			if ( regex.test(str) ) {
				//tagError();
				//return;
			}
		});
		
        $.ajax({
            type: 'POST',
            url: 'createNewTopic.php',
            data: formData,
            success: function(data){
				console.log("success");
                console.log("data = " + data);
				var resultData = data.replace('"', '').replace('"', ''); //strips off extra "quote" marks (dunno they are there)
				var url = window.location.href;
				url = url.split("create_new")[0];
				url = url + "view_topic?id=" + resultData;
				window.location = url;
            }
        });
    });
	
	function tagError() {
		$("p.tagError").css( 'visibility', 'visible' );
	}
	
	/*
	$("#tags-list").focus( function() {
		$(this).keypress( function(event) {
			console.log(event);
		});
	});
	*/
});
