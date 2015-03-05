"use strict";

var App = angular.module("topicList", []);
App.controller("AppCtrl", function($scope,$http) {
	$scope.topicData = {};
	$scope.error = "";

	$http.get( "topic_list.php" ).
		success( function(data) {
			console.log(data);
			$scope.topicData = data;
		}).error( function(error) {
			console.log("GET ERROR");
			$scope.error = error;
		});

	//TODO: Add on click event to handle navigation to 
});