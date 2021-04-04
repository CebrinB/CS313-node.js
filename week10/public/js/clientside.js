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
    view.library.getLibrary();
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
            user.login();
          });
          $('#signup').on('click', () => {
            view.viewSignup();
          });
          break;
        case 'signup':
          $('#createAccount').on('click', () => {
            user.createAccount();
            view.library.getLibrary();
          });
          break;
        case 'library':
          $('.letter').on('click', (e) => {
            view.library.renderLibraryAlphabetical(e.target.innerHTML);
          });
          break;
        case 'addBooks':
          $('#selectSearch').on('click', () => {
            $('#manualEntry').addClass("d-none");
            $('#search').removeClass("d-none");
          });
          $('#selectManual').on('click', () => {
            $('#search').addClass("d-none");
            $('#manualEntry').removeClass("d-none");
          });
          $('#searchISBN').on('click', () => {
            $('#keywords').addClass("d-none");
            $('#isbn').removeClass("d-none");
          });
          $('#searchKeyword').on('click', () => {
            $('#isbn').addClass("d-none");
            $('#keywords').removeClass("d-none");
          });
          $('#addISBN').on('click', () => {
            view.library.addISBN();
          });
          $('#addManual').on('click', () => {
            view.library.addManual();
          });
          $('#searchBook').on('click', () => {
            console.log('trigger API call');
          });
          break;
        default:
          break;
      }
      
    }
  }
}

// Define the new element
customElements.define('observable-div', ObservableDiv);

