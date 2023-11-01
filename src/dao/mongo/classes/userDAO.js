import userModel from "../models/users.js"

export class User {
    //Constructor eliminado 
    async findUserGithub(profile) {
        try {
            return await userModel.findOne({$or:[{username: profile._json.login},{email:profile.emails[0].value}]}) 
        } catch (error) {
            console.error(error);
            return [];
        }
}
    async createUser(user) {
            try {
                return await userModel.create(user); 
            } catch (error) {
                console.error(error);
                return [];
            }
    }
    async login(email) {
        try {
            return await userModel.create(email); 
        } catch (error) {
            console.error(error);
            return [];
        }
    }  
}
