const express = require('express');
const socket = require('socket.io');
// App setup
const app = express();
 
let server = app.listen(4000 ,function() {
    console.log("Listening to request on port 4000");
    
}); 

//serving static files
app.use(express.static('public'));

//Socket setup
let io = socket(server);

io.on('connection', function(socket) {
    console.log("Made socket connection",socket.id);
    let typers = [];
    socket.on('chat',function(data) {
        io.sockets.emit('chat',data);
        console.log(data.handle,data.message);
        
    });

    socket.on('type',function(data) {
        let index = typers.findIndex((item)=>  data.id==item.id);  
        if(  index ==-1) {
            typers.push(data);
            io.sockets.emit('typer',typers);
        }
        
    });

    socket.on('removeType',function(data) {
        let index = typers.findIndex((item)=>  data.id==item.id);  
        if(  index !=-1) {
            typers.splice(index,1);
            io.sockets.emit('typer',typers);
        }
        
        
        
      
        
    });
});