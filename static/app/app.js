var F2BApp = angular.module('F2BApp',[
    'ngRoute'
]);

F2BApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: "app/home/home.html",
        // controller: "AppMainCtrl"
    })
    .when('/config', {
        templateUrl: 'app/config/config.html',
        // controller: "EmailsCtrl"
    })
    .when('/banned', {
        templateUrl: 'app/banned/banned.html',
        // controller: "EmailsCtrl"
    })
    .otherwise({
        redirectTo: '/'
    });
}]);