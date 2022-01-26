function resolve(index, timeout) {
  return {
    data: function($q, $timeout) {
      var deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(console.log('Data resolve called ' + index));
      }, timeout);
      return deferred.promise;
    }
  };
}

angular.module('MarvelApp', ['ui.router', 'ngResource','ngStorage','ngAnimate','ngSanitize'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider,$locationProvider) {
  
    $httpProvider.useApplyAsync(true);
    $urlRouterProvider.otherwise("/");
    var header = {
        templateUrl: 'includes/header.html'
    }
    var footer = {
        templateUrl: 'includes/footer.html'
    }
  

  $stateProvider
      .state('home', {
        views:{
            'header':{
            templateUrl: 'includes/header.html',
            controller: 'HeaderController',
            },
            'content':{
            template: '<div ui-view></div>'
            },
            'footer':{
            templateUrl: 'includes/footer.html'
            }
        }
      })

      .state('home.um', {
        url: "/",
        templateUrl: 'partials/home.html',
        controller: 'HomeController',
        resolve: resolve(1, 1597)
      })
      .state('home.herois', {
        url: "/heroi/:id",
        templateUrl: 'partials/herois.html',
        controller: 'HeroisController',
        resolve: resolve(2, 2584)
      })

    // $locationProvider.html5Mode(true);
});
