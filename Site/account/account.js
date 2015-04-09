var App = angular.module("acctData", []);
App.controller("AppCtrl", function($scope,$http) {
	$scope.accountData = {};
	var userData = {};
	
	//$scope.pushData();
	
	$scope.pushData = function(){
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
		
	}
	$scope.pushData();	
		
		//updates the phonenumber display
		$scope.phoneNumber = function(){
			$("#phoneNumber").remove();	
			
			$("#phoneSelect").append('<form ng-submit="phoneSubmit()" id="phoneSelectForm">');
			$("#phoneSelectForm").append('(<input style="width: 3em" type="text" name="phone-1" maxlength="3" placeholder="555">)<input style="width: 3em" type="text" name="phone-2" maxlength="3" placeholder="555">-<input style="width: 4em" type="text" name="phone-3" maxlength="4" placeholder="5555">');
			
			$("#phoneSelect").append('<input type="submit" value="Submit"></form>');

		}
		
		$scope.phoneSubmit = function() {
			$http.get("account.php").
				success( function(data) {
			
			})
		}
		
		//updates the college display
		$scope.college = function(){
			$("#college").remove();	

			$("#collegeSelect").append('<form ng-submit="collegeSubmit()" id="collegeSelectForm">');
			$("#collegeSelectForm").append('<input type="text" name="college" required>');
			$("#collegeSelect").append('<input type="submit" value="Submit"></form>');

		}
		
		$scope.collegeSubmit = function() {
			//php stuff
		}
		
		//updates the state display
		//uses state picker from http://www.freeformatter.com/usa-state-list-html-select.html
		//super long but works better on one line
		$scope.state = function(){
			$("#state").remove();
			
			
			$("#stateSelect").append('<form ng-submit="stateSubmit()" id="stateSelectForm">');
			$("#stateSelectForm").append('<select><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>');		
			$("#stateSelect").append('<input type="submit" value="Submit"></form>');

		}
		
		$scope.stateSubmit = function() {
			//php stuff
		}
		
		
		
		
});