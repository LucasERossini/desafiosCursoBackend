const express = require('express')

const ProductosApi = require('../api/productos.js')

const productosApi = new ProductosApi('./public/productos.txt')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Set engine
app.set('views', './views');
app.set('view engine', 'ejs');

//--------------------------------------------

app.post('/productos', async (req, res) => {
    console.log('Agregar un nuevo producto');
    res.send(await productosApi.guardar(req.body));
});

app.get('/productos', async (req, res) => {
    console.log('Listando todos los productos');
    const productos = await productosApi.listarAll();
    console.log(productos);
    let hayProductos;
    if (productos.length > 0) {
        hayProductos = true;
    } else {
        hayProductos = false;           
    };
    res.render('vista', { hayProductos: hayProductos, productos: productos });
});

//--------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
