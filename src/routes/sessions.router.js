import  { Router } from 'express';
import passport from 'passport';


const router = Router();

router.post('/register', passport.authenticate('register',{failureRedirect:'fail-register'}),async (req,res) => {
    res.status(201).send({status:'success',message:'Registration complete'})
});

router.get('fail-register',async (req,res) => {
    res.status(500).send({status:'error',message:'error en el registro'})
})
router.post('/login', passport.authenticate('login',{failureRedirect:'fail-login'}),async (req,res) => {
    if(!req.user) {
        res.status(401).send({status:'error',message:'Incorrect credentials'})
    }

    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }

    res.send({status:'success',message:'Authenticated'})
    
});

router.get('fail-login',async (req,res) => {
    res.status(500).send({status:'error',message:'error en el login'})
})


router.get('/github', passport.authenticate('github',{scope:['user:email']}),async(req,res) => {
    res.send({status:'success',message:'user registered'})
});

router.get('/github-callback',passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=> {
    req.session.user = req.user;
    res.redirect('/');
})


router.get('/logout',(req,res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).send({status:'error',message:error.message})
    })
    res.redirect('/')
})

export default router;