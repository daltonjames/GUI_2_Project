"use strict";

var scope = {};
var App = angular.module("viewTopic", []);
App.controller("AppCtrl", function( $scope, $http) {
	//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	scope = $scope;
	
	$scope.topicData = {};
	$scope.commentsData = {};
	$scope.error = "";
	$http.get( "topic_content.php" ).
		success( function( data ) {
			console.log(data);
			$scope.topicData = data[0][0];
			$scope.commentsData = data[1];
			console.log($scope.commentsData);
		}).error( function( error ) {
			console.log("get ERROR");
			$scope.error = error;
		});
	//end of $http.get
	
	//TODO REPLACE jQUERY CODE WITH ANGULAR CODE
	/*
	$scope.addComment = function() {
		var commentStr = $scope.newCommentStr;
		var commentObj = {
			comment : commentStr,
			id : '00000001',
			user: 'K2XDubz'
		}
		$http({
			method: 'post',
			url: 'add_comment.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: commentObj
		}).
		//$http.post("add_comment.php", {'comment': 'hi', 'id': '00000001', 'user': 'K2XDubz'}).
			success( function(data) {
				console.log(data);
			}).
			error( function(data) {
				console.log("Error with $http.post(comment)");
			});
		//end of $http.post
	}
	*/

});

$(document).ready( function() {
	
	$("#add-comment").submit( function() {
		var commentStr = $(this).find("textarea").val()
		commentStr = $.trim(commentStr);
		var commentObj = { commentString : commentStr, postIndex : null, poster : 'K2XDubz' };
		console.log(commentObj);
		
		$.ajax({
			type: 'POST',
			url: 'add_comment.php',
			data: { comment : commentStr, id : '00000001', user : 'K2XDubz' },
			success: function(data) {
				console.log("Success!");
				console.log(data);
			}
		});
		scope.commentsData.push(commentObj);
		scope.$apply();
	});
});