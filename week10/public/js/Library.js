export default class Library {
  constructor (username) {
    this.username = username;
    this.library = [];
  }

  getBooklist() {
    return this.library;
  }

  showUpdateForm(book, li) {
    //select the book li
    li.classList.add('update');
    $('.update').html($('<div/>')
    
    //append title input  
    .append($('<input/>', {
      class: 'form-control',
      id: 'title',
      placeholder: 'Title'
    }).val(book.title))
    
    //append author input
    .append($('<input/>', {
      class: 'form-control',
      id: 'author',
      placeholder: 'Author'
    }).val(book.name))
    
    //append publisher input
    .append($('<input/>', {
      class: 'form-control',
      id: 'publisher',
      placeholder: 'Publisher'
    }).val(book.publisher))
    
    //append year input
    .append($('<input/>', {
      class: 'form-control',
      id: 'year',
      placeholder: 'Year'
    }).val(book.year === 0 ? '' : book.year)));

    //append save button
    $('<div/>')
    .append($('<a/>')
      .on('click', (e) => {
        this.updateBook(book, li);
      })
      .html('<i class="far fa-check-square"></i>'))
    .append($('<div/>', {
      id: 'serverResponse'
    }))
    .appendTo(li);
  }

  updateBook(book, li) {
    //ajax request to update a book in user's library      
    var string = JSON.stringify(book);

    var params = {
      user: this.username,
      title: $('#title').val(),
      author: $('#author').val(),
      publisher: $('#publisher').val(),
      year: $('#year').val(),
      string
    };

    $.ajax({
      type: 'PUT',
      url: "/updateBook",
      data: params,
      dataType: 'json', 
      success: (response) => {
        //double check that we are getting the right thing
        console.log('update ajax success!', response);
        this.getLibrary();
        $('#serverResponse').html(response.message).css('color', 'green');
      } //success data call
     })
      .fail(function(response) {
        $('#serverResponse').html(response.responseJSON.message).css('color', 'red');
      });//ajax function call
  }

  deleteBook(book, li) {

    var params = {
      user: this.username,
      book: JSON.stringify(book)
    };

    $.ajax({
      type: 'DELETE',
      url: "/deleteBook",
      data: params,
      dataType: 'json', 
      success: (response) => {
        //double check that we are getting the right thing
        console.log('delete ajax success!', response);
        $('#serverResponse').html(response.message).css('color', 'green');
        li.remove();
        if (!$('#bookshelf').children().length) {
          $('#bookshelf').html('No books in your library');
        }
      } //success data call
     })
      .fail(function(response) {
        $('#serverResponse').html(response.responseJSON.message).css('color', 'red');
      });//ajax function call
  }

  renderLibrary(books) {
    $('#bookshelf').html('');

    let localInstance = this;
    let author;
    let publisher;
    let year;

    for (let book of books) {
      //check for missing info
      if (book.name === '') {
        author = '(No Author Listed)'
      } else author = book.name;
      if (!book.publisher) {
        publisher = '(No publisher listed)';
      } else publisher = book.publisher;
      if (book.year === 0) {
        year = '(No year listed)';
      } else year = book.year;

      //create elements to display user's library
      $('<li/>')
      //append pic
      .append($('<a/>')
        .html('<img src="/images/book.jpg" alt="book cover"></img>'))
      //append span
      .append($('<span/>')
        .html(book.title))
      //append edit button
      .append($('<a/>')
        .on('click', (e) => {
          let li = e.target.parentElement.parentElement;
          localInstance.showUpdateForm(book, li);
        })
        .html('<i class="fas fa-pencil-alt"></i>'))
      //append delete button
      .append($('<a/>')
        .on('click', (e) => {
          let li = e.target.parentElement.parentElement;
          localInstance.deleteBook(book, li)
        })
        .html('<i class="far fa-trash-alt"></i>'))
      //append book info
      .append($('<div/>')
        .html('Written by ' + author))
      .append($('<div/>')
        .html('Published in ' + year))
      .append($('<div/>')
        .html('Published by ' + publisher))
      .appendTo('#bookshelf');
     
    }
  }

  getLibrary() {
    //ajax request for user's library    
    var localInstance = this;   
    var params = {
      user: this.username,
    };

    $.get('/getLibrary', params, function(result) {
      if (result) {
        console.log('ajax success!', result);
        if (result.length > 0) {
          localInstance.library = result.sort((a, b) => a.title.localeCompare(b.title));
          localInstance.renderLibrary(localInstance.library);
        }
      }
    });
  }

  addISBN() {
    console.log('add ISBN');
  }

  addManual() {
    console.log('add manual');
    //ajax request to manually add a book to user's library      
    var params = {
      user: this.username,
      title: $('#title').val(),
      author: $('#author').val(),
      publisher: $('#publisher').val(),
      year: $('#year').val()
    };

    $.post("/addBookManual", params, function(result) {
      $('#serverResponse').html(result.message).css('color', 'green');
      $('input').each(function() {
        $(this).val('');
      });
    })
      .fail(function(response) {
        console.log(response);
        $('#serverResponse').html(response.responseJSON.message).css('color', 'red');
      });
  }

  renderLibraryAlphabetical(letter) {
    //filter bookshelf by letter
    let filtered = [];
    
    if (letter === 'All') {
      this.renderLibrary(this.library);
      return;
    }
    
    if (letter === '#') {
      filtered = this.getBooklist().filter(book => Number.isFinite(book.title[0]));
      letter = 'a number';
    } else filtered = this.getBooklist().filter(book => book.title[0] === letter);
    
    console.log('You clicked ' + letter);
    
    if (filtered.length) {
      this.renderLibrary(filtered);
    } else $('#bookshelf').html("No books in your library that start with " + letter);
  }

};
