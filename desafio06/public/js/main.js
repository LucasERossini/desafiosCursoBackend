const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault();
    //Armar objeto producto y emitir mensaje a evento update
    const producto = {
        title: document.getElementById('nombre').value,
        price: document.getElementById('precio').value,
        thumbnail: document.getElementById('foto').value
    };
    socket.emit('update', producto);
})

socket.on('productos', productos => {
    //generar el html y colocarlo en el tag productos llamando a la funcion makeHtmlTable
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html;
    });
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault();
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const tiempoActual = formatDate(new Date());
    const mensaje = {
        username: inputUsername.value,
        texto: inputMensaje.value,
        time: tiempoActual
    };
    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset();
    inputMensaje.focus();
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
};

function formatDate(date) {
    return (
        [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),            
            date.getFullYear()
        ].join('/') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds())
        ].join(':')
    );
};

function makeHtmlList(mensajes) {
    //Armar nuestro html para mostrar los mensajes como lo hicimos en clase
    if (mensajes.length) {
        return mensajes.map(elem => {
            return (`
            <div>
                <strong style="color: blue">${elem.username}</strong> <span style="color: brown">${elem.time}</span>: <em style="color: green">${elem.texto}</em>
            </div>
        `);
        }).join(' ');
    } else {
        return '<p>No hay mensajes</p>'
    };
};

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
