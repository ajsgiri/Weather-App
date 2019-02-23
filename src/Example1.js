import React from "react";

class Example1 extends React.Component {
    constructor() {
        super();
        this.state = {
            location: '',
            today: '',
            weather: '',
            temperature: '',
            humidity: '',
            windspeed: '',
            sunrise: '',
            sunset: '',
        }
        this.formatTime = this.formatTime.bind(this);
    }

    componentDidMount() {
        fetch("//api.openweathermap.org/data/2.5/weather?q=MountainView&units=imperial&appid=fe030802c952154e6262bcaeb94017a0").then(
            response => { return response.json() }).then((response) => {
                return this.setState({
                    location: response.name,
                    today: formatDate(response.dt),
                    weather: formatWeather(response.weather),
                    temperature: response.main.temp,
                    humidity: response.main.humidity,
                    windspeed: response.wind.speed,
                    sunrise: response.sys.sunrise,
                    sunset: response.sys.sunset
                })
            })
    }

    // (formated as "06:27 AM")
    formatTime(timestamp) {
        let date = new Date(timestamp * 1000);
        let dateArray = date.toString().split(' ');
        let timeOnClock = dateArray[4]; //grab time of day in format 00:00:00
        let timeOnClockArr = timeOnClock.split(':')

        let hours = timeOnClockArr[0];
        let ampm = (hours > 12) ? "PM" : "AM"
        let standardHour = hours % 12;  // convert from military time
        if (standardHour < 10) {
            standardHour = "0" + standardHour;
        }
        let formattedTime = standardHour + ":" + timeOnClockArr[1] + " " + ampm;
        return formattedTime;
    }

    render() {
        let sunrise = this.formatTime(this.state.sunrise);
        let sunset = this.formatTime(this.state.sunset);

        return (
            <div>
                <h2>Example 1</h2>
                <p>Location is {this.state.location}</p>
                <p>Date is {this.state.today}</p>
                <p>Weather is {this.state.weather}</p>
                <p>Avg Temperature is {this.state.temperature} &deg;F</p>
                <p>Humidity is {this.state.humidity}%</p>
                <p>Windspeed is {this.state.windspeed}Mph</p>
                <p>Sunrise is {sunrise}</p>
                <p>Sunset is {sunset}</p>
            </div>
        );
    }
}

function formatDate(timestamp) {
    let date = formatTimestamp(timestamp);
    let formattedDate = date[1] + " " + date[2] + ", " + date[3];
    return formattedDate;
    //(formated as "Oct 30, 2018")
}

// parse timestamp from unix, UTC format to Date object
function formatTimestamp(timestamp) {
    let date = new Date(timestamp * 1000);
    let dateArray = date.toString().split(' ');
    return dateArray;
}

// get all descriptions of in array of weather objects
function formatWeather(weatherObj) {
    let weatherArr = Object.values(weatherObj);
    let weatherDescription = weatherArr.map(type => {
        return (type.description);
    })
    return weatherDescription.join(" ");
}

export default Example1;
