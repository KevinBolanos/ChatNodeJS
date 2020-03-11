var socket = io();

var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: (handle.value === '')?'Anónimo':handle.value
    });
    message.value = '';
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    output.scrollIntoView(false); 
});

socket.on('typing', function(data){
    if(data === "") data = 'Anónimo';
    feedback.innerHTML = '<p><em>' + data + ' está escribiendo...</em></p>';
    feedback.scrollIntoView(false);
});