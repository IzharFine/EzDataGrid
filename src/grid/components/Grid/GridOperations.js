import React from 'react';
import { Row, RowData } from '../Row/Row';
import { ColumnData } from '../Column/Column';
import styled from 'styled-components';

export const adaptRowsData = (data, childrens) => {
    let rowsData = [];

    data.forEach((rowData, rowIndex) => {
        let row = new RowData(rowIndex);
        childrens.forEach((column, columnIndex) => {
            let columnData = new ColumnData(column.props.title, rowData[column.key], columnIndex, column.props.isWithoutData);
            row.Columns[column.props.title] = columnData;
        });
        rowsData.push(row);	
    });

    return rowsData;
};

export const onFilterChanged = (inputValue, columnId, operatorHandler, rows, setPageNumber) => {
    let rowsToShow = [];
    
    if(inputValue){
        rows.forEach(row => {
            let found = false;
            let rowValue = row.Columns[columnId].Value.toString().toLowerCase();

            if(operatorHandler(rowValue, inputValue.trim().toLowerCase())){
                found = true;
            }

            let filterIndex = row.Filtered.indexOf(columnId + "_FILTER");
            if(filterIndex !== -1)
                row.Filtered.splice(filterIndex, 1);
            
            if(!found){
                row.Filtered.push(columnId + "_FILTER");
            }
            else if(!row.Filtered.length){
                rowsToShow.push(row);
            }
        });
    }
    else
        rowsToShow = removeFilter(columnId, rows);

    setPageNumber(0);
    return rowsToShow;
}

export const removeFilter = (columnId, rows) => {
    let rowsToShow = [];

    rows.forEach(row => {
        let filterIndex = row.Filtered.indexOf(columnId + "_FILTER");
        if(filterIndex !== -1)
            row.Filtered.splice(filterIndex, 1);

        if(!row.Filtered.length){
            rowsToShow.push(row);
        }
    });

    return rowsToShow;
}

export const onSearchChange = (element, rows) => {
    let rowsToShow = [];
    let value = element.target.value;
    
    rows.forEach(row => {
        let found = false;

        Object.keys(row.Columns).forEach(columnId => {
            if(!row.Columns[columnId].IsWithoutData &&
                row.Columns[columnId].Value.toString().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1){
                found = true;
                return;
            }
        });

        let filterIndex = row.Filtered.indexOf("SEARCH_FILTER");
        if(filterIndex !== -1)
            row.Filtered.splice(filterIndex, 1);
        
        if(!found){
            row.Filtered.push("SEARCH_FILTER");
        }
        else if(!row.Filtered.length){
            rowsToShow.push(row);
        }
    });

    return rowsToShow;
}

export const sortByColumn = (columnId, isAsc, rowsToShow) => {
    const rowsToSort = [ ...rowsToShow];

    if(isAsc)
        return rowsToSort.sort((a, b) => (a.Columns[columnId].Value > b.Columns[columnId].Value) ? -1 : 1);

    return(
        rowsToSort.sort((a, b) => (a.Columns[columnId].Value > b.Columns[columnId].Value) ? 1 : -1)
    );
}

export const renderRows = (childrens, pageNumber, rowsInPage, rowsToShow, disableChooseRows, onValueChange) => {
    const rowMinWidth = calculateRowMinWidth(childrens.length, disableChooseRows);
    
    let startingRow = pageNumber * rowsInPage;
    let endingRow = startingRow + rowsInPage >= rowsToShow.length ? rowsToShow.length : startingRow + rowsInPage;

    return (!rowsToShow.length ?
        <NoResults>No results</NoResults> :
        rowsToShow.slice(startingRow, endingRow).map((row, rowIndex) => { 
        return (
        <Row index={rowIndex} key={rowIndex} disableChooseRows={disableChooseRows} rowData={row} rowMinWidth={rowMinWidth} >
            {childrens.map(column => {
                return(
                    React.cloneElement(column, {
                        id: column.key,
                        value: row.Columns[column.props.title].Value,
                        parent: row,
                        onValueChange
                    })
                )
            })}
        </Row>);
        })
    );
}

const calculateRowMinWidth = (childrensLength, disableChooseRows) => {
    // Gets the total column width (with padding and margin) - for overflow behavior. 
    // 88 = ColumnWidth
    let rowLength = childrensLength * 88;

    // if disableChooseRows add his total width too.
    if(!disableChooseRows)
        rowLength += 46;
    
    return rowLength;
}

const NoResults = styled.div`
    flex-wrap: wrap;
    min-height: 46px;
    display: flex;
    padding-right: 15px;
    padding-left: 15px;
    align-items: center;
`;