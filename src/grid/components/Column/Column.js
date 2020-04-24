import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

export const Column = props => {
    const [value, setValue] = useState(props.value);

    useEffect(()=>{
        setValue(props.value);
    }, [props.value]);

    return (
            <ValueWrapper title={value.toString()}>
                {
                    !props.editable ? 
                    value.toString() :
                    <InputWrapper type={props.type} value={value} checked={value.toString().toLowerCase() === "true"} onChange={(e)=> {
                        let currentValue = props.type === "checkbox" ? e.target.checked : e.target.value;
                        setValue(currentValue);
                        props.parent.Columns[props.title].Value = currentValue;
                        if(props.onValueChange)
                            props.onValueChange(currentValue, props.parent, props.id, value);
                    }} />
                }
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

const InputWrapper = styled.input`
    font-size: 1rem;
    line-height: 2;
    padding-left: .25rem;
    border-radius: .25rem;
    width:  ${props => props.type === "checkbox" ? "auto" : "100%" }; 
    transition: all .15s ease-in-out;
    background-color: transparent;
    border: none;
    white-space: nowrap;
    display: block;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    outline: none;

    &:hover{
        background-color: white;
    }
`;

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
