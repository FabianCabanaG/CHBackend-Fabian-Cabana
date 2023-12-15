// import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PRIVATE_KEY_JWT} from './config/constants.js'

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY_JWT, {expiresIn:'24h'});
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

const isValidPassword = (plainPassword,hashedPassword) => bcrypt.compareSync(plainPassword,hashedPassword);

export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken
}