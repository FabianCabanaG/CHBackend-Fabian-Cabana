import {messagesModel} from './models/messages.models.js'

export default class Chat {
    constructor () {
        console.log('Working chat with db');
    }

    getAll = async () =>  {
       // pasar de BSON a POJO (Plain Old Javascript Object)
        const products = await messagesModel.find().lean();
        return products;
    }

    addMessage = async (message) => {
        const result = await messagesModel.create(message);
        return result;
    }
}