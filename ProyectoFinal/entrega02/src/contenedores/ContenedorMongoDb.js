import mongoose from 'mongoose'
import config from '../config.js'
import { promises as fs } from 'fs';
import { EstudiantesModelo } from '../../../../../Clases/Clase19-Mongoose/ejercicios/01/models/estudiante.js';

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        try {
            const objetos = await this.listarAll();
            if (objetos.length > 0) {
                const objeto = await this.coleccion.find({}).sort({ id: id });
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

    async listarAll() {
        try {
            return await this.coleccion.find({});
        } catch (error) {
            return [];
        };
    }

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
            obj.timestamp = new Date().toLocaleString();
            await this.coleccion.insertOne(obj);
        } catch (error) {
            console.error(error);
        };
    }

    async actualizar(obj, id) {
        try {
            obj.id = id;
            const objetos = await this.listarAll();
            const index = objetos.findIndex(p => p.id === id);
            if (index >= 0) {
                obj.timestamp = new Date().toLocaleString();
                objetos[index] = obj;
                await this.coleccion.updateOne({ id: id }, { $set: obj });
                console.log(`El objeto con id ${id} ha sido actualizado`);
            } else {
                console.log(`No existe el objeto con id ${id}`);
            };
        } catch (error) {
            console.error(error);
        };
    };

    async borrar(id) {
        try {
            const objeto = await this.listar(id);
            if (objeto) {
                const objetos = await this.listarAll();
                const index = objetos.findIndex(p => p.id === id);
                await this.coleccion.deleteOne({ id: id });
                console.log(`El objeto con id ${id} ha sido eliminado`);
            } else {
                console.log(`No existe el objeto con id ${id}`);
            };
        } catch (error) {
            console.error(error);
        };
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({});
            console.log('Todos los objetos han sido eliminados');
        } catch (error) {
            console.error(error);
        };
    };

    async borrarPorDosId(id1, id2) {
        try {
            const objeto1 = await this.listar(id1);
            if (objeto1) {
                const arreglo = objeto1.objetos;
                const index = arreglo.findIndex(p => p.id === id2);
                if (index >= 0) {
                    arreglo.splice(index, 1);
                    objeto1.objetos = arreglo;
                    await this.actualizar(objeto1, id1);
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

export default ContenedorMongoDb;