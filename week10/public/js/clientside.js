import { User } from "./User.js";
import { ViewController } from "./viewController.js";

//declare User object
let local = '';
if (localStorage.hasOwnProperty('kirjasto.ni.username')) {
  local = JSON.parse(localStorage.getItem('kirjasto.ni.username'));
}

const user = new User(local);
const view = new ViewController();

function signin() {
  user.signIn();
}


//onload, set the username and reveal main content
window.addEventListener("load", () => {
  if (user.username.length > 1) {
    $('#user').html(user.username + '  <i class="fas fa-lemon"></i>').toggleClass("d-none");
  } else {
    $('#user').on('click', () => {
      view.loadLogin();
    })
    .toggleClass("d-none");
  }

  //$('#main').html('testing');
  $('#main').toggleClass("d-none");
  $('#home').on('click', () => {
    view.loadHome();
  });
  $('.viewLibrary').on('click', () => {
    view.loadLibrary();
  });
  $('.addBook').on('click', () => {
    view.loadAddBooks();
  })
   
});

