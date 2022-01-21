(function  () {
    angular.module('MarvelApp')
    .factory('hashConfig', hashConfig);
  
    function hashConfig(){
        function _createHash(value) {
            return CryptoJS.MD5(value).toString();
        }
      return {
        createHash:_createHash
      };
    }
  })();
  