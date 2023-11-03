
import { User } from "../dao/mongo/classes/userDAO.js";
import {createHash, isValidPassword} from '../utils/functionsUtil.js';

let userClass = new User()

export class UserService {
    async findUser(id) {
        try {
            return await userClass.findUser(id) 
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async findUserGithub(user) {
        try {
            return await userClass.findUserGithub(user)
        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

    async createUser(user) {
        try {
            console.log(user)
            user.password = createHash(user.password);
            return await user.createUser(user);
        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

    async login(email, password) {
        try {
            const user = await user.login({email: email});
            console.log(user)

            if (user.length > 0 && isValidPassword(user[0], password)) {
                return user[0];
            }
            
            throw new Error('Login failed');

        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

}
