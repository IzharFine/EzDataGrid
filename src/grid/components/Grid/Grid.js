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
	const [rowsInPage, setRowsInPage] = useState(props.settings && props.settings.paging ? props.settings.paging : 10);
	const [filteredList, setFilteredList] = useState([]);

	const disableFilters = props.settings && props.settings.disableFilters;
	const disableChooseRows = props.settings && props.settings.disableChooseRows;
	
	//#region Move to operations
	const initRows = useCallback(() => {
		let rowsData = adaptRowsData(props.data, props.children, rows);
		setPageNumber(0);
		setRows(rowsData);
		setRowsToShow(rowsData);
	}, [props.children, props.data, rows]);

	useEffect(() => {
		initRows();
	}, [props.data]);

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
			props.onSearchChanged(ele)
		else{
			let rowsToShow = onSearchChanged(ele, rows);
			setPageNumber(0);
			setRowsToShow(rowsToShow);
		}
	}

	const onFilterChangedHandler = (value, columnId, operatorAction, operatorEnum) => {
		if(props.onFilterChanged)
			props.onFilterChanged(value, columnId, operatorEnum)
		else{
			setRowsToShow(onFilterChanged(value, columnId, operatorAction, rows, setPageNumber))
		}
	}

	const onPageChangeHandler = (pageNumber) => {
		if(props.onPageChangeHandler)
			props.onPageChangeHandler(pageNumber)
		else{
			setPageNumber(pageNumber);
		}
	}
	//#endregion

	if (!props.data) 
		return <div>No data</div>;

	if(!rows){
		initRows();
		return <Loader></Loader>;
	}
	else {
		let unfilteredColumnsIds = props.children.filter(columns => !columns.props.isWitoutData)
								   .map(column => column.props.title);

		return (
		<GridWrapper>
			{	
				!disableFilters &&
				<Filters
				onSearchChanged={onSearchChangedHandler} 
				onFilterChanged={onFilterChangedHandler} 
				columnIds={unfilteredColumnsIds} 
				rows={rows}
				removeFilter={filterText => {
					setRowsToShow(removeFilter(filterText, rows));
				}}
				onCloseFilterClicked={onCloseFilterClicked}
				filteredList={filteredList}
				></Filters>
			}
			<Header filteredList={filteredList}
					checkAllRows={checkAllRows}
					data={props.children} 
					disableChooseRows={disableChooseRows}
					onOpenFilterClicked={onOpenFilterClicked}
					sortByColumn={(value, isAsc) => {
						let sortedRowsToShow = sortByColumn(value, isAsc, rowsToShow);
						setRowsToShow(sortedRowsToShow);
					}}>
			</Header>
			<RowsWrapper>
				{renderRows(props.children, pageNumber, rowsInPage, rowsToShow, disableChooseRows)}
			</RowsWrapper>
			<Footer rowsToShow={rowsToShow}
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
