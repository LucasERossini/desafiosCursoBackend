import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        try {
            const resultado = await knex(this.tabla).select('id', id);
            return resultado;
        } catch (error) {
            console.error(error);
        };
    };

    async listarAll() {
        try {
            const resultado = await knex(this.tabla).select('*');
            return resultado;
        } catch (error) {
            console.error(error);
        };
    };

    async guardar(elem) {
        try {
            await knex(this.tabla).insert(elem);
        } catch (error) {
            console.error(error);
        };        
    };

    async actualizar(elem, id) {
        try {
            await knex(this.tabla).where('id', id).update(elem);
        } catch (error) {
            console.error(error);
        };        
    };

    async borrar(id) {
        try {
            await knex(this.tabla).where('id', id).delete(elem);
        } catch (error) {
            console.error(error);
        };
    };

    async borrarAll() {
        try {
            await knex(this.tabla).delete('*');
        } catch (error) {
            console.error(error);
        };          
    };

    async desconectar() {
        try {
            await knex.destroy();
        } catch (error) {
            console.error(error);
        };    
    };
};

export default ContenedorSQL;