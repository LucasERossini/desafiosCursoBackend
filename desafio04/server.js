const express = require('express');
const { Router } = express;
const ProductosApi = require('./api/productos.js');

// router de productos
const productosApi = new ProductosApi('./public/productos.txt');

const productosRouter = new Router();

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

//rutas usando productosRouter
productosRouter.get('/', async (req, res) => {
    console.log('Listando todos los productos');
    res.send(await productosApi.listarAll());
});

productosRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Listando producto con id ${id}`);
    res.send(await productosApi.listar(parseInt(id)));
});

productosRouter.post('/', async (req, res) => {
    console.log('Agregar un nuevo producto');
    res.send(await productosApi.guardar(req.body));
});

productosRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Modificando producto con id ${id}`);
    res.send(await productosApi.actualizar(req.body));
});

productosRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Eliminando producto con id ${id}`);
    res.send(await productosApi.borrar(parseInt(id)));
});

// servidor
const app = express();
app.use(express.static('public'));
app.use('/api/productos', productosRouter);

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));
