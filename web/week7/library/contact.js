

window.addEventListener("load", () => {

    $.ajax({
        type: 'GET',
        url: "../support/loadLocations.php",
        dataType: 'json',
        success:function(data) {
            console.log("Ajax successful!");
            locations = '';
            info = '';
            
            $.each(data, function (index, value) {
                locations += '<li><a type="button">' + this.location_name + '</a></li>';
                info += '<div class="location"><h3>' + this.location_name + '</h3>'
                        + this.address + '</br>'
                        + this.city + ', ' + this.state + ', ' + this.zip + '</br>'
                        + this.location_phone + '</div></br></br>';
            });// END LOOP

            $('#locations').html(locations);
            $('#info').html(info);            
        }
        
    });    
 });

