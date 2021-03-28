import Library from "./Library.js";

export default class ViewController {
  constructor (username) {
    this.username = username;
    this.library = new Library(username);
  }

  viewHome() {
    //ajax request to serve up home.html  
    $.ajax({
      type: 'GET',
      url: "/home", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data).attr('name', 'home');
      }//success data call
      
    });//ajax function call
  }

  viewLogin() {
    //ajax request to serve up login.html  
    $.ajax({
      type: 'GET',
      url: "/login", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data).attr('name', 'login');
      }//success data call
      
    });//ajax function call
  }

  viewLibrary() {
    //ajax request to serve up library.html  
    $.ajax({
      type: 'GET',
      url: "/library", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data).attr('name', 'library');
      }//success data call
      
    });//ajax function call

  }

  viewAddBooks() {
    //ajax request to serve up addBooks.html  
    $.ajax({
      type: 'GET',
      url: "/addBooks", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data).attr('name', 'addBooks');
      }//success data call
      
    });//ajax function call
  }

  getLibrary() {
    this.library.getLibrary();
  }

  makeLibrarySearchable() {
    $('.letter').each().on('click', () => {
      this.library.getLibraryAlphabetical();
    });
  }
  

}