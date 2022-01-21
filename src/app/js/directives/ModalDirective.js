angular.module('MarvelApp').directive('myModal', function() {
	return {
        templateUrl:"includes/modal.html",
        replace: true,
        restrict: 'AE',
        link: function(scope, element, attrs, ctrl){
        }
	}; 
});