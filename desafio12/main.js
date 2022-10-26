require('dotenv').config();

const mongoLocal = process.env.mongoLocal;
const mongoRemote = process.env.mongoRemote;
const sqlite3 = process.env.sqlite3;
const mariaDb = process.env.mariaDb;
const fileSystem = process.env.fileSystem;

console.log(mongoLocal);
console.log(mongoRemote);
console.log(sqlite3);
console.log(mariaDb);
console.log(fileSystem);


const yargs = require('yargs/yargs')(process.argv.slice(2));

const args = yargs.default({
    puerto: '8080'
}).alias({
    p: 'puerto'
}).argv

console.log(args);


const info = () => {
    console.log('Directorio actual: ' + process.cwd());
    console.log('Id del proceso: ' + process.pid);
    console.log('Version Node: ' + process.version);
    console.log('Titulo del proceso: ' + process.title);
    console.log('Sistema Operativo: ' + process.platform);
    console.log('Memoria: ' + process.memoryUsage().rss);
};



const http = require('http');
const { fork } = require('child_process');

let visitas = 0;

const server = http.createServer();

server.on('request', (req, res) => {
    let { url } = req;
    if (url === '/calcular') {
        const computo = fork('./computo.js');
        computo.send('start');
        computo.on('message', cantidades => {
            res.send(cantidades);
        });

    } else if (url === '/') {
        res.end(`Ok ${++visitas}`);
    };
});

server.listen(8080, err => {
    if (err) throw new Error('Error en el servidor');
    console.log('Servidor escuchando en el puerto 8080');
});

process.on('message', msg => {
    if (msg === 'start') {
        console.log('Child process started');
        const result = randoms(10);
        process.send(result);
    };
});