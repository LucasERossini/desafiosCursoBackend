import ContenedorMemoria from '../src/contenedores/ContenedorMemoria.js';
import { generarProducto } from '../utils/generadorDeProductos.js';

class ApiProductosMock extends ContenedorMemoria {
    constructor() {
        super();
    };

    popular(cant = 5) {
        const nuevos = [];
        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarProducto();
            const guardado = this.guardar(nuevoProducto);
            nuevos.push(guardado);
        };
        return nuevos;
    };
};

export default ApiProductosMock;