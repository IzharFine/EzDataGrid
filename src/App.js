import React, { useState } from 'react';
import EzGrid, { EzColumn } from './grid/index';
import styled from 'styled-components';

function App() {
	const [accounts, setAccounts] = useState(null);
	const [settings, setSettings] = useState(
		{
			disableFilters: false,
			disableChooseRows: false,
			disableSorting: false,
			disablePaging: false
		}
	);

	if (!accounts) {
		handleFeatchAccounts('posts', setAccounts);
		return <div>Loading Data</div>
	}

	const CostumButton = props => {
		const customClick = (e) => {
			//let rowData = props.parent;
		}
	
		return (
			<CustomButtonWrapper onClick={customClick}>
				Click
			</CustomButtonWrapper>
		)
	}
	
	
	return (
	<EzGrid data={accounts} settings={settings} onValueChange={(currentValue, parent, columnId, prevValue) => {
		// Handle the value change here.
	}}>
		<EzColumn key={"index"} title={"Id"} />
		<EzColumn key={"name"} title={"Name"} type={"text"} editable />
		<EzColumn key={"company"} title={"Company"} type={"text"} editable />
		<EzColumn key={"email"} title={"Email"} type={"text"} editable />
		<EzColumn key={"isActive"} title={"Active"} type={"checkbox"} editable />
		<CostumButton key={"custom"} title={"Actions"} isWithoutData />
	</EzGrid>);
}

const handleFeatchAccounts = (data, setAccounts) => {
	fetchAccounts(data)
		.then(response => handleResponse(response))
		.then(([responseOk, data]) => {
			if (responseOk) {
				setAccounts(data);
			} else {
				throw data;
			}
		});
};


const fetchAccounts = data => {
  let requestUrl = 'http://localhost:3001/' + data;
	return new Promise(resolve => {
		resolve(
			fetch(requestUrl, {
				method: 'GET',
				'Content-Type': 'application/json'
			})
		);
	});
};

const handleResponse = response => {
  let contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return Promise.all([response.ok, response.json(), response.status, response.statusText]);
  } else {
    return Promise.all([response.ok, response.text(), response.status, response.statusText]);
  }
}

const CustomButtonWrapper = styled.div`
    transition: all linear .2s;
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    background-clip: padding-box;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    cursor: pointer;
    padding: .375rem .75rem;
    font-weight: bold;
    transform: ${props => !props.isOpen ? "scale(1)" : "scale(0)"};

    &:hover{
		background-color: rgba(211, 211, 211, 0.67);
	}
`;

export default App;