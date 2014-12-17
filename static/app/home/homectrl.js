
F2BApp.controller('HomeCtrl', function($scope, $http){

    $scope.appstatus = {
        status: "Unknown"
    };
    var postData = {};

    $http.post('/api/serverstatus', postData, $http.defaults.headers.post).then(function(response){
        $scope.appstatus = response.data;
    });

    $scope.doClick = function(){
        console.log('clicked');
    };
});
