import {Router as expressRouter } from 'express';
import passport from 'passport';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';

export default class Router{
    constructor(){
        this.router = expressRouter();
        this.init(); // Método para que la clase padre tenga la defición del método y las clases hijas tengan la implementación
    }

    getRouter() {
        return this.router;
    }

    init() {}

    // métodos http
    get(path,policies,strategy,...callbacks) {
        this.router.get(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
            )
    }

    post(path,policies,strategy,...callbacks) {
        this.router.post(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
            )
    }

    delete(path,policies,strategy,...callbacks) {
        this.router.get(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
            )
    }

    put(path,policies,strategy,...callbacks) {
        this.router.post(
            path,
            this.applyCustomPassportCall(strategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks)
            )
    }


    applyCallbacks(callbacks) {
        // mapear callbacks 1-1 obteniendo sus parametros (req,res)
        return callbacks.map((callback) => async (...params) => {
            try {
                // apply va a ejecutar la función callback a la instancia de nuestra clase.
                await callback.apply(this,params);
            } catch (error) {
                params[1].status(500).json({status:'error',message:error.message})
            }
        }) // [req,res]
    }

    handlePolicies = (policies) => (req,res,next) => {
        // ['PUBLIC']
        if(policies[0] === accessRolesEnum.PUBLIC) return next();
        const user = req.user;

        if(!policies.includes(user.role.toUpperCase()))
            return res.status(403).json({error:'Not allowed'});
        next();
    }

    applyCustomPassportCall = (strategy) => (req,res,next) => {
        if(strategy === passportStrategiesEnum.JWT) {
            // aplicar un custom passport call
            passport.authenticate(strategy,function(err,user,info) {
                if(err) return next(err);
                if(!user){
                    res.status(401).send({
                        error:info.messages ? info.messages : info.toString()
                    })
                }

                req.user = user;
                next();

            })(req,res,next);
        } else {
            next()
        }
    }

    generateCustomResponse = (req,res,next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({data})
        };

        res.sendServerError = (error) => {
            res.status(500).json({ error })
        };

        res.sendClientError = (error) => {
            res.status(400).json({ error })
        }

        res.sendSuccessNewResource = (data) => {
            res.status(201).json({ data })
        }

        next();
    }
}