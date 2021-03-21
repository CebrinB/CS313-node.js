export class ViewController {
  constructor () {
    
  }

  loadHome() {
    //ajax request to serve up login.html  
    $.ajax({
      type: 'GET',
      url: "/home", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data);
      }//success data call
      
    });//ajax function call
  }

  loadLogin() {
    //ajax request to serve up login.html  
    $.ajax({
      type: 'GET',
      url: "/login", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data);
      }//success data call
      
    });//ajax function call
  }

  loadLibrary() {
    //ajax request to serve up login.html  
    $.ajax({
      type: 'GET',
      url: "/library", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data);
      }//success data call
      
    });//ajax function call
  }

  loadAddBooks() {
    //ajax request to serve up login.html  
    $.ajax({
      type: 'GET',
      url: "/addBooks", 
      success: (data) => {
        //double check that we are getting the right thing
        console.log('ajax success!');
        $('#main').html(data);
      }//success data call
      
    });//ajax function call
  }

}