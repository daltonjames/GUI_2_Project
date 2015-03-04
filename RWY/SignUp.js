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

$(document).ready(function() {

	$("#SignUp_form").submit(function(){

		console.log( "FirstName = " + $("#FirstName").val() );
		console.log( "LastName = " + $("#LastName").val() );
		console.log( "Username = " + $("#Username").val() );
		console.log( "Email = " + $("#Email").val() );
		console.log( "Password = " + $("#Password").val() );
		console.log( "c_Password = " + $("#c_Password").val() );


		if($("#Password").val() !== $("#c_Password").val() )
			console.log("Passwords do not match");
		else
			console.log("The PW matches");
		

		var $this = $(this);
		formData = $this.serialize();

		console.log("");
		console.log(formData);

		$.ajax({
			type: 'POST',
			url: 'SignUp.php',
			data: formData,
			success: function(data){
				console.log("data = " + data);
			},
		});
		
//		$.post( "SignUp.php", formData, function(data){
//
//			console.log(data);
//		
//		});



	});


});
