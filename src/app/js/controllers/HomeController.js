angular.module('MarvelApp').controller('HomeController',
  function ( HttpService, $state, $location, $scope,  $http) {

    $scope.charHeroes = [];

    HttpService.getHeroes().then(function successCallback(response) {
			$scope.charHeroes = response.data.data.results;
			console.log($scope.charHeroes);
    }, function errorCallback(response) {
      console.log(response);
    });

  
    $scope.init = function () {
      
    }
    
  });
