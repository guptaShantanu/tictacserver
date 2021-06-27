const client = require('socket.io-client');

const socket = client('http://127.0.0.1:8000',{
});

socket.emit('start_room',{'roomId':'1234'},(res)=>{
    console.log('Room started ',res);
});

// socket.on('room_started',()=>{
//     console.log("***** ROOM STARTED ******");
// })

socket.on('player_joined',()=>{
    console.log('***** PLAYER JOINED *****');
})

setTimeout(() => {
    socket.emit('start_game',{
        'roomId':'1234'
    });
}, 20000);

socket.on('start_game',()=>{
    console.log('***** GAME STARTED *****');
})

socket.on('connect',data=>{
    console.log(data);
})