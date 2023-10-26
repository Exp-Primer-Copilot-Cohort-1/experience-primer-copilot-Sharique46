// create web server
var express = require('express');
var app = express();
// create server
var server = require('http').createServer(app);
// create socket io
var io = require('socket.io')(server);
// create mongoose
var mongoose = require('mongoose');
// create model
var Comment = require('./models/comment.model');
// connect database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
// create port
var port = process.env.PORT || 3000;
// create public folder
app.use(express.static('public'));
// create route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
// listen to connection event
io.on('connection', function(socket) {
    // listen to add comment event
    socket.on('addComment', function(data) {
        // create new comment
        var comment = new Comment(data);
        // save new comment
        comment.save(function(err) {
            if (err) throw err;
            // emit new comment
            io.emit('newComment', comment);
        });
    });
});
// listen to port
server.listen(port, function() {
    console.log('Server listening on port ' + port);
});
