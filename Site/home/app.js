"use strict";

var App = angular.module("topicList", []);
App.controller("AppCtrl", function($scope,$http) {
	$scope.topicData = [];
	$scope.error = "";
	//infinite scroll variables
	$scope.loadDone = true; //boolean to help prevent spam calls to loadTopics()
	$scope.isLoadEnd = false; //boolean to determine if we have loaded all available topics
	$scope.topicCount = 0;
	$scope.topicRange = 6; //# of topics will be loaded at once
	$scope.lastId = 0;

	//loadDone event is triggered when the last see-more directive function has run
	//This also prevents spammed loadTopics calls when we are at the bottom of the page
	angular.element(document).bind( 'loadDone', function() {
		console.log('Load has finished!');
		$scope.loadDone = true;
	});
	
	//Multi-filtering system (made to look like hrefs)
	angular.element('span.radio-group span').bind( 'click', function() {
		console.log('radio-group clicked');
		$(this).sibling('input').each( function( i, ele ) {
			ele.click();
		});
		angular.element('span.radio-group span').removeClass('radio-group-selected');
		$(this).addClass('radio-group-selected');
	});
	
	//GET retrieves data from php to display for each topic
	$scope.loadTopics = function() {
		if ( $scope.loadDone & !$scope.isLoadEnd ) {
			$scope.loadDone = false;
			$http.get( "topic_list.php?limit=" + $scope.topicRange + "&lastId=" + $scope.lastId ).
				success( function(data) {
					if ( data[0].length < 1 ) {
						console.log("stop loading, end has been reached");
						$scope.isLoadEnd = true;
						return;
					}
					console.log(data);
					//updates controller data to trigger view update by appending topicData array
					$scope.topicData = $scope.topicData.concat(data[0]);
					//keeps track of the last id used for infinite scroll purposes
					$scope.lastId = parseInt(data[0][data[0].length-1].id);
					$scope.topicCount += data[0].length;
					console.log($scope.topicCount);
				}).error( function(error) {
					//included for debugging but not shown on page
					console.log("GET ERROR");
					$scope.error = error;
				});
			//end of $http.get()
		}
	}
	$scope.loadTopics(); //load initial posts
	
	//angular.element exposes the fn object of jQuery, allowing for custom jQuery functions to be written
	angular.element.fn.grandParent = function() {
		return $(this).parent().parent();
	}
	
	angular.element.fn.sibling = function(arg) {
		return $(this).parent().find(arg);
	}
	
	//reloads the topic list, if the list is currently full (entire database) attempt to load a few more posts (checking for updates)
	$scope.reloadList = function() {
		//stores current window location when reload button is click
		var location = window.pageYOffset;
		
		//temp storage of constraint variables
		var tempRange = $scope.topicRange;
		var tempLoadEnd = $scope.isLoadEnd;
		
		//if the list is full, attempt to load few more posts (checking for updates)
		$scope.topicRange = ($scope.isLoadEnd) ? $scope.topicCount + $scope.topicRange : $scope.topicCount;
		
		//reset or temp values of constraint variables to allow for a successful loadTopics() call
		$scope.isLoadEnd = false;	$scope.loadDone = true;
		$scope.topicCount = 0;		$scope.lastId = 0;
		$scope.topicData = [];
		
		$scope.loadTopics();

		//reset constraint variables to their original values
		$scope.topicRange = tempRange;
		$scope.isLoadEnd = tempLoadEnd;
		
		//scroll user to the Reload List button just had just clicked
		//(Default behavior scrolls to the top of page)
		angular.element('body').animate({
			scrollTop: location
		});
	}
	
	//On click event to handle navigation to each individual topic's view topics page
	$scope.navigate = function($event) {
		var url = "../view_topic?id=";
		var idCode = $event.currentTarget.getAttribute('data-idcode');
		url = url + idCode;
		window.location = url;
	}
	
	$scope.tagClick = function($event) {
		console.log("tag was clicked");
		$event.stopPropagation(); //stops navigate() from firing
	}
	
	$scope.seeMoreClick = function($event) {
		var ele = angular.element($event.target);
		console.log("see more was clicked");
		//grandParent() defined above, custom jQuery function
		var descDiv = angular.element($event.currentTarget).grandParent().children('div.topic-desc'); //targets topic-desc div (uses jQuery functionality)
		//console.log(descDiv);
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
		$event.stopPropagation(); //stops navigate() from firing
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
App.directive('seeMoreDirective', function( $timeout, $compile ) {
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
				var seeMore = $compile(angular.element( //$compile binds angular element to scope, allowing the ng-click to function
					"<p class='see-more'><a class='see-more' ng-click='seeMoreClick($event)'>See More</a></p>"))(scope); //adds See More/See Less button
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
					scope.$apply(attr.infiniteScrollDirective);
				}
			});
		});
	};
});
