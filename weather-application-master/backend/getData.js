let APIkey = "d0e2c3308a33b8757a2bd698a6dd6752";
var url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${APIkey}`;
const { json } = require("body-parser");
let https = require("https");
let quoteURL = "https://type.fit/api/quotes"

// making URL as per the user input
function getUrl(lat, lon, name) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&q=${name}`;
}


//getting data from openweather server through API using above URL
function getData({ lat, lon, name },callback) {
  let url = getUrl(lat, lon, name);
  console.log("Consolling URL ", url)
  https.get(url, function (res) {
    if(res.statusCode != 200){
      res.on("data",function(data){
       callback({messageError:JSON.parse(data).message,codeError:JSON.parse(data).cod})
       console.log("ERROR FIND")
      })
    }else{
      res.on("data", function (data) {
        let apiRes = JSON.parse(data);
         callback(apiRes)
      });
    }
  });
}



module.exports = {getData};
