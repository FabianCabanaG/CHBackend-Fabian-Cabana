import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import ProductsRouter from './routes/products.router.js'; 
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import Chat  from "./dao/dbManagers/chat.manager.js";
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { initializePassport } from './config/passportsessions.config.js';
import passport from 'passport';
import UsersRouter from './routes/users.router.js'
import configs from './config.js';

const chatManager = new Chat();
const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();


const app = express()

// -- > MIDDLEWARE
// PUBLIC FILES
app.use(express.static(`${__dirname}/public`));

// WORKING WITH JSON FILES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// HANDLEBARS
// Motor de plantillas
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars')


// Establecer conexión con la DB - MongoAtlas - Mongoose
try {
    // Se pasa como parámetro el string de conexión 
    await mongoose.connect(configs.mongoUrl);
    console.log('DB Conected')
} catch (error) {
    console.log(error.message);
}

app.use(session({
    store: MongoStore.create({
        client:mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret:'codersecret',
    resave:true, // Sirve para poder actualizar la sesión después de un tiempo de inactividad
    saveUninitialized:true, //Sirve para desactivar el almacenamiento de la sesion si el usuario aún no se ha identificado
}))

// Passport config
initializePassport();

app.use(passport.initialize());
app.use(passport.session());

// ROUTERS
app.use('/api/products',productsRouter.getRouter());
app.use('/api/carts',cartsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/users',usersRouter.getRouter());
app.use('/',viewsRouter);


// ERROR
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({ error: err.message });
});


const server = app.listen(8080, () => console.log('listening 8080'));

const io = new Server(server);

// chat application
const messages = await chatManager.getAll();

io.on('connection', socket => {
    console.log('Nuevo cliente online');

    socket.on('message', async data => {
        messages.push(data);
        let result; 
        result = await chatManager.addMessage(data);
        console.log(result)
        io.emit('messageLogs',messages);
    })

    socket.on('authenticated', data => {
        // se envían todos los mensajes almacenados en messages solo al nuevo cliente.
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected',data);

    })
});


app.set('socketio',io)




