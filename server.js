var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/static'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// app.configure(function(){
//   app.use(express.bodyParser());
// });

var ips  = [
    { id: 0, date: '11/10/2014', ip: '10.11.12.13' },
    { id: 2, date: '11/10/2014', ip: '14.15.16.17' },
];

app.get('/api/test', function(req, res){
    res.json(ips);
});

app.post('/api/wines', function(req, res) {
    console.log(req.body);
    res.send([{name:'wine1'}, {name:'wine2'}]);
});

app.post('/api/wines/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});

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