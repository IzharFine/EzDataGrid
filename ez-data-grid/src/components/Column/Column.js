import React from 'react';
import styled from 'styled-components'

export const Column = props => {
    return (
            <ValueWrapper>
                {props.value}
            </ValueWrapper>);
}

export class ColumnData {
	constructor(id, value, index, isWithoutData){
        this.Id = id;
        this.Value = value;
        this.Index = index;
        this.IsWithoutData = isWithoutData;
	}
}

const ValueWrapper = styled.div`
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
`;

export default Column;
