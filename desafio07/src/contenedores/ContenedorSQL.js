import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        const resultado = await knex(this.tabla).select('id', id);
        return resultado;
    }

    async listarAll() {
        const resultado = await knex(this.tabla).select('*');
        return resultado;
    }

    async guardar(elem) {
        await knex(this.tabla).insert(elem);
    }

    async actualizar(elem, id) {
        await knex(this.tabla).where('id', id).update(elem);
    }

    async borrar(id) {
        await knex(this.tabla).where('id', id).delete(elem);
    }

    async borrarAll() {
        await knex(this.tabla).delete('*');
    }

    async desconectar() {
        await knex.destroy();
    }
}

export default ContenedorSQL