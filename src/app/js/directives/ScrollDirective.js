// angular.module('MarvelApp').directive("directiveWhenScrolled", function() {
//     return function(scope, elm, attr) {
//       var raw = elm[0];
  
//       elm.bind('scroll', function() {
//         if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
//           scope.$apply(attr.directiveWhenScrolled);
//         }
//       });
//     };
// });

angular.module('MarvelApp').directive('ngInfiniteScroll', function () {
  return function (scope, element, attrs) {
      
      element.on("scroll", function (event) {
          let raw = element[0] || element;
          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
              scope.$apply(function () {
                  scope.$eval(attrs.ngInfiniteScroll);
              });
              event.preventDefault();
          }
      });

  };
});