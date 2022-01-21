angular.module('MarvelApp').controller('HeroisController',
  function ($scope, $stateParams, HttpService) {

    $scope.heroiId = $stateParams.id;
    $scope.heroi = [];
    console.log($scope.heroiId);

    HttpService.getHero($stateParams.id).then(function successCallback(response) {
      $scope.heroi = response.data.data.results;
			console.log($scope.heroi);
    }, function errorCallback(response) {
      console.log(response);
    });
      

    $scope.init = function () {

      
    }

  });

