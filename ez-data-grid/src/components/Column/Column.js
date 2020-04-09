import React from 'react';
import styled from 'styled-components'

export const Column = props => {
    return (
            <ValueWrapper title={props.value}>
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
    line-height: 2.25;
    border-radius: .25rem;
    width: 100%;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    background-color: transparent;
    border: none;
    white-space: nowrap;
    display: block;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export default Column;
