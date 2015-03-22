"use strict";

var App = angular.module("topicList", []);
App.controller("AppCtrl", function($scope,$http) {
	$scope.topicData = {};
	$scope.error = "";

	//GET retrieves data from php to display for each topic
	$http.get( "topic_list.php" ).
		success( function(data) {
			console.log(data);
			//updates controller data to trigger view update
			$scope.topicData = data;
		}).error( function(error) {
			//included for debugging but not shown on page
			console.log("GET ERROR");
			$scope.error = error;
		});

	//TODO: Add on click event to handle navigation to
	$scope.navigate = function($event) {
		var url = "../view_topic?id=";
	    var idCode = $event.currentTarget.getAttribute('data-idcode');
		url = url + idCode;
		window.location = url;
	}
});