export class UserDetails{

    id;
    firstName;
    lastName;
    email;
    password;
    isCreated = true;
    isLoggedIn = false;

    constructor(id, firstName, lastName, email, password){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

   
}