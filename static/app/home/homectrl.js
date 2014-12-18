
F2BApp.controller('HomeCtrl', function($http){
    var me = this;

    me.appstatus = {
        status: "Unknown"
    };
    var postData = {};

    $http.post('/api/serverstatus', postData, $http.defaults.headers.post).then(function(response){
        me.appstatus = response.data;
    });

    me.doClick = function(){
        console.log('clicked');
    };
});
