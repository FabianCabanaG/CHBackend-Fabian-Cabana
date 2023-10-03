import express from 'express';

import productsRouter from './routes/products.router.js'; 
import cartsRouter from './routes/carts.router.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({ error: err.message });
});

app.listen(8080, () => console.log('listening 8080'));