export class UserDetails{

    firstName;
    lastName;
    email;
    password;
    isCreated = true;
    isLoggedIn = false;

    constructor(firstName, lastName, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

   
}