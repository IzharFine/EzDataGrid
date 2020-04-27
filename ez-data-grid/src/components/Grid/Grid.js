import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import {
  adaptRowsData,
  onFilterChanged,
  onSearchChange,
  sortByColumn,
  renderRows,
  removeFilter,
  calculateRowMinWidth,
} from "./GridOperations";
import Loader from "../Loader/Loader";

const Grid = (props) => {
  const [rows, setRows] = useState(null);
  const [rowsToShow, setRowsToShow] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsInPage, setRowsInPage] = useState(25);
  const [filteredList, setFilteredList] = useState([]);
  const [settings, setSettings] = useState({
    disableFilters: props.settings && props.settings.disableFilters,
    disableChooseRows: props.settings && props.settings.disableChooseRows,
    disableSorting: props.settings && props.settings.disableSorting,
    disablePaging: props.settings && props.settings.disablePaging,
  });

  const initRows = useCallback(() => {
    let rowsData = adaptRowsData(props.data, props.children, rows);
    setPageNumber(0);
    setRows(rowsData);
    setRowsToShow(rowsData);
  }, [props.children, props.data, rows]);

  //#region  Effects

  useEffect(() => {
    initRows();
  }, [props.data]);

  useEffect(() => {
    setSettings(props.settings);
  }, [props.settings]);

  //#endregion

  const checkAllRows = (isChecked) => {
    let rowsToUpdate = [...rowsToShow];

    setRowsToShow(
      rowsToUpdate.map((rowToShow) => {
        rowToShow.IsChecked = isChecked;
        return rowToShow;
      })
    );

    if (props.onChooseRows) props.onChooseRows(rowsToUpdate);
  };

  const onCloseFilterClicked = (filterText) => {
    setFilteredList([
      ...filteredList.filter((filteredText) => filteredText !== filterText),
    ]);
  };

  const onOpenFilterClicked = (filterText) => {
    setFilteredList([...filteredList, filterText]);
  };

  const onSearchChangeHandler = (ele) => {
    if (props.onSearchChange) props.onSearchChange(ele.target.value);
    else {
      let rowsToShow = onSearchChange(ele, rows);
      setPageNumber(0);
      setRowsToShow(rowsToShow);
    }
  };

  const onFilterChangedHandler = (
    value,
    columnId,
    operatorAction,
    operatorEnum
  ) => {
    setRowsToShow(
      onFilterChanged(value, columnId, operatorAction, rows, setPageNumber)
    );
  };

  const onPageChangeHandler = (pageNumber) => {
    if (props.onPageChange) props.onPageChange(pageNumber + 1);
    else {
      setPageNumber(pageNumber);
    }
  };

  if (!props.data) return <div>No data</div>;

  if (!rows) {
    return <Loader />;
  } else {
    let unFilteredColumns = props.children.filter(
      (columns) => !columns.props.isWithoutData
    );
    let unfilteredColumnsTitles = unFilteredColumns.map(
      (column) => column.props.title
    );
    let unfilteredColumnsIds = unFilteredColumns.map((column) => column.key);
    let rowMinWidth = calculateRowMinWidth(
      props.children,
      settings && settings.disableChooseRows
    );
    let enablePaging = !settings || !settings.disablePaging;

    return (
      <GridWrapper maxHeight={props.settings && props.settings.maxHeight}>
        {
          // Filters wrapper includes: search bar, filter labels, add button.
          (!settings || !settings.disableFilters) && (
            <Filters
              onSearchChange={onSearchChangeHandler}
              onFilterChanged={onFilterChangedHandler}
              columnTitles={unfilteredColumnsTitles}
              columnIds={unfilteredColumnsIds}
              rows={rows}
              removeFilter={(filterText) => {
                setRowsToShow(removeFilter(filterText, rows));
              }}
              onCloseFilterClicked={onCloseFilterClicked}
              filteredList={filteredList}
              onAddButtonClick={props.onAddButtonClick}
            ></Filters>
          )
        }
        <RowsWrapper>
          <Header
            rowMinWidth={rowMinWidth}
            filteredList={filteredList}
            disableFilters={settings && settings.disableFilters}
            disableSorting={settings && settings.disableSorting}
            checkAllRows={checkAllRows}
            data={props.children}
            disableChooseRows={settings && settings.disableChooseRows}
            onOpenFilterClicked={onOpenFilterClicked}
            sortByColumn={(value, isAsc) => {
              let sortedRowsToShow = sortByColumn(value, isAsc, rowsToShow);
              setRowsToShow(sortedRowsToShow);
            }}
          ></Header>
          {renderRows(
            props.children,
            pageNumber,
            enablePaging ? rowsInPage : rowsToShow.length,
            rowsToShow,
            settings && settings.disableChooseRows,
            props.onValueChange,
            rowMinWidth,
            props.onChooseRows
          )}
        </RowsWrapper>
        {enablePaging && (
          <Footer
            setRowsInPage={setRowsInPage}
            rowsToShow={rowsToShow}
            setPageNumber={onPageChangeHandler}
            pageNumber={pageNumber}
            rowsInPage={rowsInPage}
            rows={rows}
          />
        )}
      </GridWrapper>
    );
  }
};

const RowsWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const GridWrapper = styled.div`
  display: flex;
  flex-flow: column;
  font-family: Roboto, sans-serif;
  height: 100%;
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "736px")};
`;

export default Grid;
