import React from 'react';
import EzGrid, { EzColumn } from './grid/index';
import { Data } from './MockDataProvider';

function App() {
	return (
	<EzGrid data={Data}  >
		<EzColumn key={"index"} title={"Id"} />
		<EzColumn key={"name"} title={"Name"} />
		<EzColumn key={"gender"} title={"Gender"} />
		<EzColumn key={"company"} title={"Company"} />
	</EzGrid>);
}

export default App;
