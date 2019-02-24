import React from 'react';

function Row(props) {
    let { date, high, low, weather, hottest, coldest } = props
    return (<tr>
        <td>{date}</td>
        <td>{weather}</td>
        <td className={(hottest && "hottest")}>{high} &deg;F</td>
        <td className={(coldest && "coldest")}>{low} &deg;F</td>
    </tr>)
}

export default Row;