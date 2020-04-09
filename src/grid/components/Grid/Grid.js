import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import Footer from '../Footer/Footer';
import styled from 'styled-components'
import { adaptRowsData, onFilterChanged, onSearchChanged, sortByColumn, renderRows, removeFilter } from './GridOperations';
import Loader from '../Loader/Loader';

const Grid = props => {
	const [rows, setRows] = useState(null);
	const [rowsToShow, setRowsToShow] = useState(null);
	const [pageNumber, setPageNumber] = useState(0);
	const [rowsInPage, setRowsInPage] = useState(25);
	const [filteredList, setFilteredList] = useState([]);
	const [settings, setSettings] = useState(
		{
			disableFilters: props.settings && props.settings.disableFilters,
			disableChooseRows: props.settings && props.settings.disableChooseRows,
			disableSorting: props.settings && props.settings.disableSorting
		}
	);
	
	const initRows = useCallback(() => {
		let rowsData = adaptRowsData(props.data, props.children, rows);
		setPageNumber(0);
		setRows(rowsData);
		setRowsToShow(rowsData);
	}, [props.children, props.data, rows]);

	useEffect(() => {
		initRows();
	}, [props.data]);

	useEffect(() => {
		setSettings(props.settings);
	}, [props.settings])

	const checkAllRows = (isChecked) => {
		let rowsToUpdate = [...rowsToShow];

		setRowsToShow(rowsToUpdate.map(rowToShow => {
			 rowToShow.IsChecked = isChecked;
			 return rowToShow;
		}))
	}

	const onCloseFilterClicked = (filterText) => {
		setFilteredList([...filteredList.filter(filteredText => filteredText !== filterText)]);
	}

	const onOpenFilterClicked = (filterText) => {
		setFilteredList([ ...filteredList, filterText]);
	}

	const onSearchChangedHandler = ele => {
		if(props.onSearchChanged)
			props.onSearchChanged(ele.target.value);
		else{
			let rowsToShow = onSearchChanged(ele, rows);
			setPageNumber(0);
			setRowsToShow(rowsToShow);
		}
	}

	const onFilterChangedHandler = (value, columnId, operatorAction, operatorEnum) => {
		setRowsToShow(onFilterChanged(value, columnId, operatorAction, rows, setPageNumber));
	}

	const onPageChangeHandler = (pageNumber) => {
		if(props.onPageChangeHandler)
			props.onPageChangeHandler(pageNumber)
		else{
			setPageNumber(pageNumber);
		}
	}

	if (!props.data) 
		return <div>No data</div>;

	if(!rows){
		return <Loader></Loader>;
	}
	else {
		let unFilteredColumns = props.children.filter(columns => !columns.props.isWithoutData);
		let unfilteredColumnsTitles = unFilteredColumns.map(column => column.props.title);
		let unfilteredColumnsIds = unFilteredColumns.map(column => column.key);
								   
		return (
		<GridWrapper>
			{	// Filters wrapper includes: search bar, filter labels, add button.
				(!settings || (settings && !settings.disableFilters)) &&
				<Filters
					onSearchChanged={onSearchChangedHandler} 
					onFilterChanged={onFilterChangedHandler} 
					columnTitles={unfilteredColumnsTitles} 
					columnIds={unfilteredColumnsIds}
					rows={rows}
					removeFilter={filterText => {
						setRowsToShow(removeFilter(filterText, rows));
					}}
					onCloseFilterClicked={onCloseFilterClicked}
					filteredList={filteredList}
					addButtonClickHandel={props.addButtonClickHandel}
				></Filters>
			}
			<Header filteredList={filteredList}
					disableFilters={settings && settings.disableFilters}
					disableSorting={settings && settings.disableSorting}
					checkAllRows={checkAllRows}
					data={props.children} 
					disableChooseRows={settings && settings.disableChooseRows}
					onOpenFilterClicked={onOpenFilterClicked}
					sortByColumn={(value, isAsc) => {
						let sortedRowsToShow = sortByColumn(value, isAsc, rowsToShow);
						setRowsToShow(sortedRowsToShow);
					}}>
			</Header>
			<RowsWrapper>
				{renderRows(props.children, pageNumber, rowsInPage, rowsToShow, settings && settings.disableChooseRows)}
			</RowsWrapper>
			<Footer setRowsInPage={setRowsInPage}
					rowsToShow={rowsToShow}
					setPageNumber={onPageChangeHandler} 
					pageNumber={pageNumber}
					rowsInPage={rowsInPage}
					rows={rows}/>
		</GridWrapper>);
	}
}

const RowsWrapper = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
`;

const GridWrapper = styled.div`
 	display: flex;
    flex-flow: column;
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
	max-height: 736px;
`;

export default Grid;
