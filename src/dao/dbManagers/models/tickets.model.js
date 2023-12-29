import mongoose from 'mongoose';

// Especificar nombre de la colección
 
const ticketsCollection = 'tickets';

// Definir schema del documento => atributos que tendrá el usuario

const ticketsSchema = new mongoose.Schema({
    code:String,
    purchase_datetime:String,
    amount:Number,
    purchaser:String
});

// Parte funcional del modelo, en donde se interactúa con la DB => Consultas, transaciones, escritura, actualización y borrado.

export const ticketsModel = mongoose.model(ticketsCollection,ticketsSchema);



