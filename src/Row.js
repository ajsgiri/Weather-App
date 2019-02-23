import React from 'react';

function Row(props) {
    let { date, high, low, weather } = props
    return (<tr>
        <td>{date}</td>
        <td>{weather}</td>
        <td>{high} &deg;F</td>
        <td>{low} &deg;F</td>
    </tr>)
}

export default Row;