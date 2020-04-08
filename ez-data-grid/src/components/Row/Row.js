import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

export const Row = (props) => {
	const [IsChecked ,setIsChecked] = useState(props.rowData.IsChecked);
	
	useEffect(()=>{
		setIsChecked(props.rowData.IsChecked);
	}, [props.rowData.IsChecked])

	const handleChooseRowClick = () => {
		props.rowData.IsChecked = !IsChecked;
		setIsChecked(!IsChecked);
	}

	return (<RowWrapper key={props.index} index={props.index}>
				{!props.disableChooseRows && <ChooseRowsCheckBox type="checkbox" checked={IsChecked} onClick={handleChooseRowClick} readOnly/>}
				{props.children.map((column, index) => {
					return (
							<ColumnWrapper key={index} >
								{React.cloneElement(column)}
							</ColumnWrapper>);
				})}
			</RowWrapper>)
}

export class RowData {
	constructor(id){
		this.Id = id;
		this.Columns = [];
		this.Filtered = [];
		this.IsChecked = false;
	}
}

const ChooseRowsCheckBox = styled.input`

`;

const RowWrapper = styled.div`
    display: flex; 
    flex-wrap: wrap;
	align-items: center;
    min-height: 46px;
    transition: .25s linear background-color;
	background-color: ${props => props.index % 2 === 0 ? "rgba(6, 6, 6, 0.05)" : "" };

	&:hover{
		background-color: rgba(211, 211, 211, 0.67);
	}
`;


const ColumnWrapper = styled.div`
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
`;
