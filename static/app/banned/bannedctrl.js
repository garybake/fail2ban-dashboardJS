F2BApp.controller('BannedCtrl', function($http){
    var me = this;

    me.events = [{
        time: "Unknown",
        service: "SSH",
        ip: "10.0.0.1"
    },{
        time: "Unknown",
        service: "SSH",
        ip: "10.0.0.1"
    },{
        time: "Unknown",
        service: "SSH",
        ip: "10.0.0.2"
    }];

    var postData = {};
    $http.post('/api/log', postData, $http.defaults.headers.post).then(function(response){
        me.events = response.data.events;
    });

});
