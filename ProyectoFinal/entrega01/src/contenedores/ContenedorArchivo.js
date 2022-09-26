const { promises: fs } = require('fs');

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    };

    async listarAll() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf8');
            return JSON.parse(objetos);
        } catch (error) {
            return [];
        };
    };

    async listar(id) {
        const objetos = await this.listarAll();
        if (objetos.length > 0) {
            const objeto = objetos.find(p => p.id === id);
            if (objeto) {
                return objeto;
            } else {
                console.log(`No existe el objeto con id ${id}`);
            };
        } else {
            console.log('No existen objetos');
        };
    };

    async guardar(obj) {
        try {
            const objetos = await this.listarAll();
            if (objetos.length <= 0) {
                obj.id = 1; // el primer objeto tiene id 1
            } else {
                const ids = objetos.map(p => parseInt(p.id));
                let id;
                const id1 = ids.find(id => id == 1);
                if (id1) { // si existe el objeto con id 1
                    for (let index = 0; index < ids.length; index++) {
                        if (ids[index + 1] - ids[index] > 1) { // si el id siguiente es mayor a 1
                            id = ids[index] + 1;
                            break;
                        } else {
                            id = Math.max(...ids) + 1 // si no, el id es el mayor + 1
                        };
                    };
                } else {
                    id = 1; // si no existe el objeto con id 1
                };
                obj.id = id;
            };
            obj.id = `${obj.id}`;
            console.log(`El id del objeto agregado es: ${obj.id}`);
            obj.timestamp = JSON.stringify(Date.now());
            objetos.push(obj);
            objetos.sort((a, b) => a.id - b.id); // objetos ordenados por id
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 4));
        } catch (error) {
            console.error(error);
        };
    };

    async actualizar(obj, id) {
        obj.id = id;
        const objetos = await this.listarAll();
        const index = objetos.findIndex(p => p.id === id);
        if (index >= 0) {
            obj.timestamp = JSON.stringify(Date.now());
            objetos[index] = obj;
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 4));
            return objetos;
        } else {
            console.log(`No existe el objeto con id ${id}`);
        };
    };

    async borrarAll() {
        await fs.writeFile(this.ruta, '');
    };

    async borrar(id) {
        const objeto = await this.listar(id);
        if (objeto) {
            const objetos = await this.listarAll();
            const index = objetos.findIndex(p => p.id === id);
            objetos.splice(index, 1);
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 4));
            console.log(`El objeto con id ${id} ha sido eliminado`);
            if (objetos.length <= 0) {
                await this.borrarAll();
            };
        } else {
            console.log(`No existe el objeto con id ${id}`);
        };
    };

    async borrarPorDosId(id1, id2) {
        const objeto1 = await this.listar(id1);
        if (objeto1) {
            const arreglo = objeto1.productos;
            const index = arreglo.findIndex(p => p.id === id2);
            if (index >= 0) {
            arreglo.splice(index, 1);
            objeto1.productos = arreglo;
            await this.actualizar(objeto1, id1);
            } else {
                console.log(`No existe el objeto con id ${id2}`);
            };
        } else {
            console.log(`No existe el objeto con id ${id1}`);
        };
    };
};

module.exports = ContenedorArchivo;