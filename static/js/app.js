var app = angular.module('testapp', []);

app.controller('MyCtrl', function($scope, $http){
    var postData = {};
    $http.post('/api/log', postData, $http.defaults.headers.post).then(function(response){
        $scope.mydata = response.data.events;
    });
});
