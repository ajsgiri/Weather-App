import React from 'react';
import Row from './Row.js'
import TableHead from './TableHead.js'

class Example2 extends React.Component {
    constructor() {
        super();
        this.state = {
            days: [{
                key: 0,  // identifier from api
                dateNumeric: 0,  // Unix value of date
                date: "",   // parsed date formated as "Oct 30, 2018"
                temp: {
                    max: 0,
                    min: 0
                },
                weather: ""
            }],
            currentSort: "dateNumeric",
            sortbyInc: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=MountainView&mode=json&units=metric&cnt=14&appid=fe030802c952154e6262bcaeb94017a0").then(
            response => { return response.json() }).then((response) => {
                return this.setState({
                    days: response.list.map((day, index) => {
                        return {
                            key: index,
                            dateNumeric: day.dt,
                            date: formatDate(day.dt),
                            high: day.temp.max,
                            low: day.temp.min,
                            weather: formatWeather(day.weather)
                        }
                    })
                })
            })
    }

    handleClick(event) {
        let order = this.state.sortbyInc;
        let value = event.target.getAttribute('value')

        // sort list of days according to selected property
        // dates are sorted numerically in the Unix format initially supplied by api
        this.setState((prevState) => ({
            days: prevState.days.sort((a, b) => (order) ? b[value] - a[value] : a[value] - b[value]),
            sortbyInc: !prevState.sortbyInc,
            currentSort: value,
        }));

    }

    render() {

        // format list of days into table data
        let rows = this.state.days.map(entry => {
            return <Row key={entry.key} date={entry.date} weather={entry.weather} high={entry.high} low={entry.low} />
        })

        return (
            <div className="example-2">
                <h2>Example 2</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <TableHead value="dateNumeric" handleClick={this.handleClick} text="Date" 
                                selectionStatus={this.state.currentSort} sortbyInc={this.state.sortbyInc} />

                            <th>Weather</th>

                            <TableHead value="high" handleClick={this.handleClick} text="High Temperature"
                                selectionStatus={this.state.currentSort} sortbyInc={this.state.sortbyInc} />

                            <TableHead value="low" handleClick={this.handleClick} text="Low Temperature"
                                selectionStatus={this.state.currentSort} sortbyInc={this.state.sortbyInc} />
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

            </div>
        );
    }
}

// functions are identical between examples but are duplicated for readability purposes
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

export default Example2;
