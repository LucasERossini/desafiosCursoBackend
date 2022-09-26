import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: 'https://apcoderhouse32065-ce3a9.firebaseio.com'
});

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
            const objetos = await this.listarAll();
            if (objetos.length > 0) {
                const doc = this.coleccion.doc(`${id}`);
                const item = await doc.get();
                const objeto = item.data();
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
            const querySnapshot = await this.coleccion.get();
            let docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return response;
        } catch (error) {
            return [];
        };
    }

    async guardar(obj) {
        try {
            const objetos = await this.listarAll();
            let id;
            if (objetos.length <= 0) {
                id = 1; // el primer objeto tiene id 1
            } else {
                const ids = objetos.map(p => parseInt(p.id));
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
            };
            let doc = this.coleccion.doc(`${id}`);
            obj.timestamp = new Date().toLocaleString();
            await doc.create(obj);
            console.log(`El id del objeto agregado es: ${id}`);
        } catch (error) {
            console.error(error);
        };
    }

    async actualizar(obj, id) {
        try {
            const doc = await this.coleccion.doc(`${id}`);
            obj.timestamp = JSON.stringify(Date.now());
            await doc.update(obj);
            console.log(`El objeto con id ${id} ha sido actualizado`);
        } catch (error) {
            console.error(error);
        };
    }

    async borrar(id) {
        try {
            const doc = await this.coleccion.doc(`${id}`);
            await doc.delete();
            console.log(`El objeto con id ${id} ha sido eliminado`);
        } catch (error) {
            console.error(error);
        };
    }

    async borrarAll() {
        try {
            await this.coleccion.get().then(querySnapshot => {
                querySnapshot.docs.forEach(snapshot => {
                    snapshot.ref.delete();
                });
            });
        } catch (error) {
            console.error(error);
        };
    };

    async borrarPorDosId(id1, id2) {
        try {
            const objeto1 = await this.coleccion.doc(`${id1}`);
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

    async desconectar() {
        try {
            await admin.firestore().delete();
        } catch (error) {
            console.error(error);
        };
    };
};

export default ContenedorFirebase