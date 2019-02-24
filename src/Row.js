import React from 'react';

function Row(props) {
    let { date, high, low, weather, hottest, coldest } = props
    
    return (<tr>
        <td>{date}</td>
        <td>{weather}</td>
        { 
            (hottest) ? <td className={ "hottest"}>{high} &deg;F</td> : <td >{high} &deg;F</td>
        }
        {
            (coldest)?  <td className={(coldest)?"coldest": ""}>{low} &deg;F</td> : <td>{low} &deg;F</td>
        }
    </tr>)
}

export default Row;