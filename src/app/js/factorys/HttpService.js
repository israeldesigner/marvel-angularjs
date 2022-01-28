(function () {
  angular.module('MarvelApp')
    .factory('HttpService', HttpService);

  HttpService.$inject = ['$http','appSettings', 'hashConfig'];

  function HttpService($http, appSettings, hashConfig) {

    var publicKey="5a237863b3cc2061003cbbc4fe20dc06";
    var privateKey = "fbf255068eccea6d0ef951b9f25626b57ab2fe72";
    var timestamp = new Date().getTime();
    var concatHash = timestamp + privateKey + publicKey;
    //criação do hash
    var hashFinal = hashConfig.createHash(concatHash);
    //criação dos parametros finais api de consulta
    var auth = `ts=${timestamp}&apikey=${publicKey}&hash=${hashFinal}`;

    var urlAllChar= `${appSettings.baseUrl()}/characters?`;

    //factory pegar todos os heróis com parametros
    // var _getHeroes = function (numLimit, numOff) {
    //   return $http.get(`${urlAllChar}${auth}&limit=${numLimit}&offset=${numOff}`, {
    //   });
    // }

    //factory pegar todos os heróis com parametros
    var _getHeroes = function (numLimit, numOff) {
      return $http({
        method: 'GET',
        url: `${urlAllChar}${auth}&limit=${numLimit}&offset=${numOff}`,
        dataType: 'jsonp',
      })    
    }

    //factory pegar todos os heróis pelo nome
    var _getHeroesSearch = function (nameStart) {
      return $http.get(`${urlAllChar}${auth}&limit=25&nameStartsWith=${nameStart}`, {
      });
    }

    //factory pegar herois por parametro ID
    var _getHero = function (id) {
      return $http({
        method: 'GET',
        url: `${appSettings.baseUrl()}/characters/${id}?${auth}`,
        dataType: 'jsonp',
      })    
    }

    //factory pegar revista por parametro ID do herói
    var _getHeroComic = function (id) {
      return $http({
        method: 'GET',
        url: `${appSettings.baseUrl()}/characters/${id}/comics?${auth}`,
        dataType: 'jsonp',
      }) 
    }

   //factory pegar story por parametro ID do herói
    var _getHeroStories = function (id) {
      return $http({
        method: 'GET',
        url: `${appSettings.baseUrl()}/characters/${id}/stories?${auth}`,
        dataType: 'jsonp',
      }) 
    }


    //factory pegar serie por parametro ID do herói
    var _getHeroSeries = function (id) {
      return $http({
        method: 'GET',
        url: `${appSettings.baseUrl()}/characters/${id}/series?${auth}`,
        dataType: 'jsonp',
      }) 
    }

    //factory pegar criadores por parametro id da revista
    var _getComicsHeroCreators = function (id) {
      return $http.get(`${appSettings.baseUrl()}/comics/${id}/creators?${auth}`,{
      })
    }


    return {

      getHeroes: _getHeroes,
      getHero: _getHero,
      getHeroComic: _getHeroComic,
      getHeroStories: _getHeroStories,
      getHeroSeries: _getHeroSeries,
      getComicsHeroCreator: _getComicsHeroCreators,
      getHeroesSearch: _getHeroesSearch 

    }
  }

})();
