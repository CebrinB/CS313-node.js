export default class Library {
  constructor (username) {
    this.username = username;
    this.library = [];
  }

  setUsername(username) {
    this.username = username;
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
      placeholder: 'Year - Must be a number'
    }).val(book.year === 0 ? '' : book.year)));

    //append save and cancel buttons
    $('<div/>', { class: 'spacing'})
    .append($('<a/>')
      .on('click', (e) => {
        this.updateBook(book, li);
      })
      .html('<i class="far fa-paper-plane"></i>  Update'))
    .append($('<a/>')
    .on('click', (e) => {
      this.getLibrary();
    })
    .html('<i class="far fa-window-close"></i>  Cancel'))
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
          $('#bookshelf').html('No more books in your library');
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
        .html('<i class="fas fa-book-open pink"></i>'))
      //append span
      .append($('<span/>', {
        class: 'h4'
      })
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
      .append($('<div/>', { class: 'book'})
        .html('Written by ' + author))
      .append($('<div/>', { class: 'book'})
        .html('Published in ' + year))
      .append($('<div/>', { class: 'book'})
        .html('Published by ' + publisher))
      .appendTo('#bookshelf');
     
    }
  }

  getLibrary(one) {
    //ajax request for user's library    
    var localInstance = this;

    var params = {
      user: this.username
    };

    $.get('/getLibrary', params, function(response) {
        console.log('ajax success!', response);
        localInstance.library = response.sort((a, b) => a.title.localeCompare(b.title));
        localInstance.renderLibrary(localInstance.library);
      })
      .fail(function(response) {
        console.log(response);
        $('#bookshelf').text(response.responseJSON.message);
        
        if (response.status === 404) {
          $('<button/>', {
          class: 'd-md-none'
          })
            .on('click', () => {
              one();
            })
            .html('<i class="fas fa-book-reader"></i> Add Books')
            .appendTo($('#bookshelf'));
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
    } else $('#bookshelf').html("No books in your library start with " + letter);
  }

};
