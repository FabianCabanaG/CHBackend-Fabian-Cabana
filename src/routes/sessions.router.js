import  { Router } from 'express';
import usersModel from '../dao/dbManagers/models/users.model.js'

const router = Router();

router.post('/register', async (req,res) => {
    try {
        const {first_name,last_name,email,age,password} = req.body;
        
        if(!first_name || !last_name || !email || !age || !password){
            return res.status(422).send({status:'error',message:'Incomplete values'})
        }

        const exists = await usersModel.findOne({email})
        
        if(exists) {
            return res.status(400).send({status:'error',message:'user ya existe'})
        }

        await usersModel.create({
            first_name,
            last_name,
            email,
            age,
            password
        });

        res.status(201).send({status:'success',message:'Registration complete'})
        
    } catch (error) {
        res.status(500).send({status:'error',message:error.message})
    }
})

router.post('/login', async (req,res) => {
    try {
        const {email,password} = req.body;
        
        
        const user = await usersModel.findOne({email,password});
        
        if(!user) {
            console.log(1)
            return res.status(400).send({status:'error',message:'Incorrect credentials'})
        }
        if(email == 'adminCoder@coder.com' && password == 'adminCod3r123'){
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role:'admin'
            }    
        } else {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: 'usuario'
            }
    }


    res.send({status:'success',message:'Authenticated'})

    } catch (error) {
        console.log(error)
        res.status(500).send({status:'error',message:error.message})
    }
});

router.get('/logout',(req,res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({status:'error',message:error.message})
    })
    res.redirect('/')
})

export default router;