export default class User {
  constructor (username) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  login() {
    //send username and password to login          
    var params = {
      user: $('#username').val(),
      password: $('#password').val()
    }
    
    $.post('/login', params, function(response) {
      console.log(response);
    })
    .fail(function(response) {
      console.log(response);
    });
    
  }

  createAccount() {
    console.log('create new account');

    var params = {
      user: $('#username').val(),
      password: $('#password').val()
    }

    $.post('/createAccount', params, function(response) {

      //$('#main').html(response).attr('name', 'library');
      //$('#serverResponse').html(result).css('color', 'green');
      
    })
      .fail(function(response) {
        console.log(response);
        $('#serverResponse').html(response.responseJSON.message).css('color', 'red');
      });
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
