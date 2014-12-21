
F2BApp.controller('HomeCtrl', function($http){
    var me = this;

    me.appstatus = {
        status: "Unknown"
    };

    var getData = {};
    $http.get('/api/serverstatus', getData, $http.defaults.headers.get).then(function(response){
        me.appstatus = response.data;
    });

    me.doClick = function(){
        console.log('clicked');
    };
});
