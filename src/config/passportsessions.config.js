 import passport from 'passport';
 import local from 'passport-local';
 import GitHubStrategy from 'passport-github2'
 import usersModel from '../dao/dbManagers/models/users.model.js';
 import { createHash,isValidPassword } from '../utils.js';

//  Local es auth con user y password
 const LocalStrategy = local.Strategy;

 const initializePassport = () => {
    // implementación del registro 
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, // permite acceder al objeto request
        usernameField: 'email'
    }, async(req,username,password,done) => {
        try {
            const {first_name,last_name,age} = req.body;

            const user = await usersModel.findOne({email:username})

            if(user) {
                return done(null,false);
            }

            const userToSave = {
                first_name,
                last_name,
                email: username,
                age,
                password: createHash(password)
            }

            const result = await usersModel.create(userToSave)
            
            return done(null,result)

        } catch (error) {
            return done('Incorrect registration')
        }
    }));
    // implementación del login
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username,password,done) => {
        try {
            const user = await usersModel.findOne({email: username});
            if(!user || !isValidPassword(password,user.password)) {
                done(null,false)
            }

            return done(null,user) //req.user

        } catch (error) {
            return done('Incorrect credentials')
        }
    }));

    // github strategy 
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.45af25d309f2581f',
        clientSecret:'9b0a30a090227042c2b4a1813739da9fdb3e9f23',
        callbackURL:'http://localhost:8080/api/sessions/github-callback',
        scope:['user:email']
    }, async(accesToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const email = profile.emails[0].value;

            const user = await usersModel.findOne({email})

            if(!user) {
                const newUser = {
                    first_name:profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password:''
                }
                const result = await usersModel.create(newUser)
            
                return done(null,result)
            } else {
                return done(null,user)
            }


        } catch (error) {
            return done('Incorrect registration')
        }
    }));

    // Serialización y deserialización
    passport.serializeUser((user,done) => {
        console.log('serialize')
        done(null,user._id)
    });

    passport.deserializeUser( async (id,done) => {
        const user = await usersModel.findById(id)
        console.log('deserialize')
        done(null,user)
    });
 }

 export{
    initializePassport
 }