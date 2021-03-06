import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Header = (props) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const handleChooseAllClick = () => {
    let isChecked = !isCheckedAll;
    props.checkAllRows(isChecked);
    setIsCheckedAll(isChecked);
  };

  return (
    <HeaderWrapper rowMinWidth={props.rowMinWidth}>
      {!props.disableChooseRows && (
        <CheckBoxWrapper>
          <ChooseRowsCheckBox
            type="checkbox"
            checked={isCheckedAll}
            onClick={handleChooseAllClick}
            readOnly
          />
        </CheckBoxWrapper>
      )}
      {props.data.map((column, index) => {
        return (
          <HeaderColumn
            minWidth={column.props.minWidth}
            disableSorting={props.disableSorting}
            disableFilters={props.disableFilters}
            onOpenFilterClicked={props.onOpenFilterClicked}
            isWithoutData={column.props.isWithoutData}
            value={column.props.title}
            key={index}
            index={index}
            filteredList={props.filteredList}
            sortByColumn={(value, isAsc) => {
              !column.props.isWithoutData && props.sortByColumn(value, isAsc);
            }}
          ></HeaderColumn>
        );
      })}
    </HeaderWrapper>
  );
};

const HeaderColumn = (props) => {
  const [isAsc, setIsAsc] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setIsFiltered(props.filteredList.includes(props.value));
  }, [props.filteredList, props.value]);

  const handleSortClicked = () => {
    let orderByFlag = !isAsc;
    setIsAsc(orderByFlag);
    props.sortByColumn(props.value, orderByFlag);
  };

  const onFilterValueClickHandler = () => {
      props.onOpenFilterClicked(props.value, isFiltered);
  };

  return (
    <HeaderColumnWrapper
      key={props.index}
      isWithoutData={props.isWithoutData}
      minWidth={props.minWidth}
      haveActions={!props.disableSorting || !props.disableFilters}
    >
      <HeaderValueWrapper isWithoutData={props.isWithoutData}>
        <ValueWrapper>{props.value}</ValueWrapper>
        {!props.isWithoutData && !props.disableFilters && (
          <FilterButton
            isFiltered={isFiltered}
            onClick={onFilterValueClickHandler}
          >
            🝖
          </FilterButton>
        )}
        {props.isWithoutData || props.disableSorting ? null : 
          <SortArrow
            isAsc={isAsc}
            disableFilters={props.disableFilters}
            onClick={handleSortClicked}
          />
        }
      </HeaderValueWrapper>
    </HeaderColumnWrapper>
  );
};

const ValueWrapper = styled.div`
  font-size: 13px;
  transition: 0.25s linear all;
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  min-height: 46px;
  padding-right: 10px;
  padding-left: 10px;
  align-items: center;
  display: flex;
`;

const ChooseRowsCheckBox = styled.input`
  padding-right: 15px;
  padding-left: 15px;
`;

const FilterButton = styled.div`
  font-size: 18px;
  opacity: 0;
  margin-left: 0.35rem;
  color: ${(props) => (props.isFiltered ? "#008000" : "#4f4f4f")};
  -webkit-transition: 0.25s linear all;
  transition: 0.25s linear all;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.isFiltered ? "#00b300" : "black")};
  }
`;

const SortArrow = styled.div`
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 9px solid #4f4f4f;
  margin-bottom: 0.45rem;
  opacity: 0;
  transition: 0.125s linear all;
  margin-left: ${(props) => (props.disableFilters ? "auto" : "0.55rem")};
  cursor: pointer;
  ${(props) => (!props.isAsc ? "transform: rotateX(180deg)" : "")};

  &:hover {
    border-top: 9px solid black;
  }
`;

const HeaderColumnWrapper = styled.div`
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  /*max-width: 100%;*/
  position: relative;
  /*width: 100%;*/
  min-height: 46px;
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
  display: flex;
  transition: 0.25s linear all;
  ${(props) =>
    props.minWidth ? "min-width:" + props.minWidth + ";" : "min-width: 80px;"};

  &:hover {
    background-color: ${(props) => (props.isWithoutData ? "" : "#eaeaeaab")};
  }

  &:hover ${SortArrow} {
    opacity: 1;
  }

  &:hover ${FilterButton} {
    opacity: 1;
  }

  &:hover ${ValueWrapper} {
    ${(props) =>
      props.isWithoutData || !props.haveActions
        ? ""
        : "transform: translate(-25px, -15px); font-size: 12px; position: absolute;"};
  }
`;

const HeaderValueWrapper = styled.div`
  height: calc(2rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  width: 100%;
  transition: all 0.15s ease-in-out;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const HeaderWrapper = styled.div`
  display: flex;
  min-height: 46px;
  transition: 0.25s linear background-color;
  z-index: 99;
  box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
  align-items: center;
  overflow-x: hidden;
  min-width: ${(props) => props.rowMinWidth}px;
  position: sticky;
  top: 0px;
  background-color: white;
`;

export default Header;
