(function  () {
  angular.module('MarvelApp')
  .factory('appSettings', appSettings);

  function appSettings(){
    // var baseUrl = "";
    var baseUrl = "https://gateway.marvel.com/v1/public";
   
    function _baseUrl(){
      return baseUrl;
    }
    return {
      baseUrl:_baseUrl,
    };
  }
})();
