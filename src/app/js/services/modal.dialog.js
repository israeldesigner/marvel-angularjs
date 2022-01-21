// angular.module('MarvelApp').service('dialogService', function($http, $uibModal, config) {
//     var _createModal = function(message, hasCancelButton, title) {
//         var modal = $uibModal.open({
//             ariaLabelledBy: 'modal-title',
//             ariaDescribedBy: 'modal-body',
//             templateUrl: 'core/service/dialog/partials/dialog-modal.html',
//             controllerAs: 'vm',
//             size: 'lg',
//             controller: function($uibModalInstance) {
//                 var _vm = this;

//                 _vm.title = "";
//                 if (title) {
//                     _vm.title = title;    
//                 }

//                 _vm.message = message;
//                 _vm.hasCancelButton = hasCancelButton || false;

//                 _vm.ok = function () {
//                     $uibModalInstance.close(true);
//                 };

//                 _vm.cancel = function() {
//                     $uibModalInstance.dismiss('cancel');
//                 };
//             }
//         });

//         return modal.result;
//     };
// });