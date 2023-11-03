import { useState } from 'react';
import DataTable from './components/DataTable';
import Meta from './components/Meta';

const App = () => {
	const [selectedFieldsId, setSelectedFieldsId] = useState<number[]>([]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 30,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'lightblue',
				minHeight: '100vh'
			}}
		>
			<Meta
				selectedFieldsId={selectedFieldsId}
				setSelectedFieldsId={setSelectedFieldsId}
			/>

			<DataTable />
		</div>
	);
};

export default App;
