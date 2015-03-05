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

$(document).ready(function(){
	
	$(".phpStuff").click(function(){
		$ajax({
			type: "GET",
			url: "logout.php",
			success: function(data){
		
				console.log("fuck");
			}	
			
				
		});
		var url = window.location.href;
				url = url.replace("home", "");
				window.location = url;
	});
});