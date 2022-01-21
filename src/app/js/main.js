
angular.module('MarvelApp', ['ui.router', 'ngResource','ngStorage','ngAnimate','ngSanitize'])
.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
  

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
            controller: 'HeaderController'
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
        controller: 'HomeController'
      })
      .state('home.herois', {
        url: "/heroi/:id",
        templateUrl: 'partials/herois.html',
        controller: 'HeroisController'
      })

    // $locationProvider.html5Mode(true);
});
