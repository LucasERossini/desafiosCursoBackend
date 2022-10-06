import MongoStore from 'connect-mongo';
export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        store: new MongoStore({ mongoUrl: 'mongodb://localhost/sesiones' }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 10 }
    },
    mongoRemote: {
        mongoUrl: 'mongodb+srv://lucasRossini32065:6H2Pm8TQSR5DowXz@cluster0.w6fmaml.mongodb.net/ecommerce?retryWrites=true&w=majority', 
        mongoOptions:{ useNewUrlParser: true, useUnifiedTopology: true }
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'productos'
        }
    },
    fileSystem: {
        path: './DB'
    }
}
