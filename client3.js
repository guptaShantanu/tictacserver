const client = require('socket.io-client');

const socket = client('http://127.0.0.1:3000',{
   query:{
       'chatID':'300'
   }
});

socket.on('connect',data=>{
    console.log(data);
})

socket.on('msg',data=>{
    console.log(data);
})