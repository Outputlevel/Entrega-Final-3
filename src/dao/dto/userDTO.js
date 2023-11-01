export class UserDTO {
    constructor(user) {
        this.first_name = user.first_name ?? "No name",
        this.last_name = user.last_name ?? "No name", 
        this.full_name = `${first_name} ${last_name}`,
        this.age = user.age
    }
}

