const express = require('express');
const app = express();

const Contenedor = require('./Contenedor');
const productos = new Contenedor('./productos.txt');

app.get('/productos', (req, res) => {
    console.log('Mostrando todos los productos');
    productos.getAll()
        .then(data => res.send(data))
        .catch(e => console.error(e));
});

async function getRandomProduct(prods) {
    console.log('Mostrando un producto random');
    const allProducts = await prods.getAll();
    const cantidad = allProducts.length;
    const numRan = Math.ceil(Math.random()*cantidad)-1;
    return allProducts[numRan];
};

app.get('/productoRandom', (req, res) => {
    getRandomProduct(productos)
        .then(data => res.send(data))
        .catch(e => console.error(e));
});

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.error(`Error en servidor ${error}`));