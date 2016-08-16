var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function (socket) {
    var i = 0;

    var interval = setInterval(function () {
        socket.emit('population', {
            population: [
                { name: 'Asia', y: 4.427 },
                { name: 'Africa', y: 1.111 },
                { name: 'America', y: 0.3189 },
                { name: 'Australia', y: 0.02313 * i }
            ]
        });
        i++;
        if (i === 50) {
            clearInterval(interval);
        }
    }, 5000);

    socket.on("disconnect", function () {
        clearInterval(interval);
    });

});
server.listen(3000);