# EZ data-grid


Light easy to use free open source to create custom React data grids. <br/>
Demo: https://izharfine.com/ezdatagrid/

## Installation

```bash
npm install ez-data-grid --save
```

## Usage simple example

```jsx
import React, { useState } from 'react';
import EzGrid, { EzColumn } from 'ez-data-grid';

function Example() {
 	const [mockData, setMockData] = useState([
	    { id: 0, name: "Izhar Fine", gender: "male", company: "home", isActive: true },
	    { id: 1, name: "Tamara Vaisman", gender: "female", company: "mall", isActive: true },
	    { id: 2, name: "Moshe Cohen", gender: "male", company: "renegade", isActive: false }
	]);

	const [settings, setSettings] = useState(
	{
		disableFilters: false,
		disableChooseRows: false,
		disableSorting: false
	});

	return (
	<EzGrid data={mockData} settings={settings} onValueChange={(currentValue, parent, columnId, prevValue) => {
	     // Handle the value change here.
	}}>
	    <EzColumn key={"id"} title={"Id"} />
	    <EzColumn key={"name"} title={"Name"} type={"text"} editable />
	    <EzColumn key={"company"} title={"Company"} type={"text"} editable />
	    <EzColumn key={"isActive"} title={"Active"} type={"checkbox"} editable />
	</EzGrid>);
}

export default Example;
```

# EzGrid 
### Params:

#### data (required)
Array of JSON objects, that will be that data for the grid rows.

#### settings 
JSON object, optional settings for the grid.

#### onSearchChange - event handler
Function call back, triggered on search change - return search input value.

#### onPageChange - event handler
Function call back, triggered on page changed - return page number.

#### onAddButtonClick - event handler
Function call back, creates add button - return column ids + titles.

#### onValueChange - event handler
Function call back, triggered on column value change (on editable mode) - return new value, row parent, column id, previous value.

### Settings(optional):

#### disableFilters
Disable filters feature, default: false.

#### disableChooseRows
Disable multi select feature, default: false.

#### disableSorting
Disable sorting feature, default: false.

## Columns
### Params:

#### key (required) - string
Unique key from your EzGrid data param that describes columns you want to render.

#### title (required) - string
The title you want for the column.

#### isWithoutData - bool
If this column have no data to take from EzGrid data or it`s for custom.

#### editable - bool
If this is editable column, if you use it you must provide the type prop as well.

#### type - string
Set the column type for editable mode. supported types: text, number, checkbox, date.

#### Example of custom button:


```jsx
   ../

const CostumButton = props => {

    const customClick = (e) => {
        let rowData = props.parent;
    }

    return (
    <div onClick={customClick}>
        CLICK
    </div>)
}

 ../

<EzGrid data={mockData} settings={settings}>
    <EzColumn key="id" title="Id"></EzColumn>
    <EzColumn key="gender" title="Gender"></EzColumn>
    <EzColumn key="title" title="Title"></EzColumn>
    <CostumButton key={"custom"} title={"Actions"} isWithoutData />
</EzGrid>

../
```
