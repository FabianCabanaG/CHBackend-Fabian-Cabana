import mongoose from 'mongoose';

// Especificar nombre de la colección

const productsCollection = 'products';

// Definir schema del documento => atributos que tendrá el usuario

const productsSchema = new mongoose.Schema({
    title :{
        type: String,
        required:true,
    },
    description: {
            type: String,
            required:true,
        },
    price: {
            type: Number,
            required:true,
        },
    code :{
            type: String,
            required:true,
            unique:true
        },
    stock: {
            type: Number,
            required:true,
        },
    category: {
            type: String,
            required:true,
        },
    thumbnail: {
        type: String
        ,default: "Sin Imagen"
    },
    status : {
        type: Boolean,
        default: true
    },
    id: Number
});

// Parte funcional del modelo, en donde se interactúa con la DB => Consultas, transaciones, escritura, actualización y borrado.

export const productsModel = mongoose.model(productsCollection,productsSchema);



