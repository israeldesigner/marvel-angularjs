(function () {
  angular.module('MarvelApp')
    .factory('HttpService', HttpService);

  HttpService.$inject = ['$http','appSettings', 'hashConfig'];

  function HttpService($http, appSettings, hashConfig) {

    var publicKey="5a237863b3cc2061003cbbc4fe20dc06";
    var privateKey = "fbf255068eccea6d0ef951b9f25626b57ab2fe72";
    var timestamp = new Date().getTime();
    var concatHash = timestamp + privateKey + publicKey;
    var hashFinal = hashConfig.createHash(concatHash);
    var auth = `ts=${timestamp}&apikey=${publicKey}&hash=${hashFinal}`; 

    var urlAllChar= `${appSettings.baseUrl()}/characters?`;
    var _getHeroes = function (numLimit, numOff) {
      return $http.get(`${urlAllChar}${auth}&limit=${numLimit}&offset=${numOff}`, {
      });
    }

    var _getHero = function (id) {
      return $http.get(`${appSettings.baseUrl()}/characters/${id}?${auth}`,{

      })
    }


    return {

      getHeroes: _getHeroes,
      getHero: _getHero

    }
  }

})();
