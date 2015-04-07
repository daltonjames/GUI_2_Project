"use strict";

var App = angular.module("topicList", []);
App.controller("AppCtrl", function($scope,$http) {
	$scope.topicData = [];
	$scope.error = "";
	$scope.tagArr = [];
	//infinite scroll variables
	$scope.loadDone = true;
	$scope.totalTopics = 0;
	$scope.topicRange = 15; //15 topics will be loaded at once

	//loadDone event is triggered when the last see-more directive function has run
	//This also prevents spammed loadTopics calls when we are at the bottom of the page
	angular.element(document).bind( 'loadDone', function() {
		console.log('Load has finished!');
		$scope.loadDone = true;
	});
	
	//GET retrieves data from php to display for each topic
	$scope.loadTopics = function() {
		console.log("loadDone = " + $scope.loadDone);
		if ( $scope.loadDone ) {
			$scope.loadDone = false;
			$http.get( "topic_list.php" ).
				success( function(data) {
					console.log("data");
					console.log(data);
					//updates controller data to trigger view update
					$scope.topicData = $scope.topicData.concat(data[0]);
					$scope.tagArr = data[1];
					console.log("tagArr: ");
					console.log($scope.tagArr);
					//TEMP - for development
					for ( var i=0; i<($scope.topicData.length); i++ ) {
						/*if ( $scope.tagArr[i].length === 0 ) {
							$scope.tagArr[i].push( { tag : "testing1" } );
							$scope.tagArr[i].push( { tag : "testing2" } );
							$scope.tagArr[i].push( { tag : "testing3" } );
						}*/
						$scope.topicData[i].views = 24123;
						$scope.topicData[i].comments = 45;
						$scope.topicData[i].likes = 121;
						$scope.topicData[i].dislikes = 5;
					}
				}).error( function(error) {
					//included for debugging but not shown on page
					console.log("GET ERROR");
					$scope.error = error;
				});
			//end of $http.get()
		}
	}
	$scope.loadTopics(); //load initial posts
	
	//On click event to handle navigation to each individual topic's view topics page
	$scope.navigate = function($event) {
		var ele = angular.element($event.target);
		
		//if click is on See More anchor tag
		if ( ele.hasClass('see-more') ) {
			var descDiv = angular.element($event.currentTarget).children('div.topic-desc'); //targets topic-desc div (uses jQuery functionality)
			console.log(descDiv);
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
	
	//Voting functions
	$scope.upvote = function() {
		//Fill this in Kyle
		console.log("Upvote!");
	}
	$scope.downvote = function() {
		//Fill this in Kyle
		console.log("Downvote!");
	}

}); //End of App.controller()

//Check if each ng-repeat element overflow's (greater than max-height) and adds 'See More' functionality
App.directive('seeMoreDirective', function( $timeout ) {
	return function(scope, element) {
		var ele = angular.element(element); //wrapped jQuery object (done by angular)
		
		//$timeout waits until the browser has finished rendering the DOM (aka the ng-repeat elements)
		$timeout( function() {
			//checks for overflow within the #topic-desc div
			//+10 to fix bug with Chrome
			//Chrome's scrollHeight was always 10 greater even when overflow did not occur
			if ( ele.prop('offsetHeight') + 10 < ele.prop('scrollHeight') ) {
				//overflow detected
				console.log('overflow detected');
				ele.addClass('see-more'); //adds overflow: hidden to css
				var seeMore = angular.element("<p class='see-more'><a class='see-more'>See More</a></p>"); //adds See More/See Less button
				element.after(seeMore); //inserts into the DOM right after #topic-desc div (and before the Tag List)
			}
			//checks for last element
			if ( scope.$last ) {
				//triggers loadDone event so the $scope object can be updated
				angular.element(document).trigger('loadDone');
			}
		});
	};
});
//Infinite Scroll
App.directive('infiniteScrollDirective', function( $timeout ) {
	return function(scope, element, attr){
		$timeout( function() {
			var doc = angular.element(document);
			var win = angular.element(window);
			
			doc.bind('scroll', function() {
				if ( window.pageYOffset + window.innerHeight >= win.height() - 15 ) {
					//The code below will be spammed as the user scrolls below the scroll threshold
					//$scope.loadDone boolean and loadDone custom event are used to prevent spam calls to $scope.loadTopics()
					console.log("Loading Additional Posts!");
					scope.$apply(attr.infiniteScrollDirective);
				}
			});
		});
	};
});

