// Make Connsection
var socket = io.connect('http://localhost:4000');

// Query dom
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');

//Emit events

btn.addEventListener('click',function() {
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    })
});

//Listen for events
socket.on('chat',function(data) {
    output.innerHTML += `
        <p><strong> ${data.handle} : </strong> ${data.message}</p>
    `;
});
