import { promises as fs } from 'fs';
class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    listar(id) {
        try {
            const objetos = this.listarAll();
            if (objetos.length > 0) {
                const objeto = objetos.find(p => p.id === id);
                if (objeto) {
                    return objeto;
                } else {
                    console.log(`No existe el objeto con id ${id}`);
                    return null;
                };
            } else {
                console.log('No existen objetos');
                return null;
            };
        } catch (error) {
            console.error(error);
        };
    };

    listarAll() {
        try {
            this.elementos = sessionStorage.getItem('objetos');
            return JSON.parse(this.elementos);
        } catch (error) {
            return [];
        };
    }

    guardar(obj) {
        try {
            const objetos = this.listarAll();
            if (objetos.length <= 0) {
                obj.id = 1; // el primer objeto tiene id 1
            } else {
                const ids = objetos.map(p => p.id);
                let id;
                const id1 = ids.find(id => id === 1);
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
            obj.timestamp = new Date().toLocaleString();
            objetos.push(obj);
            objetos.sort((a, b) => a.id - b.id); // objetos ordenados por id
            this.elementos = JSON.stringify(objetos, null, 4);
            sessionStorage.setItem('objetos', this.elementos);
        } catch (error) {
            console.error(error);
        };
    }

    actualizar(obj, id) {
        try {
            obj.id = id;
            const objetos = this.listarAll();
            const index = objetos.findIndex(p => p.id === obj.id);
            if (index >= 0) {
                obj.timestamp = new Date().toLocaleString();
                objetos[index] = obj;
                this.elementos = JSON.stringify(objetos, null, 4);
                sessionStorage.setItem('objetos', this.elementos);
                console.log(`El objeto con id ${id} ha sido actualizado`);
            } else {
                console.log(`No existe el objeto con id ${id}`);
            };
        } catch (error) {
            console.error(error);
        };
    };

    borrar(id) {
        try {
            const objeto = this.listar(id);
            if (objeto) {
                const objetos = this.listarAll();
                const index = objetos.findIndex(p => p.id === id);
                objetos.splice(index, 1);
                this.elementos = JSON.stringify(objetos, null, 4);
                sessionStorage.setItem('objetos', this.elementos);
                console.log(`El objeto con id ${id} ha sido eliminado`);
                if (objetos.length <= 0) {
                    this.borrarAll();
                };
            } else {
                console.log(`No existe el objeto con id ${id}`);
            };
        } catch (error) {
            console.error(error);
        };
    };

    borrarAll() {
        try {
            sessionStorage.removeItem('objetos');
            console.log('Todos los objetos han sido eliminados');
        } catch (error) {
            console.error(error);
        };
    };

    borrarPorDosId(id1, id2) {
        try {
            const objeto1 = this.listar(id1);
            if (objeto1) {
                const arreglo = objeto1.objetos;
                const index = arreglo.findIndex(p => p.id === id2);
                if (index >= 0) {
                    arreglo.splice(index, 1);
                    objeto1.objetos = arreglo;
                    this.actualizar(objeto1, id1);
                } else {
                    console.log(`No existe el objeto con id ${id2}`);
                };
            } else {
                console.log(`No existe el objeto con id ${id1}`);
            };
        } catch (error) {
            console.error(error);
        };
    };
};

export default ContenedorMemoria;
