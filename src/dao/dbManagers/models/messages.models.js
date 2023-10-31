import mongoose from 'mongoose';

// Especificar nombre de la colección

const messagesCollection = 'messages';

// Definir schema del documento => atributos que tendrá el usuario

const messagesSchema = new mongoose.Schema({
    user :{
        type: String
        // ,required:true,
    },
    message: {
            type: String,
            required:true,
        }
});

// Parte funcional del modelo, en donde se interactúa con la DB => Consultas, transaciones, escritura, actualización y borrado.

export const messagesModel = mongoose.model(messagesCollection,messagesSchema);



