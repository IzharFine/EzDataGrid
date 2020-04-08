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
