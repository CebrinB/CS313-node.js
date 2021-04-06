import User from "./User.js";
import ViewController from "./viewController.js";

//declare User object
var local = '';
const user = new User(local);
const view = new ViewController(local);

//onload, set the username and reveal main content
window.addEventListener("load", () => {
  
  $.get('/session', function(response) {
    console.log('Retrieved session: ' + response);
    let session = JSON.parse(response);
    if (session.username) {
      console.log('username exists: ' + session.username)
      user.setUsername(session.username);
      view.setUsername(session.username);
    }

    view.toggleUsernameNav();
    $('#userLabel').removeClass('d-none');
 
  });

  $('#page').toggleClass("d-none");
  $('#home').on('click', () => {
    view.viewHome();
  });
  $('.createAccount').on('click', () => {
    view.viewSignup();
  });
  $('.login').on('click', () => {
    view.viewLogin();
  });
  $('.viewLibrary').on('click', () => {
    view.viewLibrary();
    view.library.getLibrary();
  })
  $('.addBook').on('click', () => {
    view.viewAddBooks();
  })
  $('.logout').on('click', () => {
    user.logout(view);
  })
  
  $(document).on('click','.navbar-collapse',function(e) {
    if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' )) {
        $(this).collapse('hide');
    }
  });
});

class ObservableDiv extends HTMLElement {
  // Monitor the 'name' attribute for changes.
  static get observedAttributes() {return ['name']; }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'name') {
      switch (newValue) {
        case 'home': 
          $('.createAccount').on('click', () => {
            view.viewSignup();
          });
          $('.login').on('click', () => {
            view.viewLogin();
          });
          break;
        case 'login':
          $('#signin').on('click', () => {
            user.login(view, 1);
          });
          $('#signup').on('click', () => {
            view.viewSignup();
          });
          break;
        case 'signup':
          $('#createAccount').on('click', () => {
            user.login(view, 2);
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

