const network = require('./server/network');
const routes = require('./server/routes');
const express = require('express');
const colors = require('colors');
const app = express();

app.use(routes);

const io = require('socket.io')(app.listen(network.port, network.host, ()=>{
    // validando el tipo de conecion del usuario
    if(network.host.toString() === '127.0.0.1'){
        console.log(`servidor corriendo en su dispositivo en http://${network.host}:${network.port}`.green);
    }else{
        console.log(`servidor corriendo en su red local en http://${network.host}:${network.port}`.green);
    }
}));


io.on('connection', function(socket){
    
    socket.on('data client', (datos)=>{
        io.emit('data server', datos);
    });
});