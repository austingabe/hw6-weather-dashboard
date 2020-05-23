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
            var clear = "Assets/clear.png";
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

            var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function (response) {
                uvIndex.text("UV Index: " + response.value);
            });


            //Click event taking what is written in the textarea and setting it in local storage

            //     var timeBlock = $(this).parent().attr("id");
            //     var writtenPlans = $(this).siblings(".plans").val();
            //     localStorage.setItem(timeBlock, writtenPlans);
            //   })


        });

    });

    $("#cityinput").keypress(function(e) {
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