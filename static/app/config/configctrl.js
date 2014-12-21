F2BApp.controller('ConfigCtrl', function($http){
    var me = this;

    me.configs = [];

    var getData = {};
    $http.get('/api/conf', getData, $http.defaults.headers.get).then(function(response){
        me.configs = response.data;
    });

});
