//Dalton James, Dalton_James@student.uml.edu   
//Jares Perreault, Jared_Perreault@student.uml.edu
//Kyle_White, Kyle_White@student.uml.edu
//
//UMass Lowell Computer Science
//Student in Jesse Heines GUI Programming II
//    
//File: SignUp.js
//

var data;
var success = true;

$(document).ready(function() {

	$("#SignUp_form").submit(function(){

		$(".error").empty();
		success = true;
	
/*	
		console.log( "FirstName = " + $("#FirstName").val() );
		console.log( "LastName = " + $("#LastName").val() );
		console.log( "Username = " + $("#Username").val() );
		console.log( "Email = " + $("#Email").val() );
		console.log( "Password = " + $("#Password").val() );
		console.log( "c_Password = " + $("#c_Password").val() );
*/

		if($("#Password").val() !== $("#c_Password").val() )
		{
			console.log("Passwords do not match");
			success = false;
			$(".error").append("Passwords do not match");
		}
		else
		{
			console.log("The PW matches");
		}
		

		//serialize data to pass to php 
		var $this = $(this);
		formData = $this.serialize();

		console.log("");
		console.log(formData);

		if(success == true)
		{
			$.ajax({
				type: 'POST',
				url: 'SignUp.php',
				data: formData,
				success: function(data){
					console.log("data = " + data);
					var p_data = jQuery.parseJSON(data);
					console.log("p_data = " + p_data);
					if( p_data.status == 'error' )
					{
						console.log("message = " + p_data.message);
						$(".error").append("Username already exists");
					}
					else
					{
						$.get( "page1.php", formData ).done(function( data ) {
							console.log("data from page1 = " + data );
						});
						
						
						var url = window.location.href;
						url = url.replace("sign_up", "home");
						window.location = url;
					}
				},	
			});
		}
	});
});
