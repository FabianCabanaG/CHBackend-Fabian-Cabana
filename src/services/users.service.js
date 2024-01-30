
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import Users from '../dao/dbManagers/users.manager.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';
import sendEmail from './mail.service.js'
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY_JWT } from '../config/constants.js'

const usersManager = new Users();

    const registerService = async  (req,res) =>  {
        try {
            const {first_name, last_name, email, role, password } = req.body;

            if(!first_name || !last_name || !email || !role || !password ) {
                return res.sendClientError('incomplete values')
            }

            const existsUser = await usersManager.getByEmail(email);

            if(existsUser) {
                return res.sendClientError('User Already Exists')
            }

            const hashedPassword = createHash(password);

            const newUser = {
                ...req.body
            }

            newUser.password = hashedPassword;

            const result = await usersManager.save(newUser);

            res.sendSuccessNewResource(result);

        } catch (error) {
            res.sendServerError(error.message);
        }
    }


    const loginService = async  (req,res) =>  {
        try {
            const {email, password } = req.body;

            if(!email || !password ) {
                return res.sendClientError('incomplete values')
            }

            const user = await usersManager.getByEmail(email);

            if(!user) {
                return res.sendClientError('Incorrect Credentials')
            }

            const comparePassword = isValidPassword(password,user.password);

            if(!comparePassword) {
                return res.sendClientError('Incorrect Credentials')
            }

            const accessToken = generateToken(user);

            console.log(req.session.user)
            res.sendSuccess(accessToken);

        } catch (error) {
            res.sendServerError(error.message);
        }
    }


    const getAllService = async  (req,res) =>  {
        try {
            const students = await studentsManager.getAll();
            res.sendSuccess(students);
        } catch (error) {
            res.sendServerError(error.message);
        }
    };
    

    const retrievePassword = async  (email) =>  {
        const user = await usersManager.getByEmail(email)
        if(!user) {
            console.log("user doesn't exists")
            return
        }
        console.log(user)
        const jwtToken = generateToken(user)
        console.log(jwtToken)

        const emailToSend = {
            to:email,
            subject: 'Recuperación de contraseña',
            html: `<p> haz click aquí: http://localhost:8080/resetpassword?token=${jwtToken} </p>`
        }

        sendEmail(emailToSend)
    };
    
    const  resetPassword = async  (token,newPassword) =>  {
        const user2 = jwt.verify(token,PRIVATE_KEY_JWT)
        const user = user2.user
        

        const hashedPassword = createHash(newPassword);

        user.password = hashedPassword;

        const result = await usersManager.updateUser(user._id,user);

        console.log(result)
    
    };


    export {
        registerService
       ,loginService
       ,getAllService
       ,retrievePassword
       ,resetPassword
    }
