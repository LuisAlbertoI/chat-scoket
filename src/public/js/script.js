const viewMenssage = document.getElementById('view-menssage');
const notification = document.getElementById('notification');
const chatBody = document.getElementById('chat-body');
const userData = document.getElementById('user-data');
const nameUser = document.getElementById('name-user');
const menssage = document.getElementById('menssage');
const warning = document.getElementById('warning');
var socket = io();

// comfigurando entradas del usuario
nameUser.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        if(nameUser.value.length > 2 && nameUser.value.length < 20){
            userData.classList.add('active');
        }else{
            if(nameUser.value.length <= 2){
                warning.innerText = 'Texto Demaciado Corto';
            }
            if(nameUser.value.length >= 20){
                warning.innerText = 'Texto Demaciado Largo';
            }
        }
    }
});

menssage.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        menssageUser();
    }
});

// html a incertar 
function HTMLNotification(data){
    return(`
        <div class="wrapper">
            <span>${data.nombre}</span>
        </div>
    `)
}

function HTMLClientOne(data){
    return(`
        <li>
            <span class="">
                <div class="msj">${data.mensaje} <i class="hour">${data.hour}</i></div>
                <div class="name">${data.nombre}</div>
            </span>
        </li>
    `);
}

function HTMLClientTow(data){
    return(`
        <li>
            <span class="active">
                <div class="msj">${data.mensaje} <i class="hour">${data.hour}</i></div>
                <div class="name">${data.nombre}</div>
            </span>
        </li>
    `);
}

// enviando datos al servidor
function menssageUser(){
    if(menssage.value.length >= 1){
        var hour = new Date;

        var datosClient = {
            nombre: nameUser.value,
            mensaje: menssage.value,
            hour: hour.toLocaleTimeString().slice(0, 5)
        }
        socket.emit('data client', datosClient);
    }
}

// detos recividos del servidor
socket.on('data server', (datos)=>{
    if(datos.nombre === nameUser.value){
        viewMenssage.innerHTML += HTMLClientOne(datos);

    }else{
        viewMenssage.innerHTML += HTMLClientTow(datos);

    }
    // default options

    // configurando el auto scroll para los mensajes
    if(viewMenssage.clientHeight > chatBody.clientHeight){
        chatBody.scrollTo(0, viewMenssage.clientHeight);
    }

    // configurando las notificaciones
    notification.innerHTML += HTMLNotification(datos);
    const wrapper = notification.getElementsByClassName('wrapper');
    const element = notification.children[0].children[0];

    element.addEventListener('animationend', () =>{
        for(var i = 0; i < wrapper.length; i++){
            wrapper[i].remove();
        }
        if(wrapper.length === 1){
            wrapper[0].remove();            
        }
    });

    // configurando la pocicion de los mensajes
    const derecha = viewMenssage.getElementsByClassName('active');
    for(var i = 0; i < derecha.length; i++){

    const width = derecha[i].clientWidth.toString();

    derecha[i].style.left = `calc(100% - ${width}px)`;
    }

    menssage.value = '';
}); 