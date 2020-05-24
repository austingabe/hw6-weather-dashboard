$(document).ready(function () {

    var cityList = [];



    $("#citysubmit").click(function (e) {
        var city = $("#cityinput").val();
        e.preventDefault();
        cityList.push(city);
        console.log(cityList);

        var APIKey = "81f64d799bb0f3ddd00a131881aab23e";

        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        // We then created an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Log the queryURL
            console.log(queryURL);
            // Log the resulting object
            console.log(response);

            var cityDate = $("#citydate");
            var temperature = $("#temperature");
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

            cityDate.text(response.name + " " + moment().format("(MMM Do, YYYY)"));
            function ascii(a) { return String.fromCharCode(a); }
            temperature.text("Temperature: " + fahrenheit + ascii(176) + "F");
            humidity.text("Humidity: " + response.main.humidity + "%");
            windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");

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

            $.ajax({
                url: oneCallURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var day1Forecast = moment().add(1, "days").format("l");
                var day2Forecast = moment().add(2, "days").format("l");
                var day3Forecast = moment().add(3, "days").format("l");
                var day4Forecast = moment().add(4, "days").format("l");
                var day5Forecast = moment().add(5, "days").format("l");
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


                for (var i=1; i < 6; i++) {
                    var forecastIcons = [icon1, icon2, icon3, icon4, icon5];
                    var dailyCond = response.daily[i].weather[0].main;
                    console.log(dailyCond);

                if (dailyCond == "Thunderstorm") {
                    forecastIcons[i-1].attr({
                        src: thunderstorm,
                        alt: "Thunderstorm"
                    });
                } else if (dailyCond == "Drizzle") {
                    forecastIcons[i-1].attr({
                        src: drizzlerain,
                        alt: "Drizzle"
                    });
                } else if (dailyCond == "Rain") {
                    forecastIcons[i-1].attr({
                        src: drizzlerain,
                        alt: "Rain"
                    });
                } else if (dailyCond == "Snow") {
                    forecastIcons[i-1].attr({
                        src: snow,
                        alt: "Snow"
                    });
                } else if (dailyCond == "Clear") {
                    forecastIcons[i-1].attr({
                        src: clear,
                        alt: "Clear"
                    });
                } else if (dailyCond == "Clouds") {
                    forecastIcons[i-1].attr({
                        src: clouds,
                        alt: "Clouds"
                    });
                } else {
                    forecastIcons[i-1].attr({
                        src: atmosphere,
                        alt: "Hazy"
                    })
                }
                }
                


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


        //     })

        // localStorage.setItem()
        //     var timeBlock = $(this).parent().attr("id");
        //     var writtenPlans = $(this).siblings(".plans").val();
        //     localStorage.setItem(timeBlock, writtenPlans);
        //   })

    });

    $("#cityinput").keypress(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $("#citysubmit").click();
        }
    });




})
/* <div id="sixam" class="row time-block">
      <div class="col-sm-1 hour">6 AM</div>

      <!-- Data-identifier in each timeblock used to compare to the current hour in order to generate dynamically-determined past, present, and future background colors for textarea -->

      <textarea class="description col-sm-10 plans" id="six" data-identifier="6"
        placeholder="Start Plan Here"></textarea>
      <button class="col-sm-1 saveBtn"><i class="fas fa-save"></i></button>
    </div> */


//Variables defined in order to compare to current time for dynamically altered textarea background color

// var six = $("#six");
// var sixData = six.data("identifier");


//If, else if statements to append the appropriate class for textarea background color
// if (sixData < moment().hour()) {
//     six.addClass("past");
//   } else if (sixData > moment().hour()) {
//     six.addClass("future");
//   } else if (sixData == moment().hour()) {
//     six.addClass("present");
//   }





  //Value functions getting the values from local storage to show in textarea even upon refresh until the text is altered

// $("#sixam .plans").val(localStorage.getItem("sixam"));