const server = require('http').createServer();

const io = require('socket.io')(server, {
    path: '/socket.io',
    serveClient: true,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
})



        
io.on('connection', function(socket){
    var count = 0;

    console.log('SocketIO > ConnectedSocket'+socket.id);

    socket.on('broadcast', function(data){
        ++count;
        console.log('ElephantIO broadcast > ' + JSON.stringify(data));

        io.sockets.emit('message', data)
    });

    socket.on('disconnect', function(){
        console.log('SocketIO: Received'+ count +'messages');
        console.log('SocketIO > Disconneted socket'+ socket.id);
    })


    /*socket.on('nickname', function (nick, fn) {
        if (nicknames[nick]) {
          fn(true);
        } else {
          fn(false);
          nicknames[nick] = socket.nickname = nick;
          socket.broadcast.emit('announcement', nick + ' connected');
          io.sockets.emit('nicknames', nicknames);
        }
    });

    socket.on('disconnect', function () { 
        if(!socket.nicknames)
            return;
        delete nicknames[socket.nickname]
        socket.broadcast.emit('annoucement', socket.nickname + 'disconneted' );
        socket.broadcast.emit('nicknames', nickname);    
    });*/
});

server.listen(3000, function(){
    console.log('listen on : 3000')
})