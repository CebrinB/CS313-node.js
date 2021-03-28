import User from "./User.js";
import ViewController from "./viewController.js";

//declare User object
var local = '';
if (localStorage.hasOwnProperty('kirjasto.ni.username')) {
  local = JSON.parse(localStorage.getItem('kirjasto.ni.username'));
}

const user = new User(local);
const view = new ViewController(local);


//onload, set the username and reveal main content
window.addEventListener("load", () => {
  if (user.username.length > 1) {
    $('#userLabel').html(user.username + '  <i class="fas fa-lemon"></i>').toggleClass("d-none");
  } else {
    $('#userLabel').on('click', () => {
      view.viewLogin();
    })
    .toggleClass("d-none");
  }

  $('#page').toggleClass("d-none");
  $('#home').on('click', () => {
    view.viewHome();
  });
  $('.viewLibrary').on('click', () => {
    view.viewLibrary();
    view.getLibrary();
  });
  $('.addBook').on('click', () => {
    view.viewAddBooks();
  })
   
});

class ObservableDiv extends HTMLElement {
  // Monitor the 'name' attribute for changes.
  static get observedAttributes() {return ['name']; }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'name') {
      switch (newValue) {
        case 'login':
          $('#signin').on('click', () => {
            user.signIn();
          });
          break;
        case 'library':
          break;
        case 'addBooks':
          break;
        default:
          break;
      }
      
    }
  }
}

// Define the new element
customElements.define('observable-div', ObservableDiv);

