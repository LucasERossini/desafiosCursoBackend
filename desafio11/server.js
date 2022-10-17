import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import bCrypt from 'bcrypt';
// Passport
import passport from 'passport';
import { Strategy } from 'passport-local';
const LocalStrategy = Strategy;

// Imports de módulos del proyecto
import routes from './routes.js';
import config from './config.js';
import controllersdb from './controllersdb.js';
import User from './models.js';

// Para que funcione __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
                if (err) {
                    return done(err);
                };
                if (user) {
                    return done(null, false);
                };
    
                const newUSer = {
                    username: username,
                    password: createHash(password),
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                };

                User.create(newUSer, (err, userWithId) => {
                    if (err) {
                        return done(err);
                    };
                    return done(null, userWithId);
                });
        });
    }
));

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            };
            if (!user) {
                return done(null, false);
            };
            if (!isValidPassword(user, password)) {
                return done(null, false);
            };
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
};


app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: config.TIEMPO_EXPIRACION
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// LOGIN
app.get('/login', routes.getLogin);

app.post('/login', passport.authenticate('login', {
    failureRedirect: '/faillogin'
}), routes.postLogin);

app.get('/faillogin', routes.getFailLogin);

// SIGNUP
app.get('/signup', routes.getSignUp);

app.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/failsignup'
}), routes.postSignUp);

app.get('/failsignup', routes.getFailSignUp);


// Last part
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    };
    res.redirect('/login');
};

app.get('/ruta-protegida', checkAuthentication, (req, res) => {
    const { user }  = req;
    console.log(user);
    res.send('<h1> Ruta OK! </h1>');
});

// LOGOUT
app.get('/logout', routes.getLogout);

// LISTEN SERVER
controllersdb.conectarDB(config.URL_BASE_DE_DATOS, (err) => {
    if (err) return console.log('Error en conexión a DB: ', err);
    console.log('Conexión a DB OK!');
    app.listen(8080, err => {
        if (err) return console.log('Error en listen del servidor: ', err);
        console.log('Servidor OK en puerto 8080!');
    });
});
