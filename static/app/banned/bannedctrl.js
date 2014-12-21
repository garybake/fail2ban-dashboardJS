F2BApp.controller('BannedCtrl', function($http){
    var me = this;

    me.events = [{
        time: "Unknown",
        service: "SSH",
        ip: "10.0.0.2"
    }];

    var getData = {};
    $http.get('/api/log', getData, $http.defaults.headers.get).then(function(response){
        me.events = response.data.events;
    });

});
