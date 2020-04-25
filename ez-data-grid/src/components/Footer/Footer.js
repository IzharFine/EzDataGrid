import React from 'react';
import styled from 'styled-components';

export const Footer = props => {
    let startingRow = props.pageNumber * props.rowsInPage;
    let endingRow = startingRow + props.rowsInPage >= props.rowsToShow.length ?props.rowsToShow.length : startingRow + props.rowsInPage;
    let finalPage = Math.ceil(props.rowsToShow.length / props.rowsInPage);

    const onLeftArrowClick = () => {
        let previousPage = props.pageNumber - 1;
        if(previousPage >= 0)
            props.setPageNumber(previousPage)
    }

    const onRightArrowClick = () => {
        let nextPage = props.pageNumber + 1;
        if(nextPage < finalPage)
            props.setPageNumber(nextPage)
    }

    const onChangePageInputChange = (e) => {
        let requstedPage = e.target.value;
        if(requstedPage > finalPage)
            requstedPage = finalPage;
        else if(requstedPage <= 0)
            requstedPage = 1;
        
        props.setPageNumber(requstedPage - 1);
    }

    const onPagingSelectChange = (e) => {
        let pagingNumber = e.target.value * 1;

        props.setRowsInPage(pagingNumber);
    }

    const pagingOptions = [25, 50, 100];

    return(
    <FooterWrapper>
        <ChangePageWrapper>
            <LeftArrow onClick={onLeftArrowClick} />
            <ChangePageInput type="number" value={props.pageNumber * 1 + 1} onChange={(e) => { onChangePageInputChange(e) }}></ChangePageInput>
            <LastPageSpan>{" / " + finalPage}</LastPageSpan>
            <RightArrow onClick={onRightArrowClick} />
        </ChangePageWrapper>
        <FooterDataWrapper>
            Showing {startingRow + 1} to {endingRow} of {props.rowsToShow.length} entries
        </FooterDataWrapper>
        <PagingSelect onChange={onPagingSelectChange}>
            {pagingOptions.map((pagingNumber)=>{
                return (<PagingOption key={pagingNumber} value={pagingNumber}>{ pagingNumber }</PagingOption>)
            })}
        </PagingSelect>
    </FooterWrapper>)
}

const FooterDataWrapper = styled.span`
  @media (max-width: 470px) {
    display: none;
  }
`;

const PagingOption = styled.option`

`;

const PagingSelect = styled.select`
    padding: .075rem .45rem;
    line-height: 1.5;
    margin-left: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    font-size: 12px;
`;

const LastPageSpan = styled.span`
	display: flex;
	align-items: center;
`;

const LeftArrow = styled.div`
    margin-right: .5rem;
    border-right: 7px solid black;
	width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    cursor: pointer;
    display: inline-block;
`;

const RightArrow = styled.div`
	border-left: 7px solid black;
    margin-left: .5rem;
	width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    cursor: pointer;
    display: inline-block;
`;

const ChangePageWrapper = styled.div`
	display: flex;
    margin-right: .55rem;
    align-items: center;
`;

const ChangePageInput = styled.input`
	width: 50px;
    margin-right: .25rem;
    border: 1px solid dimgrey;
    outline: none;
    padding: .075rem .45rem;
    line-height: 1.5;
    margin-left: 0.25rem;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    font-size: 12px;
`;

const FooterWrapper = styled.div`
	display: flex;
    padding: .5rem .35rem .5rem .35rem;
    min-height: 20px;
    border-top: 1px solid #c8c8c8;
    align-items: center;
    font-size: 12px;
`;

export default Footer;