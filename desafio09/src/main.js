import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'
import ContenedorArchivo from './contenedores/ContenedorArchivo.js'

import config from './config.js'

import ApiProductosMock from '../api/productos.js'
import util from 'util';

import { normalize, schema } from 'normalizr';

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)

const productosApiTest = new ApiProductosMock();

//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES

// Definimos un esquema de autor
const author = new schema.Entity('author', {}, {idAttribute: 'email'});

// Definimos un esquema de texto
const text = new schema.Entity('text');

// Definimos un esquema de mensaje
const message = new schema.Entity('message', {
    author: author,
    texts: [text]
});

// Definimos un esquema de posts
const posts = new schema.Entity('posts', {
    posts: [message]
});

async function listarMensajesNormalizados(objeto) {
    const normalizedData = normalize(objeto, posts);
    return util.inspect(normalizedData, false, 12, true);
};

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
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------

app.get('/api/productos-test', async (req, res) => {
    try {
        // Generación de productos con Faker
        res.json(await productosApiTest.popular(req.query.cant));
        // Lectura de productos
        res.json(await productosApiTest.listarAll());
    } catch (err) {
        console.error(err);
    };
});

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
