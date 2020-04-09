import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const Header = props => {
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const handleChooseAllClick = () => {
        let isChecked = !isCheckedAll;
        props.checkAllRows(isChecked)
        setIsCheckedAll(isChecked);
    }

    return (
    <HeaderWrapper>
        {!props.disableChooseRows && 
        <CheckBoxWrapper>
                <ChooseRowsCheckBox type="checkbox" checked={isCheckedAll} onClick={handleChooseAllClick} readOnly />
        </CheckBoxWrapper>}
        {props.data.map((column, index) => {
            return (
            <HeaderColumn 
            disableSorting={props.disableSorting}
            disableFilters={props.disableFilters}
            onOpenFilterClicked={props.onOpenFilterClicked}
            isWitoutData={column.props.isWitoutData}
            value={column.props.title}
            key={index}
            index={index}
            filteredList={props.filteredList}
            sortByColumn={(value, isAsc) => {
                !column.props.isWitoutData && props.sortByColumn(value, isAsc);
            }}></HeaderColumn>);
        })}
    </HeaderWrapper>
    );
}

const HeaderColumn = props => {
    const [isAsc, setIsAsc] = useState(true);
    const [isFiltered, setIsFiltered] = useState(false);

    
	useEffect(() => {
		setIsFiltered(props.filteredList.includes(props.value));
	}, [props.filteredList, props.value]);

    const handleSortClicked = () => {
        let orderByFlag = !isAsc;
        setIsAsc(orderByFlag);
        props.sortByColumn(props.value, orderByFlag);
    }

    const onFilterValueClickHandler = () => {
        if(!isFiltered){
            props.onOpenFilterClicked(props.value);
            setIsFiltered(!isFiltered);
        }
    }

    return(
    <HeaderColumnWrapper key={props.index} isWitoutData={props.isWitoutData}>
        <HeaderValueWrapper >
            {props.value}
            {!props.isWitoutData && !props.disableFilters && <FilterButton isFiltered={isFiltered} onClick={onFilterValueClickHandler}>🝖</FilterButton>}
            {props.isWitoutData || props.disableSorting ? null : isAsc ? 
            <BottomSortArrow disableFilters={props.disableFilters} onClick={handleSortClicked} /> :
            <TopSortArrow disableFilters={props.disableFilters} onClick={handleSortClicked} />}
        </HeaderValueWrapper>
    </HeaderColumnWrapper>
    )
}

const CheckBoxWrapper = styled.div`
    position: relative;
    min-height: 46px;
    padding-right: 10px;
    padding-left: 10px;
    align-items: center;
    display:flex;
`;

const ChooseRowsCheckBox = styled.input`
    padding-right: 15px;
	padding-left: 15px;
`;

const FilterButton = styled.div`
    font-size: 18px;
    opacity: 0;
    margin-bottom: 0.2rem;
    margin-left: 0.35rem;
    color: ${props => props.isFiltered ? "#ce7c00" : "#4f4f4f"};
    -webkit-transition: .25s linear all;
    transition: .25s linear all;
    margin-left: auto;
    cursor: pointer;

    &:hover{
        color: ${props => props.isFiltered ? "#ff9900" : "black"};
    }
`;

const TopSortArrow = styled.div`
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #4f4f4f;
    margin-bottom: 0.45rem;
    opacity: 0;
    transition: .25s linear all;
    margin-left: ${props => props.disableFilters ? "auto" : "0.55rem"};
    cursor: pointer;

    &:hover{
        border-bottom: 9px solid black;
    }
`

const BottomSortArrow = styled.div`
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 9px solid #4f4f4f;
    margin-bottom: 0.55rem;
    opacity: 0;
    transition: .25s linear all;
    margin-left: ${props => props.disableFilters ? "auto" : "0.55rem"};
    cursor: pointer;

    &:hover{
        border-top: 9px solid black;
    }
`

const HeaderColumnWrapper = styled.div`
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
    position: relative;
    width: 100%;
    min-height: 46px;
    padding-right: 15px;
    padding-left: 15px;
    align-items: center;
    display:flex;
    transition: .25s linear background-color;

    &:hover{
        background-color: ${props => props.isWitoutData ? "" : "#eaeaeaab"};
	}
`;

const HeaderValueWrapper = styled.div`
    height: calc(2rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    width: 100%;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    font-weight: bold;

    &:hover ${TopSortArrow} {
        opacity: 1;
    }

    &:hover ${BottomSortArrow} {
        opacity: 1;
    }

    &:hover ${FilterButton} {
        opacity: 1;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-height: 46px;
    transition: .25s linear background-color;
    z-index: 99;
    box-shadow: 0px 3px 5px -2px rgba(0,0,0,0.75);
    align-items: center;
`;

export default Header;
