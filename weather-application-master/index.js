const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const {getData} = require("./backend/getData");
let PORT = 8080;



app.set("view engine", "ejs");  
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req,res){
    res.render("index",{cityName:"Search city weather",city:"City",temp:"",weather:"",speed:"",humidity:"",latitude:"Latitude",longitude:"Longitude",weatherIcon:""})
})
app.post("/",(req,res)=>{
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let cityName = req.body.cityName;
    getData({lat:latitude,lon:longitude,name:cityName},function(data){
        if(data.codeError){
            console.log(data.messageError , data.codeError)
        }else {
            let temp = data.main.temp;
            let weatherCondition = data.weather[0].main;
            let speed = data.wind.speed;
            let humidity = data.main.humidity;
            let cityName = data.name;
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let  wi = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` 
            
            let da = {
                'weatherIcon':wi,
                'cityName':data.name,
                'city':cityName,
                'temp':temp,
                'weather':weatherCondition,
                'speed':speed,
                'humidity':humidity,
                'latitude':lat,'longitude':lon,

            }
            console.log(da.temp)
            res.render("index",da)
        }
    })
})


app.listen(PORT,function (){
    console.log("The Server is up at PORT " + PORT)
})