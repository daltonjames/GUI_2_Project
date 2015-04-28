/*
Dalton James, Dalton_James@student.uml.edu   
Jares Perreault, Jared_Perreault@student.uml.edu
Kyle_White, Kyle_White@student.uml.edu

UMass Lowell Computer Science
Student in Jesse Heines GUI Programming II
   
File: SignUp.js

Description: submits the sign up form adds the new user to the database with php
*/


//only allow new accounts if set to true
var success = true;

$(document).ready(function() {

	//handler for form submission
	$("#SignUp_form").submit(function(){

		//error checking stuff
		$(".error").empty();
		success = true;

		//check if pw matches
		if($("#Password").val() !== $("#c_Password").val() )
		{
			console.log("Passwords do not match");
			success = false;
			//shows the user the error
			$(".error").append("Passwords do not match");
			return false;
		}
		else
		{
			console.log("The PW matches");
		}
		
		
		//force Password to be at least 5 characters 
		if( $("#Password").val().length < 5)
		{
			success = false;
			//shows the user the error
			$(".error").append("Passwords must be at least 5 characters long");
			return false;
		}
		
		//serialize data to pass to php 
		var $this = $(this);
		formData = $this.serialize();

		//console.log("");
		//console.log(formData);

		if(success == true)
		{
			//POST sends the php the formData to be added to the database if the user does not exist
			$.ajax({
				type: 'POST',
				url: 'SignUp.php',
				data: formData,
				success: function(data){
					console.log("data = " + data);
					var p_data = jQuery.parseJSON(data);
					console.log("p_data = " + p_data);
					//displays error to the user
					if( p_data.status == 'error' ) {
						console.log("message = " + p_data.message);
						$(".error").append("Username already exists");
					}
					else {
						//bring user to home page after successful login
						var url = window.location.href;
						url = url.replace("sign_up", "home");
						window.location = url; 
					}
				},	
			});
		}
	});
});
