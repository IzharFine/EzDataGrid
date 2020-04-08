import React, { useState } from 'react';
import EzGrid, { EzColumn } from './grid/index';
import styled from 'styled-components';

// Grid params:
// data - array of json objects describes your data (JSON object array).
// settings - settings of the grid (JSON object).
// onSearchChanged - on search changed call back, returns the search input value(function).
// onPageChangeHandler - on page navigation call back, returns the page number (function).
// addButtonClickHandel - creates add button above the grid - that event will triger when the button clicked, returns the column titles and ids (function).

// Grid settings:
// disableFilters - disable filters (default enable).
// disableChooseRows - disable choose rows (default enable).
// disableSorting - disable sorting (default enable);

function App() {
    const [accounts, setAccounts] = useState(null);

	if (!accounts) {
		handleFeatchAccounts('posts', setAccounts);
		return <div>Loading Data</div>
	}

	let settings = {
		disableFilters: false,
		disableChooseRows: false,
		disableSorting: false
	}

	return (
	<EzGrid data={accounts} settings={settings} >
		<EzColumn key={"index"} title={"Id"} />
		<EzColumn key={"name"} title={"Name"} />
		<EzColumn key={"gender"} title={"Gender"} />
		<CostumButton key={"custom"} title={"Actions"} isWitoutData />
	</EzGrid>);
}

const CostumButton = props => {
	
	const customClick = (e) => {
		//let rowData = props.parent;
	}

	return (
			<CustomButtonWrapper type="button" onClick={customClick}>
				CLICK
			</CustomButtonWrapper>
	)
}

const handleFeatchAccounts = (data, setAccounts) => {
	fetchAccounts(data)
		// Handle response - parses the response status and content
		.then(response => handleResponse(response))
		.then(([responseOk, data]) => {
			if (responseOk) {
				setAccounts(data);
			} else {
				throw data;
			}
		})
		.catch(error => {
			throw error;
		})
		.finally(() => {});
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


export default App;


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