export class User {
  constructor (username) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  signIn() {
    //send username and password to sign in
    console.log('inside signin!');
          
    let data = {};
    data['username'] = $('#username').value;
    data['password'] = $('#password').value;

    $.ajax({
      type: 'POST',
      url: "/signin",
      data: data, 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!', data);
        if (data === true) {
          $('#main').html('Successfully signed in!');
          this.username = data['username'];
          this.setUsername();
        } else $('#main').html('Incorrect username or password');        
      }//success data call
    
    });//ajax function call
  }

  setUsername() {
    localStorage.setItem('kirjasto.ni.username', JSON.stringify(this.username));
  }






  loadUsername() {
    let text = '';

    if (localStorage.hasOwnProperty('kirjasto.ni.username')) {
      this.username = JSON.parse(localStorage.getItem('kirjasto.ni.username'));
      return this.username;
    }

    text = prompt('Please enter your name:');

    if (text === null) {
        return this.username;
    } else {
      this.username = ', ' + text;
      this.saveUsername();
    }
    
    return this.username;
  }

  changeUsername() {
    localStorage.removeItem('kirjasto.ni.username');
    this.setUsername();
  }

  verifyUsername(record) {
    //ajax request to check a value against the value in the database
    //declare empty data object and fill it with params
    let data = {};
    data["record"] = record;
  
    $.ajax({
      type: 'GET',
      url: "/verifyUsername",
      data: data,
      //return data in json format
      dataType: 'json',  
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!', data);
        
        //return true or false for if the data matches the database
        if (data) {
          return true;
        } else return false;
      
      }//success data call
    
    });//ajax function call
  
  }
}
