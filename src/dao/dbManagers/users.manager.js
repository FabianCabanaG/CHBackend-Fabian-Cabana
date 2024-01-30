import usersModel  from "./models/users.model.js";

export default class Users {
    constructor() {
        console.log('class users')
    }

    getByEmail = async(email) => {
        const user = await usersModel.findOne({email}).lean();
        return user;
    }

    save = async(user) => {
        const result  = await usersModel.create(user);
        return result;
    }

    updateUser = async (id,user) => {
        const result = await usersModel.updateOne({_id:id},user);
        return result;
    }
} 