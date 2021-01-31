
$(document).ready(function () {

    //this .on("click") fundtion will trigger the AJAX call
    $(".submitBtn").on("click", function (event) {
        event.preventDefault();

        var city = $("#city").val();

        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6fe3d0e6489f66b9ccb2d38e5cdb94b`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            $("#temp").text("Temperature: " + response.main.temp + "°F")
            $("#humid").text("Humidity: " + response.main.humidity + "%")
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH")

            //weather icon
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
            );

            $("#icon").empty();

            //UV var index

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var uvIndexURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=f6fe3d0e6489f66b9ccb2d38e5cdb94b`;

            //AJAX - UV

            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                $("#uvIndex").text("UV Index: " + response.value)

                if (response.value > 7) {
                    $("#indicator").removeClass();
                    $("#indicator").addClass("indicator indicator-success");
                }
                else if (response.value > 3 && response.value < 7){
                    $("#indicator").removeClass()
                    $("#indicator").addClass("indicator indicator-warning");
                }
            })

            // To append

            $("#place-name").text(response.name);
            $("#icon").append(weatherIcon);


        });
    });
});