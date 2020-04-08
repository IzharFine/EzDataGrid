# Ez Data Grid


Light easy to use free open source to create custom React data grids.

## Installation

```bash
npm install ez-data-grid --save
```

## Usage simple example

```jsx
import React from 'react';
import EzGrid, { EzColumn } from 'ez-data-grid';

function Example() {
	let mockData = [
		{ id: 0, name: "Izhar Fine", gender: "male", company: "home" },
		{ id: 1, name: "Tamara Vaisman", gender: "female", company: "mall" },
		{ id: 2, name: "Moshe Cohen", gender: "male", company: "renegade" }
	  ]
	  
	  let settings = {
		disableFilters: false,
		disableChooseRows: true,
		disableSorting: false
	  }

	return (
	<EzGrid data={mockData} settings={settings} >
		<EzColumn key={"id"} title={"Id"} />
		<EzColumn key={"name"} title={"Name"} />
		<EzColumn key={"gender"} title={"Gender"} />
		<EzColumn key={"company"} title={"Company"} />
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

#### onSearchChanged - event handler
Function call back, on search change call back - return the search input value.

#### onPageChangeHandler - event handler 
Function call back, on page navigation made - return the page number.

#### addButtonClickHandel - event handler
Function call back, creates add button - return the column ids + titles.

### Settings(optional):

#### disableFilters
Disable filters feature, default: false.

#### disableChooseRows
Disable multi select feature, default: false.

#### disableSorting
Disable sorting feature, default: false.

## Columns
### Params:

#### key (required)
Unique key from your EzGrid data param that describes rows you want to render.

#### title (required)
The title you want for the row.

#### isWitoutData
Describes if this row have data to display from EzGrid data or it`s for custom.

#### Example of custom button:


```jsx
   ../

  const CostumButton = props => {
    const customClick = (e) => {
      let rowData = props.parent;
    }

    return (
        <div type="button" onClick={customClick}>
          CLICK
        </div>
    )
  }

 ../

  <EzGrid data={mockData} settings={settings}>
       <EzColumn key="id" title="Id"></EzColumn>
       <EzColumn key="gender" title="Gender"></EzColumn>
       <EzColumn key="title" title="Title"></EzColumn>
       <CostumButton key={"custom"} title={"Actions"} isWitoutData />
  </EzGrid>

../
```