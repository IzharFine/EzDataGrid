import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { eFilterOperator } from "../../utils/enums";

export const FilteredLabelToActions = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState(null);
  const [operator, setOperator] = useState(
    eFilterOperator[Object.keys(eFilterOperator)[0]]
  );

  const onFilterActionInputChanged = (e) => {
    let operatorHandler = getOperatorHandler(operator);
    props.onFilterChanged(
      e.target.value,
      props.filterText,
      operatorHandler,
      operator
    );

    setValue(e.target.value);
  };

  const onFilterActionSelectChanged = (e) => {
    let operatorText = e.target.selectedOptions[0].innerText;
    if (value != null) {
      let operatorHandler = getOperatorHandler(operatorText);
      props.onFilterChanged(
        value,
        props.filterText,
        operatorHandler,
        operatorText
      );
    }

    setOperator(operatorText);
  };

  const onCloseButtonClick = (e) => {
    e.stopPropagation();

    props.onCloseButtonClick(props.filterText, value);
  };

  let selectedOption = Object.keys(eFilterOperator).filter((key) => {
    return eFilterOperator[key] === operator;
  });

  return !isClicked ? (
    <FilteredValue
      key={props.filterText}
      onClick={() => setIsClicked(!isClicked)}
      haveFilter={value}
    >
      {props.filterText}
      <RemoveFilterButton onClick={onCloseButtonClick}>X</RemoveFilterButton>
    </FilteredValue>
  ) : (
    <FilteredActionsWrapper>
      <SearchInput
        placeholder={props.filterText}
        onChange={onFilterActionInputChanged}
        isSmall
        value={value || ""}
      ></SearchInput>
      <OperatorSelect
        onChange={onFilterActionSelectChanged}
        defaultValue={selectedOption}
      >
        {Object.keys(eFilterOperator).map((key, keyIndex) => {
          return (
            <OperatorOption key={keyIndex} value={key}>
              {eFilterOperator[key]}
            </OperatorOption>
          );
        })}
      </OperatorSelect>
      <ActionsOkButton onClick={() => setIsClicked(!isClicked)}>
        OK
      </ActionsOkButton>
    </FilteredActionsWrapper>
  );
};

const operatorIsNotEqualToLogic = (value, input) => {
  return value !== input;
};

const operatorIsEqualToLogic = (value, input) => {
  return value === input;
};

const operatorContainsLogic = (value, input) => {
  return value.indexOf(input) !== -1;
};

const operatorStartsWithLogic = (value, input) => {
  return value.indexOf(input) === 0;
};

const operatorEndsWithLogic = (value, input) => {
  return value.endsWith(input);
};

const operatorDoesntContainLogic = (value, input) => {
  return value.indexOf(input) === -1;
};

const getOperatorHandler = (operator) => {
  switch (operator) {
    case eFilterOperator.IS_NOT_EQUAL_TO:
      return operatorIsNotEqualToLogic;
    case eFilterOperator.IS_EQUALE_TO:
      return operatorIsEqualToLogic;
    case eFilterOperator.CONTAINS:
      return operatorContainsLogic;
    case eFilterOperator.STARTS_WITH:
      return operatorStartsWithLogic;
    case eFilterOperator.ENDS_WITH:
      return operatorEndsWithLogic;
    default:
      return operatorDoesntContainLogic;
  }
};

const appear = keyframes`
    from {
        transform: scaleY(0);
    }

    to {
        transform: transform: scaleY(1);
    }
`;

const RemoveFilterButton = styled.div`
  font-size: 10px;
  padding: 0 0.3rem 0 0.3rem;
  background-color: white;
  border-radius: 1rem;
  margin-left: 0.4rem;
  color: black;
  font-weight: bold;
  cursor: pointer;
`;

const ActionsOkButton = styled.div`
  color: white;
  transition: all linear 0.2s;
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 12px;
  background-color: #2858a7;
  background-clip: padding-box;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-weight: bold;
  transform: ${(props) => (!props.isOpen ? "scale(1)" : "scale(0)")};

  &:hover {
    background-color: #2263cf;
  }
`;

const OperatorOption = styled.option``;

const OperatorSelect = styled.select`
  display: inline-flex;
  padding: 0.15rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-left: 0.25rem;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline: none;
  margin-right: 0.25rem;
  font-size: 12px;
`;

const FilteredActionsWrapper = styled.div`
  display: flex;
  padding: 0.15rem;
  animation: ${appear} 0.1s linear;
  background-color: #dadada;
  border-radius: 0.25rem;
  border: 1px solid #d2d2d2;
  margin-left: 0.25rem;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.55);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.55);
`;

const FilteredValue = styled.div`
  display: inline-flex;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  margin-left: 0.25rem;
  background-color: ${(props) => (!props.haveFilter ? "#a02626" : "#45ac20")};
  background-clip: padding-box;
  border-radius: 0.25rem;
  color: white;
  transition: all linear 0.2s;
  outline: none;
  cursor: pointer;
  align-items: center;
  animation: ${appear} 0.1s linear;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.55);
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.55);
  font-size: 12px;

  &:hover {
    background-color: ${(props) => (!props.haveFilter ? "#c71818" : "#49cb1b")};
  }
`;

const SearchInput = styled.input`
  display: inline-flex;
  ${(props) => (props.isSmall ? "padding: .15rem" : "padding: .375rem .75rem")};
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline: none;
  margin-right: 0.25rem;
  font-size: 12px;
`;

export default FilteredLabelToActions;
