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

	//On click event to handle navigation to each individual topic's view topics page
	$scope.navigate = function($event) {
		var ele = angular.element($event.target);
		
		//if click is on See More anchor tag
		if ( ele.hasClass('see-more') ) {
			var descDiv = angular.element($event.currentTarget).children('div.topic-desc'); //targets topic-desc div (uses jQuery functionality)
			//toggle the height of the description
			if ( descDiv.height() > 140 ) { //if the current state is NOT minimized
				descDiv.height(140); //sets height to 140 aka minimized
				ele.text('See More'); //changes anchor tag text
			}
			else { //if the current state IS minimized
				descDiv.css('max-height', 'none'); //eliminates the max height set by css
				descDiv.height(descDiv.prop('scrollHeight')); //sets height to scrollHeight aka elements actual height
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
App.directive('seeMoreDirective', function( $timeout ) {
	return function(scope, element) {
		var ele = angular.element(element); //wrapped jQuery object (done by angular)
		
		//$timeout waits until the browser has finished rendering the DOM (aka the ng-repeat elements)
		$timeout( function() {
			//checks for overflow within the #topic-desc div
			if ( ele.prop('offsetHeight') < ele.prop('scrollHeight') ) {
				//overflow detected
				console.log('overflow detected');
				ele.addClass('see-more'); //adds overflow: hidden to css
				var seeMore = angular.element("<p class='see-more'><a class='see-more'>See More</a></p>"); //adds See More/See Less button
				element.after(seeMore); //inserts into the DOM right after #topic-desc div (and before the Tag List)
			}
		});
	};
});