export class ResponseLogin{
   isLoggedIn;
   emailExist;
   passwordMatch;
   isQueryGood;

   constructor(isLoggedIn, emailExist, passwordMatch, isQueryGood){
      this.isLoggedIn = isLoggedIn;
      this.emailExist = emailExist;
      this.passwordMatch = passwordMatch;
      this.isQueryGood = isQueryGood;
   }

   loginSuccessful(){
      this.isLoggedIn = true;
      this.emailExist = true;
      this.passwordMatch = true;
      this.isQueryGood = true;
   }

   passwordIncorrect(){
      this.isLoggedIn = true;
      this.emailExist = true;
      this.passwordMatch = false;
      this.isQueryGood = true;
   }

   emailDoesNotExist(){
      this.isLoggedIn = true;
      this.emailExist = false;
      this.passwordMatch = true;
      this.isQueryGood = true;
   }
}