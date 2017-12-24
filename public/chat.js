// Make Connsection
let socket = io.connect('http://localhost:4000');
let id;
let typers = [];
socket.on('connect', function () {
    id = socket.io.engine.id;
    console.log(id);

})

// Query dom
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let type = document.getElementById('typer');
let chatBox = document.getElementById('chat-window')

//Emit events

btn.addEventListener('click', function () {
    if (message.value.length != 0 && handle.value.length != 0) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
    }
    
    
});

//Listen for events
socket.on('chat', function (data) {
    output.innerHTML += `
        <p><strong> ${data.handle} : </strong> ${data.message}</p>
    `;
    chatBox.scrollTop =  output.scrollHeight ;
});


socket.on('typer',function(data) {
    typers = data;
    addTyper();
});
message.addEventListener('keyup', function (e) {
    
     if (handle.value.length != 0) {
        if(e.keyCode == 13 && message.value.length !=0 ) {
            let event = new Event('click')
            btn.dispatchEvent(event);
            socket.emit('removeType', {
                id: id,
                handle: handle.value
            });
            
        }
        else if (this.value.length == 1) {
            socket.emit('type', {
                id: id,
                handle: handle.value
            });


        } else if (this.value.length == 0) {
            socket.emit('removeType', {
                id: id,
                handle: handle.value
            });
        }
    }  

});

function addTyper() {
    
    let back = " is typing...";
    let Person = [];
    typers.forEach(element => {
         if(element.id!=id) {
            Person.push(element.handle)
         }
    });
    if(Person.length!=0)  {
    type.textContent = Person.join(',') + back;
    }
    else {
        type.textContent="";
    }
    
    
}   