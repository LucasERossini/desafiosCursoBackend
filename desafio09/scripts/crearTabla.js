import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// productos en MariaDb

const mariaDbClient = knex(config.mariaDb)

try {
    //Implementar creación de tabla
    await mariaDbClient.schema.createTable('productos', table => {
        table.increments('id');
        table.string('title');
        table.integer('price');
        table.integer('thumbnail');

    })
    console.log('Tabla productos en mariaDb creada con éxito');
} 
catch (error) {
    console.error('Error al crear tabla productos en mariaDb');
    console.error(error);
}
finally {
    mariaDbClient.destroy();
    console.log('Proceso finalizado');
};