import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Row = (props) => {
  const [IsChecked, setIsChecked] = useState(props.rowData.IsChecked);

  useEffect(() => {
    setIsChecked(props.rowData.IsChecked);
  }, [props.rowData.IsChecked]);

  const handleChooseRowClick = () => {
    props.rowData.IsChecked = !IsChecked;
    setIsChecked(!IsChecked);
    if (props.onChooseRows) props.onChooseRows(props.rowData);
  };

  return (
    <RowWrapper
      key={props.index}
      index={props.index}
      rowMinWidth={props.rowMinWidth}
      IsChecked={IsChecked}
    >
      {!props.disableChooseRows && (
        <CheckBoxWrapper>
          <ChooseRowsCheckBox
            type="checkbox"
            checked={IsChecked}
            onClick={handleChooseRowClick}
            readOnly
          />
        </CheckBoxWrapper>
      )}
      {props.children.map((column, index) => {
        return (
          <ColumnWrapper key={index} minWidth={column.props.minWidth}>
            {React.cloneElement(column)}
          </ColumnWrapper>
        );
      })}
    </RowWrapper>
  );
};

export class RowData {
  constructor(id) {
    this.Id = id;
    this.Columns = [];
    this.Filtered = [];
    this.IsChecked = false;
  }
}

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

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 46px;
  transition: 0.25s linear background-color;
  background-color: ${(props) =>
    props.IsChecked
      ? "rgba(33,150,243,.3)"
      : props.index % 2 === 0
      ? "rgba(172, 172, 172, 0.05)"
      : ""};
  min-width: ${(props) => props.rowMinWidth}px;
  border-bottom: 1px solid #e2e2e2;

  &:hover {
    background-color: ${(props) =>
      props.IsChecked ? "rgba(33,150,243,.3)" : "rgba(33, 150, 243, .1)"};
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
  ${(props) =>
    props.minWidth ? "min-width:" + props.minWidth + ";" : "min-width: 80px;"};
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
  display: flex;
`;
