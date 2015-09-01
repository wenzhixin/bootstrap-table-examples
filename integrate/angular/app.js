//http://wenzhixin.net.cn/p/bootstrap-table/docs/getting-started.html
angular.module('app', ['bsTable'])
.controller('MainController', function ($scope, $http) {
    $scope.workspaces = [];
    $scope.workspaces.push({ name: 'Workspace 1' });
    $scope.workspaces.push({ name: 'Workspace 2' });
    $scope.workspaces.push({ name: 'Workspace 3' });

    function makeRandomRows (colData) {
        var rows = [];
        for (var i = 0; i < 500; i++) {
            rows.push($.extend({
                index: i,
                id: 'row ' + i,
                name: 'GOOG' + i,
                flagImage: Math.random() < 0.4
                    ? 'img/blueFlag16.png'
                    : Math.random() < 0.75
                        ? 'img/yellowFlag16.png'
                        : 'img/greenFlag16.png'
            }, colData));
        }
        return rows;
    }
    $scope.workspaces.forEach(function (wk,index) {
        var colData = {workspace: wk.name};
        wk.rows = makeRandomRows(colData);

        wk.bsTableControl = {
            options: {
                data: wk.rows,
                rowStyle: function (row, index) {
                    return { classes: 'none' };
                },
                cache: false,
                height: 400,
                striped: true,
                pagination: true,
                pageSize: 10,
                pageList: [5, 10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: false,
                minimumCountColumns: 2,
                clickToSelect: false,
                showToggle: true,
                maintainSelected: true,
                columns: [{
                    field: 'state',
                    checkbox: true
                }, {
                    field: 'index',
                    title: '#',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                }, {
                    field: 'id',
                    title: 'Item ID',
                    align: 'center',
                    valign: 'bottom',
                    sortable: true
                }, {
                    field: 'name',
                    title: 'Item Name',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'workspace',
                    title: 'Workspace',
                    align: 'left',
                    valign: 'top',
                    sortable: true
                }, {
                    field: 'flag',
                    title: 'Flag',
                    align: 'center',
                    valign: 'middle',
                    clickToSelect: false,
                    formatter: flagFormatter,
                    // events: flagEvents
                }]
            }
        };
        function flagFormatter(value, row, index) {
            return '<img src="' + row.flagImage + '"/>'
        }

    });


    $scope.changeCurrentWorkspace = function (wk) {
        $scope.currentWorkspace = wk;
    };


    //Select the workspace in document ready event
    $(document).ready(function () {
        $scope.changeCurrentWorkspace($scope.workspaces[0]);
        $scope.$apply();
    });

});
