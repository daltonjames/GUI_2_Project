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

	//TODO: Fix all functionality below to work with jQuery (currently will break). Investigation how to link jQuery first and use it with AngularJS.

	//On click event to handle navigation to each individual topic's view topics page
	$scope.navigate = function($event) {
		var ele = angular.element($event.target);
		
		//if click is on See More anchor
		if ( ele.hasClass('see-more') ) {
			var descDiv = angular.element(ele.parent().parent().children()[1]); //jqLite functions are not very complete compared to jQuery
			//toggle the height of the description
			if ( descDiv.prop('clientHeight') > 140 ) { //if the current state is NOT minimized
				descDiv.css('height', 140); //sets height to 140 aka minimized
				ele.text('See More'); //changes anchor tag text
			}
			else { //if the current state IS minimized
				descDiv.css('max-height', 'none'); //eliminates the max height set by css
				descDiv.css('height', descDiv.prop('scrollHeight')); //sets height to scrollHeight aka elements actual height
				ele.text('See Less'); //changes anchor tag text
			}
		}
		
		//if click is anywhere else on the topic snippet
		else {
			var url = "../view_topic?id=";
			var idCode = $event.currentTarget.getAttribute('data-idcode');
			url = url + idCode;
			window.location = url;
		}
	}

});
//Check if each ng-repeat element overflow's (greater than max-height) and adds 'See More' functionality
App.directive('seeMoreDirective', function() {
	return function(scope, element) {
		var ele = angular.element(element);
		ele.ready(function() {
			if ( ele.prop('offsetHeight') < ele.prop('scrollHeight') ) {
				//overflow detected
				console.log('overflow detected');
				ele.addClass('see-more');
				var seeMore = angular.element("<p class='see-more'><a class='see-more'>See More</a></p>");
				element.after(seeMore);
			}
		});
	};
});