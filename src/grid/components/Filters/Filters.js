import React from "react";
import styled from "styled-components";
import FilteredLabelToActions from "./FilteredLabelToActions";

function Filters(props) {
  return (
    <FiltersWrapper>
      <SearchInput
        placeholder="Search"
        onChange={props.onSearchChange}
      ></SearchInput>
      <FiltersButtons
        onCloseFilterClicked={props.onCloseFilterClicked}
        onChange={props.onFilterChanged}
        onRemoveFilter={props.removeFilter}
        filteredList={props.filteredList}
      />
      {props.onAddButtonClick && (
        <AddRowButton
          onClick={() =>
            props.onAddButtonClick(props.columnTitles, props.columnIds)
          }
        >
          ADD
        </AddRowButton>
      )}
    </FiltersWrapper>
  );
}

const FiltersButtons = (props) => {
  const onFilterLabelToActionCloseButtonClick = (filterText, filterValue) => {
    if (filterValue) {
      props.onRemoveFilter(filterText);
    }

    props.onCloseFilterClicked(filterText);
  };

  return (
    <React.Fragment>
      <FilteredValuesWrapper>
        {!props.filteredList
          ? null
          : props.filteredList.map((filterText) => {
              return (
                <FilteredLabelToActions
                  key={filterText}
                  filterText={filterText}
                  onFilterChanged={props.onChange}
                  onCloseButtonClick={onFilterLabelToActionCloseButtonClick}
                />
              );
            })}
      </FilteredValuesWrapper>
    </React.Fragment>
  );
};

const AddRowButton = styled.div`
  display: inline-flex;
  padding: 0.375rem 0.9rem;
  line-height: 1.5;
  font-weight: bold;
  font-size: 12px;
  margin-left: auto;
  margin-right: 0.25rem;
  background-color: #efefef;
  background-clip: padding-box;
  border-radius: 0.25rem;
  transition: all linear 0.2s;
  outline: none;
  color: black;
  cursor: pointer;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solid #ced4da;

  &:hover {
    color: #ffffff;
    background-color: #d4d4d4;
  }
`;

const FilteredValuesWrapper = styled.div`
  display: flex;
`;

const SearchInput = styled.input`
  display: inline-flex;
  ${(props) => (props.isSmall ? "padding: .15rem" : "padding: .375rem .75rem")};
  margin-left: 0.25rem;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline: none;
  margin-right: 0.5rem;
  font-size: 12px;
`;

const FiltersWrapper = styled.div`
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  display: flex;
  min-height: 38px;
  border-bottom: 1px solid #c8c8c8;
  overflow-x: auto;

  ::-webkit-scrollbar {
    height: 6px;
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

export default Filters;
