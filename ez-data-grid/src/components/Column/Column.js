import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Column = (props) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <ValueWrapper title={value.toString()} Type={props.type}>
      {!props.editable ? (
        value.toString()
      ) : (
        <InputWrapper
          type={props.type}
          value={value}
          checked={value.toString().toLowerCase() === "true"}
          onChange={(e) => {
            let currentValue =
              props.type === "checkbox" ? e.target.checked : e.target.value;
            setValue(currentValue);
            props.parent.Columns[props.title].Value = currentValue;
            if (props.onValueChange)
              props.onValueChange(currentValue, props.parent, props.id, value);
          }}
        />
      )}
    </ValueWrapper>
  );
};

export class ColumnData {
  constructor(id, value, index, isWithoutData) {
    this.Id = id;
    this.Value = value;
    this.Index = index;
    this.IsWithoutData = isWithoutData;
  }
}

const InputWrapper = styled.input`
  font-size: 12px;
  line-height: 2.8;
  padding-left: 0.25rem;
  border-radius: 0.25rem;
  width: ${(props) => (props.type === "checkbox" ? "auto" : "100%")};
  transition: all 0.15s ease-in-out;
  background-color: transparent;
  border: none;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;

  &:hover {
    background-color: white;
  }
`;

const ValueWrapper = styled.div`
  height: calc(2rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 12px;
  line-height: 3;
  border-radius: 0.25rem;
  width: 100%;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: transparent;
  border: none;
  white-space: nowrap;
  display: ${(props) => (props.Type === "checkbox" ? "flex" : "block")};
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default Column;
