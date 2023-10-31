import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import {productsRouter} from './routes/products.router.js'; 
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import Chat  from "./dao/dbManagers/chat.manager.js";

const chatManager = new Chat();


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

// ROUTERS
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/',viewsRouter);


// ERROR
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({ error: err.message });
});

// Establecer conexión con la DB - MongoAtlas - Mongoose
const db = 'ecommerce'

try {
    // Se pasa como parámetro el string de conexión 
    await mongoose.connect(`mongodb+srv://faccabana11:69ziXnAw9MjZoQOl@codercluster.3z9dyf0.mongodb.net/${db}?retryWrites=true&w=majority`);
    console.log('DB Conected')
} catch (error) {
    console.log(error.message);
}

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




