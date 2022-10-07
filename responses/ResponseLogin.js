export class ResponseLogin{
   isLoggedIn;
   emailExist;
   passwordMatch;
   isQueryGood;

   // The layer of checking: isQueryGood -> emailExist -> passwordMatch -> LoggedIn
   constructor(isLoggedIn, emailExist, passwordMatch, isQueryGood){
      this.isLoggedIn = isLoggedIn;
      this.emailExist = emailExist;
      this.passwordMatch = passwordMatch;
      this.isQueryGood = isQueryGood;
   }

   // if login is successful set all fields to true
   loginSuccessful(){
      this.isLoggedIn = true;
      this.emailExist = true;
      this.passwordMatch = true;
      this.isQueryGood = true;
   }

   // if password is inncorrect set all fields to false but the emailExist and isQueryGood
   passwordIncorrect(){
      this.isLoggedIn = false;
      this.emailExist = true;
      this.passwordMatch = false;
      this.isQueryGood = true;
   }

   // if email does not exist set all fields to false but the query
   emailDoesNotExist(){
      this.isLoggedIn = false;
      this.emailExist = false;
      this.passwordMatch = false;
      this.isQueryGood = true;
   }

   // if the query is bad set all fields to false;
   queryIsNoGood(){
      this.isLoggedIn = false;
      this.emailExist = false;
      this.passwordMatch = false;
      this.isQueryGood = false;
   }
}