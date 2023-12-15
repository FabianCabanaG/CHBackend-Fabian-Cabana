
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import Users from '../dao/dbManagers/users.manager.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';

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

    export {
        registerService
       ,loginService
       ,getAllService
    }
