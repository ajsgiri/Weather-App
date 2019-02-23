import React from 'react';

function TableHead(props) {
    let { text, handleClick, selectionStatus, sortbyInc, value } = props;

    let directionOfSort = (selectionStatus == value) ? (sortbyInc) ? "Asc." : "Dsc." : "";
    let highlightStatus = (selectionStatus == value) ? "selected column" : "column";
    
    return <th className={highlightStatus} value={value} onClick={handleClick}>
        {text} {directionOfSort}</th>
}

export default TableHead;