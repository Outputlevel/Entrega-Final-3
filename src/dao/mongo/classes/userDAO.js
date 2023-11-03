import usersModel from "../models/users.js"

export class User {
    async findUser(id) {
        try {
            return await usersModel.findOne({_id:id}).populate()
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async findUserGithub(profile) {
        try {
            return await usersModel.findOne({$or:[{username: profile._json.login},{email:profile.emails[0].value}]}) 
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async createUser(user) {
            try {
                return await usersModel.create(user); 
            } catch (error) {
                console.error(error);
                return [];
            }
    }
    async login(email) {
        try {
            return await usersModel.create(email); 
        } catch (error) {
            console.error(error);
            return [];
        }
    }  
}
