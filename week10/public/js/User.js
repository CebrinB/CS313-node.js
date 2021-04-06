export default class User {
  constructor (username) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    sessionStorage.setItem('kirjasto.ni.username', username);
    this.username = username;
  }

  changeUsername(username) {
    localStorage.removeItem('kirjasto.ni.username');
    this.setUsername(username);
  }

  login(view, index) {
    //send username and password to create account or login
    var localInstance = this;
    var url = '';   

    var params = {
      user: $('#username').val(),
      password: $('#password').val()
    }

    if (index === 1) {
      url = '/login';
    } else url = '/createAccount';
    
    $.post(url, params, function(response) {
      localInstance.setUsername(response.username);
      view.setUsername(response.username);
      view.loggedIn();
    })
    .fail(function(response) {
      console.log(response);
      $('#serverResponse').html(response.responseJSON.message).css('color', 'red');
    });
  }

  logout(view) {
    this.username = '';
    sessionStorage.removeItem('kirjasto.ni.username');
    $.post('/logout').done(function(response) {
      view.setUsername('');
      view.loggedOut();
    })
  }
}
