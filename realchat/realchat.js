var express = require('express');
var exphbs = require('express-handlebars');



app = new express();
var users = [];
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);//将socket.io模块绑定到服务器上
app.set('port', process.env.PROT || 8000);
app.use(express.static(__dirname + '/public'));
app.engine('html', exphbs({
    layoutDir: 'views',
    defaultLayout: 'main',
    extname: 'html'
}));
io.on('connection', function(socket) {
    socket.on('login', function(nickname) {
        if(users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userindex = users.length;
            console.log(socket.userindex);
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess', nickname);
            io.sockets.emit('system', nickname, getLength(users), 'login');
        }
    });
    socket.on('disconnect', function() {
        if(socket.userindex > -1) {
            nickname = users.splice(socket.userindex, 1, -1);
            //console.log(users);
            //console.log(getLength(users));
            io.sockets.emit('system', nickname, getLength(users), 'logout');
        }

    });
    socket.on('sendMsg', function(data, color) {
        socket.broadcast.emit('newMsg', socket.nickname, data, color);
    });
    socket.on('img', function(data) {
        socket.broadcast.emit('newImg', socket.nickname, data);
    });
});

app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.status(200);
    res.render('index', {
        layout: false
    });
});

function getLength(user) {
    var count = 0;

    for(var i = 0; i < user.length; i++) {

        if(user[i] != -1) {
            count++;

        }
    }
    return count;
}

//app.listen(app.get('port'), function() {
//    console.log('The server is running on the port ' + app.get('port'));
//});
server.listen(8000);
console.log('The server is running on the port 8000');
