"use strict";

var scope = {};
var App = angular.module("viewTopic", []);
App.controller("AppCtrl", function( $scope, $http) {
	//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	scope = $scope;
	
	$scope.topicData = {};
	$scope.commentsData = [];
	$scope.error = "";
	$scope.tagArr = [];
	
	var idCode = window.location.search.substring(1);
	idCode = idCode.split("=")[1];
	if ( !(idCode.match(/^\d{8}$/)) ) {
		window.location = "../404";
		return;
	}
	
	var isNumber = function(arg) {
		return !isNaN(parseFloat(arg));
	}
	
	$http.get( "topic_content.php?id=" + idCode ).
		success( function( data ) {
		
			if ( data[0].length < 1 /*|| data.search("Error loading") !== -1*/ || jQuery.type(data) === "string" ) {
				window.location = "../404";
			}
			console.log(data);
			$scope.topicData = data[0][0];
			$scope.commentsData = data[1];
			console.log($scope.commentsData);
			$scope.tagArr = data[3];
		}).error( function( error ) {
			window.location = "../404";
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
	window.usernameStr = "";
	
	$("#add-comment").submit( function() {
		var $textarea = $(this).find("textarea")
		var commentStr = $textarea.val();
		commentStr = $.trim(commentStr);
		var commentObj = { commentString : commentStr, postIndex : '999999', poster : usernameStr };
		console.log(commentObj);
		
		var postId = window.location.search.substring(1);
		postId = postId.split("=")[1];
		
		$.ajax({
			type: 'POST',
			url: 'add_comment.php',
			data: { comment : commentStr, id : postId, user : usernameStr },
			success: function(data) {
				console.log("Success!");
				console.log(data);
				//if comment was successfully added
				if (data.search("PHP Success!") !== -1) {
					console.log("comment has been added!");
					scope.commentsData.push(commentObj);
					scope.$apply();
					$textarea.val(""); //clear now posted content inside textarea
				}
			}
		});
	});
});