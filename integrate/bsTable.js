// JavaScript source code
(function () {
    angular.module('bsTable', [])
   .directive('bsTableControl', function () {
       return {
           restrict: 'EA',
           scope: {
               options: '='
           },
           link: function (scope, element, attr) {
               $(element).bootstrapTable(scope.options);
               setInterval(function () { $(element).bootstrapTable('resetView'); }, 500)
           }
       };
   })
})();
