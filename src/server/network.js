const networks = require('os').networkInterfaces();
const port = 3000, host = [];

function evaluar(){
    for(var i in networks){
        for(var itwo in networks[i]){
            const address = networks[i][itwo];
            if(address.family === 'IPv4'){
                return address;
            }
        }
    }
}

const result = evaluar();
host.push(result.address);

module.exports = {
    port: port,
    host: host
}