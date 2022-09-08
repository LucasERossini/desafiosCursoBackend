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

//------------------------------------------
// mensajes en SQLite3
const sqliteClient = knex(config.sqlite3)
try {
    //Implementar creación de tabla
    await sqliteClient.schema.createTable('mensajes', table => {
        table.increments('id');
        table.string('username');
        table.integer('message');
    })
    console.log('Tabla de mensajes en sqlite3 creada con éxito');
} 
catch (error) {
    console.error('Error al crear tabla mensajes en sqlite3');
    console.error(error);
}
finally {
    sqliteClient.destroy();
    console.log('Proceso finalizado');
};