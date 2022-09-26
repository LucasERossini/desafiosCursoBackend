const express = require('express')
const { Router } = express

const ContenedorArchivo = require('./contenedores/ContenedorArchivo.js')

//--------------------------------------------
// instancio servidor y persistencia

const app = express()

const productosApi = new ContenedorArchivo('dbProductos.json')
const carritosApi = new ContenedorArchivo('dbCarritos.json')

//--------------------------------------------
// permisos de administrador

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    console.log('Listando todos los productos');
    res.send(await productosApi.listarAll());
});

productosRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Listando producto con id ${id}`);
    res.send(await productosApi.listar(id));
});

productosRouter.post('/', soloAdmins, async (req, res) => {
    console.log('Agregar un nuevo producto');
    res.send(await productosApi.guardar(req.body));
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const { id } = req.params;
    console.log(`Modificando producto con id ${id}`);
    res.send(await productosApi.actualizar(req.body, id));
});

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const { id } = req.params;
    console.log(`Eliminando producto con id ${id}`);
    res.send(await productosApi.borrar(id));
});

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.post('/', async (req, res) => {
    console.log('Creando nuevo carrito');
    const productosCarrito = req.body;
    res.send(await carritosApi.guardar({"productos": [productosCarrito]}));
});

carritosRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Eliminando carrito con id ${id}`);
    res.send(await carritosApi.borrar(id));
});

carritosRouter.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    console.log(`Listando productos del carrito con id ${id}`);
    const carrito = await carritosApi.listar(id);
    res.send(await carrito.productos);
});

carritosRouter.post('/:id/productos', async (req, res) => {
    const { id } = req.params;
    console.log(`Agregar un nuevo producto al carrito con id ${id}`);
    const carrito = await carritosApi.listar(id);
    const idProducto = req.body.id; // se envía un json con {"id": "id de producto"}
    const productoCarrito = await productosApi.listar(idProducto);
    carrito.productos.push(productoCarrito);
    res.send(await carritosApi.actualizar(carrito, id));
});

carritosRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;    
    res.send(await carritosApi.borrarPorDosId(id, id_prod));
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

module.exports = app