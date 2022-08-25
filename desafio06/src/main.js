const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const contenedorArchivoProductos = new ContenedorArchivo('./public/productos.txt');
const contenedorArchivoMensajes = new ContenedorArchivo('./public/mensajes.txt');

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //productos
    const productos = await contenedorArchivoProductos.listarAll();
    socket.emit('productos', productos);

    socket.on('update', async producto => {
        await contenedorArchivoProductos.guardar(producto);
        io.sockets.emit('productos', productos);
    });
    //mensajes
    const mensajes = await contenedorArchivoMensajes.listarAll();
    socket.emit('mensajes', mensajes);

    socket.on('nuevoMensaje', async mensaje => {
        await contenedorArchivoMensajes.guardar(mensaje);
        io.sockets.emit('mensajes', mensajes);
    });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
