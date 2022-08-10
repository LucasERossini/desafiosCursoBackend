const Contenedor = require('./Contenedor');

async function main() {
    const producto = new Contenedor('./productos.txt');

/*     console.log('Mostrando todos los productos');
    let allProducts = await producto.getAll();
    console.log(allProducts);

    const idToSearch = 2;
    console.log(`Mostrando el producto con id ${idToSearch}`);
    let productById = await producto.getById(idToSearch);
    console.log(productById); */

    const productToSave = { title: 'Globo Terráqueo', price: 345.67, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png' };
    console.log('Agregando un nuevo producto');
    await producto.save(productToSave);

/*     const idToDelete = 1;
    console.log(`Eliminando el producto con id ${idToDelete}`);
    await producto.deleteById(idToDelete);

    console.log(`Eliminando todos los productos`);
    await producto.deleteAll(); */
}

main();