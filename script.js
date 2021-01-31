
$(document).ready(function () {

    //this .on("click") function will trigger the AJAX call
    $(".submitBtn").on("click", function (event) {
        event.preventDefault();

        var city = $("#city").val();


        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6fe3d0e6489f66b9ccb2d38e5cdb94b`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
             console.log(response);

            $("#temp").text("Temperature: " + response.main.temp + "K")
            $("#humid").text("Humidity: " + response.main.humidity + "%")
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH")

            //weather icon
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png"
            );
                console.log(weatherIcon);
            $("#icon").empty();

            //UV var index

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var uvIndexURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=f6fe3d0e6489f66b9ccb2d38e5cdb94b`;

            //AJAX - UV

            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function (response) {
                // console.log(response);

                $("#uvIndex").text("UV Index: " + response.value)

                if (response.value > 7) {
                    $("#indicator").removeClass();
                    $("#indicator").addClass("indicator indicator-success");
                }
                else if (response.value > 3 && response.value < 7) {
                    $("#indicator").removeClass()
                    $("#indicator").addClass("indicator indicator-warning");
                }
            })

            // To append

            $("#place-name").text(response.name);
            $("#icon").append(weatherIcon);

            //API for 5 day weather forecast

            var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f6fe3d0e6489f66b9ccb2d38e5cdb94b`;

            var curDate = $('.currentDay');
            //AJAX for 5 day forecast

            $.ajax({
                url: fiveDayForecastURL,
                method: "GET"
            }).then(function (response) {
                //console.log(response);
                $("#forecast").text(JSON.stringify(response.list));
                //console.log(response.list);
                $("#forecast").empty();
                $("#box-1").empty();
                for (var i = 0; i < response.list.length; i++) {
                    //console.log("1");
                    //response.list[i].dt_txt
                    if (response.list[i].dt_txt.includes("00:00:00")) {
                        //console.log(response.list[i]);
                        var day = $("<div>").addClass("forecast-box");
                        var p2 = $("<p>").text(response.list[i].dt_txt);
                        var wIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                        var p = $("<p>").text("Temp: " + response.list[i].main.temp + "K");
                        var p1 = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");

                        day.append(p2);
                        day.append(wIcon);
                        day.append(p);
                        day.append(p1);

                        $("#forecast").append(day);
                    }
                }
            })

            curDate.text(moment().format("dddd, MMMM Do YYYY"));

            //console.log(curDate);

            function clearSearch(){
                $("#city").trigger('reset');
            }
            clearSearch()
        });
    });
})

