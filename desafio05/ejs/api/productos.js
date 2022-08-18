const { promises: fs } = require('fs');

class ProductosApi {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async listarAll() {
        try {
            const productos = await fs.readFile(this.ruta, 'utf8');
            return JSON.parse(productos);
        } catch (error) {
            return [];
        };
    };

    async listar(id) {
        const productos = await this.listarAll();
        if (productos.length > 0) {
            const producto = productos.find(p => p.id === id);
            if (producto) {
                return producto;
            } else {
                console.log(`No existe el producto con id ${id}`);
                return null;
            };
        } else {
            console.log('No existen productos');
            return null;
        };
    };

    async guardar(prod) {
        prod.price = parseFloat(prod.price);
        try {
            const productos = await this.listarAll();
            if (productos.length <= 0) {
                prod.id = 1; // el primer producto tiene id 1
            } else {
                const ids = productos.map(p => p.id);
                let id;
                const id1 = ids.find(id => id === 1);
                if (id1) { // si existe el producto con id 1
                    for (let index = 0; index < ids.length; index++) {
                        if (ids[index + 1] - ids[index] > 1) { // si el id siguiente es mayor a 1
                            id = ids[index] + 1;
                            break;
                        } else {
                            id = Math.max(...ids) + 1 // si no, el id es el mayor + 1
                        };
                    };
                } else {
                    id = 1; // si no existe el producto con id 1
                };
                prod.id = id;
            };
            console.log(`El id del producto agregado es: ${prod.id}`);
            productos.push(prod);
            productos.sort((a, b) => a.id - b.id); // productos ordenados por id
            await fs.writeFile(this.ruta, JSON.stringify(productos, null, 4));
        } catch (error) {
            console.error(error);
        };
    };

    async actualizar(prod) {
        prod.price = parseFloat(prod.price);
        prod.id = parseInt(prod.id);
        const productos = await this.listarAll();
        const index = productos.findIndex(p => p.id === prod.id);
        productos[index] = prod;
        await fs.writeFile(this.ruta, JSON.stringify(productos, null, 4));
        return productos;
    };

    async borrarAll() {
        await fs.writeFile(this.ruta, '');
    };

    async borrar(id) {
        const producto = await this.listar(id);
        if (producto) {
            const productos = await this.listarAll();
            const index = productos.findIndex(p => p.id === id);
            productos.splice(index, 1);
            await fs.writeFile(this.ruta, JSON.stringify(productos, null, 4));
            console.log(`El producto con id ${id} ha sido eliminado`);
            if (productos.length <= 0) {
                await this.borrarAll();
            };
        };
    };
}

module.exports = ProductosApi;
