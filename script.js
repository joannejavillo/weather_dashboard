$(document).ready(function () {

    // this .on("click") function will trigger the AJAX call
    $(".submitBtn").on("click", function (event) {
        event.preventDefault();

        var city = $("#city").val();

        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6fe3d0e6489f66b9ccb2d38e5cdb94b`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $("#temp").text("Temperature: " + response.main.temp)
            $("#humid").text("Humidity: " + response.main.humidity)
            $("#windSpeed").text("Wind Speed: " + response.wind.speed)

            //UV index var

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var uvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=f6fe3d0e6489f66b9ccb2d38e5cdb94b`;

            //$.ajax -> UV

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

            $("#uvIndex").text("UV Index: " + response.value)



                //$.ajax -> Forecast
            });
        });
    });
});
