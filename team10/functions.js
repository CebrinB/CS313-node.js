function getDetails() {
  //get the query params
  personID = document.querySelector('#personID').value;
  
  //double check that we are looking at the right thing
  console.log(personID);
  
  //declare empty data object and fill it with params
  data = {};
  data["personID"] = personID;
  $.ajax({
    type: 'GET',
    url: "/views/pages/getPerson",
    data: data,
    //return data in json format
    dataType: 'json',  
    success: (data) => {
      //double check that we are getting the right thing
      console.log('ajax success!', data);
      
      //fill div with query result
      $('#json').html(data);
    
    }//success data call
  
  });//ajax function call
}