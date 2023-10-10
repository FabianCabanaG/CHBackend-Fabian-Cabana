import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import {productsRouter} from './routes/products.router.js'; 
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';


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

const server = app.listen(8080, () => console.log('listening 8080'));

const io = new Server(server);

io.on('connection', socket => {
    console.log('Nuevo cliente online');
});

app.set('socketio',io)
