var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
   cors:{origin:'*'}
});

let PORT = process.env.PORT || 3000

app.get('/test', function(req, res) {
   res.status(200).send('Server up and running 2.0');
});


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log("User entered");
   
   socket.on('start_room',(data,ack)=>{
      try{
         if(data.roomId){
            console.log('Room request enetred');
            socket.join('1234');
            ack(true);
         }else{
            console.log("Room id os not present");
            ack(false);
         }
      }catch(e){
         console.log(e);
         ack(false);
      }
   });

   socket.on('join_room',(data)=>{
      socket.join(data.roomId);
      socket.in(data.roomId).emit('player_joined');
   });

   

   socket.on('start_game',(data)=>{
      console.log('start game request');
      io.in(data.roomId).emit('start_game');
   });



   //Leave the room if the user closes the socket
   socket.on('disconnect', () => {
       socket.leave('1234');
       console.log('User gone');
   })

   // //Send message to only a particular user
   // socket.on('send_message', message => {
   //     receiverChatID = message.receiverChatID
   //    //  senderChatID = message.senderChatID
   //     content = message.content
   //     console.log(receiverChatID,content);

   //     //Send message to only that particular room
   //     socket.in(receiverChatID).emit('msg', {
   //         'content': content,
   //        //  'senderChatID': senderChatID,
   //        //  'receiverChatID':receiverChatID,
   //     })
   // })
});


http.listen(PORT, function() {
   console.log('listening on *: ',PORT);
});