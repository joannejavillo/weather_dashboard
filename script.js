// this .on("click") function will trigger the AJAX call
$("#city").on("click", function (event) {

    //event.preventDefault
    event.preventDefault();

    //where we grab the text from the input box
    var cityWeather = $("#city").val();

    //URL

    var queryURL = "api.openweathermap.org/data/2.5/weather?id={city id}&appid={f6fe3d0e6489f66b9ccb2d38e5cdb94b}";
         console.log(queryURL);        

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    $("#cityWeather").text(JSON.stringify(response));

});

});


