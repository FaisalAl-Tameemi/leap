'use strict';

myApp.factory('Data', function(){
	return {newLeap: ''};
});

myApp.controller('NavCtrl', ["$scope", "$rootScope", "Data", function($scope, $rootScope, Data){
	$scope.newLeap = Data.newLeap;

	$scope.addNewLeap = function(){
		$rootScope.$broadcast('addingNew', $scope.newLeap);
		$scope.newLeap = '';
	};
}]);

myApp.controller('MainCtrl', ["$scope", "$location", "angularFire", function ($scope, $location, angularFire) {

	this.onDataLoaded = function onDataLoaded($scope, $location, url) {
		$scope.$watch('allLeaps', function () {
			// var remaining = 0;
			angular.forEach($scope.allLeaps, function (leap) {
				
			});
		}, true);
	};

	$scope.allLeaps = [];

	$scope.$on('addingNew', function (evt, msg) {
		var toAdd = msg.trim();
		if (!toAdd.length) {
			return;
		}
		
		$scope.allLeaps.unshift({person:'Ninja', text: toAdd});
	});

	var url = new Firebase('https://pixelpeople.firebaseio.com/leap');

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;

	angularFire(url, $scope, 'allLeaps', {}).then(function () {
		this.onDataLoaded($scope, $location, url);
	}.bind(this));

}]);

myApp.directive('leapimage', function(Data){
	// Runs during compile
	return {
		scope: {
			imgDir: '@'
		}, 
		template: '<img src="images/person.png" width="175px" />'
		// link: function($scope, iElm, iAttrs, controller) {
		// 	scope.otherFlav = iAttrs.flavor;
		// }
	};
});