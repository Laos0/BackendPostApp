
export class UserDetails{

    id;
    firstName;
    lastName;
    email;
    password;
    isCreated = true;
    isLoggedIn;
    emailExist;
    passwordMatch;
    isQueryGood;

    constructor(id, firstName, lastName, email, password, isLoggedIn, emailExist, passwordMatch, isQueryGood){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isLoggedIn = isLoggedIn;
        this.emailExist = emailExist;
        this.passwordMatch = passwordMatch;
        this.isQueryGood = isQueryGood;
    }

   
}