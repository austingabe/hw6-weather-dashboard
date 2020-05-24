// On DOM load
$(document).ready(function () {
    // Array that every search submission gets pushed to
    var cityList = [];

    // Click event
    $("#citysubmit").click(function (e) {
        var city = $("#cityinput").val();
        e.preventDefault();
        // Pushing every search submission to array
        cityList.push(city);
        console.log(cityList);

        var APIKey = "81f64d799bb0f3ddd00a131881aab23e";
        // Building the URL to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        // AJAX call for weather details
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            var cityDate = $("#citydate");
            var temperature = $("#temperature");
            // Converting Kelvin to Fahrenheit
            var calculation = (response.main.temp - 273.15) * 1.80 + 32;
            var fahrenheit = Math.round(calculation * 10) / 10;
            var humidity = $("#humidity");
            var windSpeed = $("#windspeed");
            var uvIndex = $("#uvindex");
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var main = response.weather[0].main;
            var currentIcon = $("#currenticon");
            var thunderstorm = "Assets/thunderstorm.png";
            var drizzlerain = "Assets/drizzlerain.png";
            var snow = "Assets/snow.png";
            var clear = "Assets/dayclear.png";
            var clouds = "Assets/clouds.png";
            var atmosphere = "Assets/atmosphere.png";

            // Date for the top of the page
            cityDate.text(response.name + " " + moment().format("(MMM Do, YYYY)"));
            function ascii(a) { return String.fromCharCode(a); }
            temperature.text("Temperature: " + fahrenheit + ascii(176) + "F");
            humidity.text("Humidity: " + response.main.humidity + "%");
            windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");

            // Determining which icons will represent current conditions
            if (main == "Thunderstorm") {
                currentIcon.attr({
                    src: thunderstorm,
                    alt: "Thunderstorm"
                });
            } else if (main == "Drizzle") {
                currentIcon.attr({
                    src: drizzlerain,
                    alt: "Drizzle"
                });
            } else if (main == "Rain") {
                currentIcon.attr({
                    src: drizzlerain,
                    alt: "Rain"
                });
            } else if (main == "Snow") {
                currentIcon.attr({
                    src: snow,
                    alt: "Snow"
                });
            } else if (main == "Clear") {
                currentIcon.attr({
                    src: clear,
                    alt: "Clear"
                });
            } else if (main == "Clouds") {
                currentIcon.attr({
                    src: clouds,
                    alt: "Clouds"
                });
            } else {
                currentIcon.attr({
                    src: atmosphere,
                    alt: "Hazy"
                })
            }

            console.log(main);

            var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;

            // Calling for more weather info
            $.ajax({
                url: oneCallURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                // Generating dates for forecast
                var day1Forecast = moment().add(1, "days").format("l");
                var day2Forecast = moment().add(2, "days").format("l");
                var day3Forecast = moment().add(3, "days").format("l");
                var day4Forecast = moment().add(4, "days").format("l");
                var day5Forecast = moment().add(5, "days").format("l");
                // Converting forecast Kelvin to Fahrenheit
                var temp1 = Math.round(((response.daily[1].temp.max - 273.15) * 1.80 + 32) * 10) / 10;
                var temp2 = Math.round(((response.daily[2].temp.max - 273.15) * 1.80 + 32) * 10) / 10;
                var temp3 = Math.round(((response.daily[3].temp.max - 273.15) * 1.80 + 32) * 10) / 10;
                var temp4 = Math.round(((response.daily[4].temp.max - 273.15) * 1.80 + 32) * 10) / 10;
                var temp5 = Math.round(((response.daily[5].temp.max - 273.15) * 1.80 + 32) * 10) / 10;
                var hum1 = response.daily[1].humidity;
                var hum2 = response.daily[2].humidity;
                var hum3 = response.daily[3].humidity;
                var hum4 = response.daily[4].humidity;
                var hum5 = response.daily[5].humidity;
                var icon1 = $("#icon1");
                var icon2 = $("#icon2");
                var icon3 = $("#icon3");
                var icon4 = $("#icon4");
                var icon5 = $("#icon5");

                $("#date1").text(day1Forecast);
                $("#date2").text(day2Forecast);
                $("#date3").text(day3Forecast);
                $("#date4").text(day4Forecast);
                $("#date5").text(day5Forecast);

                $("#temp1").text("Temp: " + temp1 + ascii(176) + "F");
                $("#temp2").text("Temp: " + temp2 + ascii(176) + "F");
                $("#temp3").text("Temp: " + temp3 + ascii(176) + "F");
                $("#temp4").text("Temp: " + temp4 + ascii(176) + "F");
                $("#temp5").text("Temp: " + temp5 + ascii(176) + "F");

                $("#hum1").text("Humidity: " + hum1 + "%");
                $("#hum2").text("Humidity: " + hum2 + "%");
                $("#hum3").text("Humidity: " + hum3 + "%");
                $("#hum4").text("Humidity: " + hum4 + "%");
                $("#hum5").text("Humidity: " + hum5 + "%");

                // Determining icons for forecast cards
                for (var i = 1; i < 6; i++) {
                    var forecastIcons = [icon1, icon2, icon3, icon4, icon5];
                    var dailyCond = response.daily[i].weather[0].main;
                    console.log(dailyCond);

                    if (dailyCond == "Thunderstorm") {
                        forecastIcons[i - 1].attr({
                            src: thunderstorm,
                            alt: "Thunderstorm"
                        });
                    } else if (dailyCond == "Drizzle") {
                        forecastIcons[i - 1].attr({
                            src: drizzlerain,
                            alt: "Drizzle"
                        });
                    } else if (dailyCond == "Rain") {
                        forecastIcons[i - 1].attr({
                            src: drizzlerain,
                            alt: "Rain"
                        });
                    } else if (dailyCond == "Snow") {
                        forecastIcons[i - 1].attr({
                            src: snow,
                            alt: "Snow"
                        });
                    } else if (dailyCond == "Clear") {
                        forecastIcons[i - 1].attr({
                            src: clear,
                            alt: "Clear"
                        });
                    } else if (dailyCond == "Clouds") {
                        forecastIcons[i - 1].attr({
                            src: clouds,
                            alt: "Clouds"
                        });
                    } else {
                        forecastIcons[i - 1].attr({
                            src: atmosphere,
                            alt: "Hazy"
                        })
                    }
                }

                // Appending UV index information and determining which color to display
                var uvNumber = response.current.uvi
                uvIndex.text("UV Index: " + uvNumber);
                if (uvNumber < 3) {
                    uvIndex.attr({
                        class: "alert-success col-md-12 callout"
                    });
                } else if (uvNumber >= 3 && uvNumber < 8) {
                    uvIndex.attr({
                        class: "alert-warning col-md-12 callout"
                    });
                } else {
                    uvIndex.attr({
                        class: "alert-danger col-md-12 callout"
                    });
                }
            })
        });

        var searchHistory = $("ul").attr("id");
        var citySearch = $(this).siblings("#cityinput").val();
        // Search history is set to local storage
        localStorage.setItem(searchHistory, cityList);
        localStorage.setItem("lastsearched", citySearch);
        // Array the dynamically created list elements are pushed to in order to append them after each search
        var showCities = [];

        // Loop to create new list elements and push to array
        for (var i = 0; i < cityList.length; i++) {
            var newCity = $("<li>").text(cityList[i]);
            newCity.attr("class", "list-group-item");
            showCities.push(newCity);
            $("#searchhistory").empty();
        }

        // Appending search history on each search
        $("#searchhistory").append(showCities);


        // On reload, append the last searched
        // var lastSearched = localStorage.getItem("lastsearched");
        // var lastCity = $("<li>").text(lastSearched);
        // lastCity.attr("class", "list-group-item");
        // var reloadCity = $("#searchhistory").append(lastCity);
        // $(window).load(reloadCity);
    });

    // Pressing the enter key functions the same as a click
    $("#cityinput").keypress(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $("#citysubmit").click();
        }
    });

    // Another click event for the side buttons
    // $(".list-group-item").click(function (e) {
    //     e.preventDefault();
    //     $("citysubmit").click();
    // });
})