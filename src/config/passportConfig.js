import passport from 'passport';
import 'dotenv/config'
import local from 'passport-local';

import {Cart} from '../dao/mongo/classes/index.js'
import GitHubStrategy from 'passport-github2'
import usersModel from '../dao/mongo/models/users.js'
import { createHash, isValidPassword } from '../utils/functionsUtil.js';
import { UserDTO } from '../dao/dto/userDTO.js';
import {UserService} from '../sevices/userService.js'

const localStratergy = local.Strategy;
const cart = new Cart()
const US = new UserService()

const initializatePassport = () => {
    //github
    passport.use(
        'github',
        new GitHubStrategy({
            clientID: '774d0bb282271ac95f185f8353b0406898f14b43', //process.env.CLIENT_ID,
            clientSecret: 'Iv1.0286a2a26f33742e', //process.env.SECRET_ID,
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
            scope:["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const userGithub = {$or:[{username: profile._json.login},{email:profile.emails[0].value}]}
            let user = await US.findUserGithub(userGithub)
            if(!user) {
                const testPass = "1234"
                //crear carrito para asignar al usuario nuevo
                const newCart = await cart.createCart()
                let newUser = {
                    username: profile._json.login.toLowerCase(),
                    email: profile.emails[0].value,
                    name: profile._json.name,
                    password: createHash(testPass),
                    cart: newCart._id
                }
                let result = await usersModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch(error) {
            return done(error);
        }
    }));
    //local
    passport.use('register', new localStratergy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const newUser = new UserDTO (req.body)
            const {  first_name, last_name, email, age } = req.body;

            //Crear rol admin
            const emailAdmin = req.body.email.slice(0,5)
            const passwordAdmin = req.body.password.slice(0,5)
            if(emailAdmin === "admin" && passwordAdmin === "admin"){
                req.body.role = "admin"
                console.log("Passport, Admin Asignado")
            }
            try {
                let user = await usersModel.findOne({ email: username});
                if(user) {
                    console.log('User already exists');
                    return done(null, false);
                }
                const newCart = await cart.createCart()
                const newUser = {first_name, last_name, email, age, role:req.body.role, password: createHash(password), cart:newCart};
                let result = await usersModel.create(newUser);

                return done(null, result);
            } catch (error) {
                req.session.registerFailed = true;
                return done("Error al registrar usuario: " + error);
            }
        }
    ))
     //local   
    passport.use('login', new localStratergy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await usersModel.findOne({$or:[{email: username},{username: username}]});//Busca email o username
                console.log(user)
                if (!user) {
                    console.log('passport local, User does not exist');
                    return (null, false);
                }
                if(!isValidPassword(user, password)) {
                    return done (null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);
    })
}

export default initializatePassport;