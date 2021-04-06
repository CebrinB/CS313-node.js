import Library from "./Library.js";

export default class ViewController {
  constructor (username) {
    this.username = username;
    this.library = new Library(username);
  }

  setUsername(username) {
    this.username = username;
    this.library.setUsername(username);
  }

  viewHome() {
    //ajax request to serve up home.html  
    $.get('/home', function(response) {
      $('#main').html(response).attr('name', 'home');
    });
  }

  viewHome(msg) {
    //ajax request to serve up home.html  
    $.get('/home', function(response) {
      $('#main').html(response).attr('name', 'home');
      $('#serverResponse').text(msg).css('background-color', 'white');
    });
  }

  viewLogin() {
    //ajax request to serve up login.html 
    $.get('/getLogin', function(response) {
      $('#main').html(response).attr('name', 'login');
    });
  }

  viewSignup() {
    //ajax request to serve up signup.html 
    $.get('/getSignup', function(response) {
      $('#main').html(response).attr('name', 'signup');
    }); 
  }

  toggleUsernameNav() {
    if (this.username.length > 0) {
      $('#userLabel').html(this.username + '  <i class="fas fa-lemon"></i>');
      $('#drop').removeClass('d-none');
      $('#drop').addClass('d-flex');
    } else {
      $('#userLabel').html('<i class="fas fa-sign-in-alt"></i> Login    <i class="fas fa-lemon"></i>');
      $('#userLabel').on('click', () => {
        this.viewLogin();
      });
      $('#drop').addClass('d-none');
      $('#drop').removeClass('d-flex');

    }
  }

  viewLibrary() {
    //ajax request to serve up library.html 
    $.get('/library', function(response) {
      $('#main').html(response).attr('name', 'library');
    }); 
  }

  viewAddBooks() {
    //ajax request to serve up addBooks.html 
    $.get('/addBooks', function(response) {
      $('#main').html(response).attr('name', 'addBooks');
    });
  }

  loggedIn() {
    $('#serverResponse').html('Successfully logged in!').css('color', 'green');
    this.toggleUsernameNav();
    this.viewLibrary();
    this.library.getLibrary(this.viewAddBooks);
  }

  loggedOut() {
    this.toggleUsernameNav();
    this.viewHome('You have successfully logged out!');
  }
}