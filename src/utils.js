// import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY_JWT } from './config/constants.js'
import { faker } from '@faker-js/faker'

// import configs from './config.js';



const generateUsers = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: Number(faker.commerce.price({ min: 100000, max: 10000000 })),
        code: faker.phone.number(),
        stock: Number(faker.commerce.price({ min: 1, max: 30 })),
        category: faker.commerce.department(),
        thumbnail: faker.image.url(),
        status: faker.datatype.boolean(),
        id: faker.number.bigInt(),
        _id: faker.database.mongodbObjectId()

    }
}



const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY_JWT, { expiresIn: '1h' });
    return token;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// // Parametros de configuración de Multer
// // Destino de guardado
// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null, `${__dirname}/public/img/pets`)
//     },
//     filename:(req,file,cb) => {
//         cb(null,`${Date.now()}-${file.originalname}`)
//     }
// });

// const uploader = multer({
//     storage, onError: (err,next) => {
//         console.log(err.message);
//         next();
//     }
// })



// Método para hashear contraseña

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Método para validar el password

const isValidPassword = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken,
    generateUsers,
    // addLogger
}