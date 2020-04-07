import React from 'react';
import styled from 'styled-components'
import FilteredLabelToActions from './FilteredLabelToActions';

function Filters(props){
    return (<FiltersWrapper>
                <SearchInput placeholder="Search" onChange={props.onSearchChanged}></SearchInput>
                <FiltersButtons 
                    onCloseFilterClicked={props.onCloseFilterClicked}
                    columns={props.columnIds} text={"FILTERS"}
                    onChange={props.onFilterChanged}
                    onRemoveFilter={props.removeFilter}
                    filteredList={props.filteredList} />
            </FiltersWrapper>);
}

const FiltersButtons = props => {
    const onFilterLabelToActionCloseButtonClick = (filterText, filterValue) => {
        if(filterValue){
            props.onRemoveFilter(filterText);
        }

        props.onCloseFilterClicked(filterText);
    }

    return (
            <React.Fragment>
                <FilteredValuesWrapper>
                    {!props.filteredList ? null : (
                        props.filteredList.map(filterText => {
                            return(
                            <FilteredLabelToActions key={filterText} filterText={filterText} onFilterChanged={props.onChange} onCloseButtonClick={onFilterLabelToActionCloseButtonClick}/>
                            );
                        })
                    )}
                </FilteredValuesWrapper>
            </React.Fragment>
        )
}

const FilteredValuesWrapper = styled.div`
    display: flex;
`;

const SearchInput = styled.input`
    display: inline-flex;
    ${props => props.isSmall ? "padding: .15rem" : "padding: .375rem .75rem"};
    line-height: 1.5;
    margin-left: 0.25rem;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    outline: none;
    margin-right: .25rem;
`;

const FiltersWrapper = styled.div`
    padding-bottom: .5rem;
    padding-top: .5rem;
    display: flex;
    min-height: 38px;
    border-bottom: 1px solid #c8c8c8;
`;

export default Filters;
