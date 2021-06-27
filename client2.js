const client = require('socket.io-client');

const io = client('http://127.0.0.1:3000',{
});


io.emit('join_room',{
    'roomId':'12gg34'
});

io.on('room_started',()=>{
    console.log("***** ROOM STARTED ******");
})

io.on('game_started',()=>{
    console.log('***** GAME STARTED *****');
});