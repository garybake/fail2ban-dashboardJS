var express = require('express'),
    fs = require("fs"),
    config = require('./config.js'),
    ini = require('ini'),
    exec = require('child_process').exec;
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/static'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });

app.get('/api/appstatus', function(req, res){
    var status = {status: "ok"};
    res.json(status);
});

app.get('/api/serverstatus', function(req, res){
    var command = 'fail2ban-server status';
    exec(command, function(error, stdout, stderr){
        res.json({status: stdout});
    });
});

app.get('/api/log', function(req, res) {
    var eventsList = {events: []};

    fs.readFile(config.f2b.logFile, "utf8", function (err, data) {
        if (err) throw err;

        var lines = data.split("\n");
        lines.forEach(function(line){
            var logLine = logLineToEvent(line);
            if (logLine.type === 'Ban'){
                eventsList.events.push(logLineToEvent(line));
            }
        });
        res.json(eventsList);
    });
});

app.get('/api/conf', function(req, res) {
    var conFile = config.f2b.jailConfFile;
    var configData = ini.parse(fs.readFileSync(conFile, 'utf-8'));

    res.json(configData);
});



// app.post('/api/wines', function(req, res) {
//     console.log(req.body);
//     res.send([{name:'wine1'}, {name:'wine2'}]);
// });

// app.post('/api/wines/:id', function(req, res) {
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// });

// Custom 404
app.use(function(req, res){
    res.status(404);
    res.send('404');
});

// Custom 505
app.use(function(req, res){
    console.error(err.stack);
    res.status(500);
    res.send('500');
});

app.listen(app.get('port'), function(){
    console.log('Server started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate');
});


function logLineToEvent(line){
    var eventObj = {};
    if (line.indexOf('Ban') != -1){
        eventObj.type = 'Ban';
        eventObj.time = line.substr(0, 19);
        var lineDetail = line.substr(42, line.length);
        eventObj.service = lineDetail.substring(lineDetail.lastIndexOf('[')+1, lineDetail.lastIndexOf(']'));
        eventObj.ip = lineDetail.split(' ')[3];
    } else {
        // TODO implement other log events
        eventObj.type = 'Other';
    }
    return eventObj;
}