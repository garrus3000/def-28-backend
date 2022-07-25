// import * as dotenv from 'dotenv'
import  dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import { engine } from "express-handlebars"

import routerProducto from './src/routes/routesProductos.js';
import ContenedorMensajes from './src/controllers/contenedorMensajes.js';

import { allNormalizeProcess } from './src/controllers/normalizr.js';

import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import passport from './src/routes/passport-local.js';

import routesHBS from './src/routes/routes.js';
import routerInfo from './src/routes/info.js';

const app = express();
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

const mensajes = new ContenedorMensajes('./src/DB/mensajes.json');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'main.hbs',
    })
);

app.set('views', './public/views');
app.set('view engine', 'hbs');


app.use(cookieParser());

app.use(
    session({
        store: MongoStore.create({
            mongoUrl:process.env.MONGO_ATLAS_URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 10,
        },
    })
);

// fake data productos, faker.js
app.use("/api", routerProducto);

// ROOT - HOME
app.get("/", routesHBS.getRoot);
app.get("/home", routesHBS.getHome);

// SIGNUP
app.
    route("/signup")
        .get(routesHBS.getSignup)
        .post(passport.authenticate("signup", {successRedirect:"/login", failureRedirect:"/failsignup"}));
;
app.get("/failsignup", routesHBS.getFailSignup);

//  LOGIN
app.
    route("/login")
        .get(routesHBS.getLogin)
        .post(passport.authenticate("login", {successRedirect:"/home", failureRedirect:"/faillogin"}), routesHBS.postLogin);
;
app.get('/faillogin', routesHBS.getFailLogin);

// LOGOUT
app.get("/logout", routesHBS.isItLogged, routesHBS.getLogout);
app.get("/getuser", routesHBS.isItLogged, routesHBS.getUser);

app.use('/info', routerInfo);


ioServer.on("connection", async (socket) => {
    console.log("Nuevo usuario conectado");
    
    socket.emit("messages", allNormalizeProcess(await mensajes.getAll()));
  
    socket.on("new-message", async (msj) => {
        await mensajes.save(msj);
        allNormalizeProcess(await mensajes.getAll()),
        
            ioServer.sockets.emit("messages",
                allNormalizeProcess(await mensajes.getAll())
            );
    });
});

// Ataja los errores de passport
app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});

app.use((req, res) => {
    res.status(404).send({
        error: -2,
        descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no implementada`,
    });
});


const PORT = process.argv[2] || 8080; // funciona con npm start, npm run start N y node server.js 
httpServer.listen(PORT, (err) => {
    if(err) new Error (console.log(err));
    else console.log(`Servidor corriendo en el puerto: ${PORT} `);
});