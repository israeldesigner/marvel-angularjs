angular.module('MarvelApp').controller('HomeController',
  function ( HttpService, $state, $location, $scope,  $http) {

    $scope.charHeroes = [];
    $scope.limit = 9;
    $scope.offset = 0;
    $scope.char={};
    $scope.testandOHero = '';
    $scope.showCharInfo= true;
  
    //function carregar promisse e preencher array
    $scope.loadMore = function(limit, offset) {
      $scope.offset += $scope.limit;
      console.log($scope.offset);
      console.log($scope.limit);
      HttpService.getHeroes($scope.limit, $scope.offset).then(function successCallback(response) {
        $scope.charHeroes = response.data.data.results;
      }, function errorCallback(response) {
        console.log(response);
      });
    };
    
    //function para fazer a pesquisa por heroi typehead uib
    $scope.getCharacters = function(val) {
      HttpService.getHeroesSearch(val).then(function(response){
        console.log(val);
        $scope.charInfoArr=response.data.data.results;
        return response.data.data.results.map(function(item){
          console.log(item.name);
          return item.name;
        });
      });
    }
    
    
    $scope.loadMore($scope.limit, $scope.offset);

    $scope.selectCharacter=function (item){
      angular.forEach($scope.charInfoArr, function(obj, key){
        if(obj.name===item){
          console.log(obj.name)
          console.log(item)
           if (obj.thumbnail){
             $scope.char.thumb= obj.thumbnail.path+"."+obj.thumbnail.extension;
           }else{
             $scope.char.thumb="";
           }
           
           $scope.char.name= obj.name;
           $scope.char.desc= obj.description;
           $scope.showCharInfo= true;
           console.log($scope.showCharInfo)
        }
         
      });
      
    }

    $scope.init = function () {
      
    }
    
});




