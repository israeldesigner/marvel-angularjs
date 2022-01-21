(function  () {
	angular.module('MarvelApp')
	.filter('elipsiFilter', elipsiFilter);
  
	function elipsiFilter(){
		return function(input, size){
			if(input.length <= size) return input;
			var output = input.substring(0, size) + "..."
			return output;
		}
	}
  
  })();
  