// Para que funcione __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getRoot(req, res) {
    res.send('Bienvenidos');
};

function getLogin(req, res) {
    // isAuthenticated es un método de passport
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('login-ok', {
            usuario: user.username,
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email
        });
    } else {
        res.sendFile(__dirname + '/views/login.html');
    };
};

function getSignUp(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
};

function postLogin(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(__dirname + '/views/index.html');
};

function postSignUp(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(__dirname + '/views/index.html');
};

function getFailLogin(req, res) {
    console.log('Fallo en el login');
    res.render('login-error', {});
};

function getFailSignUp(req, res) {
    console.log('Fallo en el signup');
    res.render('signup-error', {});
};

function getLogout(req, res) {
    // logout es un método de passport
    req.logout( err => {
        if (err) {
            return next(err);
        };
        res.sendFile(__dirname + '/views/index.html');
    });
};

export default {
    getRoot,
    getLogin,
    getSignUp,
    postLogin,
    postSignUp,
    getFailLogin,
    getFailSignUp,
    getLogout
};