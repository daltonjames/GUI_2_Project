var App = angular.module("acctData", []);
App.controller("AppCtrl", function($scope,$http) {
	$scope.accountData = {};
	var userData = {};
	
	$http.get("account.php").
		success( function(data) {
			
			console.log(data);
			userData = data[0];

			//set to 0 from sign up, display update if not changed
			if( userData.phonenumber === "0" )
			{
				userData.phonenumber = "update";
			}
			
			//set to 0 from sign up, display update if not changed
			if( userData.college === "0" )
			{
				userData.college = "update";
			}

			//set to 0 from sign up, display update if not changed
			if( userData.state === "0" )
			{
				userData.state = "update";
			}

			$scope.accountData = userData;
			
		})
		
		.error( function(error) {
			//included for debugging but not shown on page
			console.log("GET ERROR");
			$scope.error = error;
		});	
});