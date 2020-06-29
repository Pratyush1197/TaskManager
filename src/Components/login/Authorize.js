class Auth {
    constructor() {
      this.authenticated = false
    }
  
    login(cb) {
      this.authenticated = true;
      //localStorage.setItem('auth',true)
      cb();
    }
  
    logout(cb) {
      this.authenticated = false;
      //localStorage.setItem('auth',false)
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  