import React from 'react';
import { Row, RowData} from '../Row/Row';
import { ColumnData } from '../Column/Column';
import styled from 'styled-components';

export const adaptRowsData = (data, childrens) => {
    let rowsData = [];

    data.forEach((rowData, rowIndex) => {
        let row = new RowData(rowIndex);
        childrens.forEach((column, columnIndex) => {
            let columnData = new ColumnData(column.props.title, rowData[column.key], columnIndex, column.props.isWitoutData);
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

export const onSearchChanged = (element, rows) => {
    let rowsToShow = [];
    let value = element.target.value;
    
    rows.forEach(row => {
        let found = false;

        Object.keys(row.Columns).forEach(columnId => {
            if(!row.Columns[columnId].IsWitoutData &&
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

export const renderRows = (childrens, pageNumber, rowsInPage, rowsToShow) => {
    let startingRow = pageNumber * rowsInPage;
    let endingRow = startingRow + rowsInPage >= rowsToShow.length ? rowsToShow.length : startingRow + rowsInPage;

    return (!rowsToShow.length ?
        <NoResults>No results</NoResults> :
        rowsToShow.slice(startingRow, endingRow).map((row, rowIndex) => { 
        return (
        <Row index={rowIndex} key={rowIndex}>
            {childrens.map(column => {
                return(
                    React.cloneElement(column, {
                        id: column.key,
                        value: row.Columns[column.props.title].Value,
                        parent: row
                    })
                )
            })}
        </Row>);
        })
    );
}

const NoResults = styled.div`
    flex-wrap: wrap;
    min-height: 46px;
    display: flex;
    padding-right: 15px;
    padding-left: 15px;
    align-items: center;
`;