import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //productos
    const productos = await productosApi.listarAll();
    socket.emit('productos', productos);

    socket.on('update', async producto => {
        await productosApi.guardar(producto);
        io.sockets.emit('productos', productos);
    });

    //mensajes
    const mensajes = await mensajesApi.listarAll();
    socket.emit('mensajes', mensajes);

    socket.on('nuevoMensaje', async mensaje => {
        await mensajesApi.guardar(mensaje);
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
