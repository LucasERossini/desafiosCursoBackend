import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo';

import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import productosApiRouter from './routers/api/productos.js'

import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'


//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    const productos = await productosApi.listarAll();
    socket.emit('productos', productos);

    // actualización de productos
    socket.on('update', async producto => {
        await productosApi.guardar(producto);
        io.sockets.emit('productos', productos);
    });

    // carga inicial de mensajes
    const mensajes = await mensajesApi.listarAll();
    const mensajesNormalizados = await listarMensajesNormalizados(mensajes);
    socket.emit('mensajes', mensajesNormalizados);

    // actualización de mensajes
    socket.on('nuevoMensaje', async mensaje => {
        await mensajesApi.guardar(mensaje);
        const mensajesNormalizados = await listarMensajesNormalizados(mensajes);
        io.sockets.emit('mensajes', mensajesNormalizados);
    });
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');

// Mongo Atlas
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(session({
    store: new MongoStore({ 
        mongoUrl: config.mongoRemote.mongoUrl,
        mongoOptions: config.mongoRemote.mongoOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 }
}))

//--------------------------------------------
// rutas del servidor API REST


//--------------------------------------------
// rutas del servidor web


//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
