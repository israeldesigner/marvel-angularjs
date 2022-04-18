angular.module('MarvelApp').controller('HeroisController',
  function ($scope, $stateParams, HttpService) {

    $scope.heroiId = $stateParams.id;
    $scope.heroi = [];
    $scope.heroiComics = [];
    $scope.heroStories = [];
    $scope.heroSeries = [];
    $scope.creatorsComics = [];
    $scope.limit = 5;
    $scope.offset = 0;

    $scope.offset = Math.floor((Math.random() * 1000) + 1);

    //Serviço que busca pelo parâmetro do herói
    HttpService.getHero($stateParams.id).then(function successCallback(response) {
      $scope.heroi = response.data.data.results;
			console.log($scope.heroi);
    }, function errorCallback(response) {
      console.log(response);
    });

    //Serviço que busca revista pelo parâmetro do herói
    HttpService.getHeroComic($stateParams.id).then(function successCallback(response) {
      $scope.heroiComics = response.data.data.results;
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });

    //Serviço que busca stories pelo parâmetro do herói
    HttpService.getHeroStories($stateParams.id).then(function successCallback(response) {
      $scope.heroStories = response.data.data.results;
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });

    //Serviço que busca series pelo parâmetro do herói
    HttpService.getHeroSeries($stateParams.id).then(function successCallback(response) {
      $scope.heroSeries = response.data.data.results;
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });

    //Serviço que busca lista herói com Limit fixo para aside
    HttpService.getHeroes($scope.limit, $scope.offset).then(function successCallback(response) {
      $scope.charHeroes = response.data.data.results;
    }, function errorCallback(response) {
      console.log(response);
    });
      

    $scope.init = function () {}

  });

