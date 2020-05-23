$(document).ready(function () {

var cityList = [];

$("#citysubmit").click(function(e) {
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
    }).then(function(response) {
      // Create CODE HERE to Log the queryURL
      console.log(queryURL);
      // Create CODE HERE to log the resulting object
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

      cityDate.text(response.name);
      function ascii (a) { return String.fromCharCode(a); }
      temperature.text("Temperature: " + fahrenheit + ascii(176) + "F");
      humidity.text("Humidity: " + response.main.humidity + "%");
      windSpeed.text("Wind Speed: " + response.wind.speed + " MPH")

      var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

      $.ajax({
          url: uvIndexURL,
          method: "GET"
      }).then(function(response) {
        uvIndex.text("UV Index: " + response.value);
      })

      // Create CODE HERE to dump the temperature content into HTML




        //Click event taking what is written in the textarea and setting it in local storage

//     var timeBlock = $(this).parent().attr("id");
//     var writtenPlans = $(this).siblings(".plans").val();
//     localStorage.setItem(timeBlock, writtenPlans);
//   })


    });

})




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