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
		
        //serialzes the form as a string for submission
		var $this = $(this);
        formData = $this.serialize();
		formData = formData + '&username=' + usernameStr;
		
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
});
