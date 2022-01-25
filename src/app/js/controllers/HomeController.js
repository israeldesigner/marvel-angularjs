angular.module('MarvelApp').controller('HomeController',
  function ( HttpService, $state, $location, $scope,  $http) {

    $scope.charHeroes = [];
    $scope.limit = 12;
    $scope.offset = 0;

    $scope.loadMore = function() {
      $scope.offset += $scope.limit;
      $scope.findDetails();
    };
  
    $scope.findDetails = function() {
      HttpService.getHeroes($scope.limit, $scope.offset).then(function successCallback(response) {
        $scope.charHeroes = response.data.data.results;
        console.log(response);
        console.log($scope.charHeroes);
      }, function errorCallback(response) {
        console.log(response);
      });
    }


  
    $scope.init = function () {
      
    }
    
  });
