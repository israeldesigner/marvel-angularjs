(function  () {
  angular.module('MarvelApp')
  .run(Run);

  Run.$inject = ['$rootScope'];

  function Run($rootScope){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    });
  }
})();
