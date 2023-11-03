import DataTable from './components/DataTable';
import Meta from './components/Meta';

const App = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 30,
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				backgroundColor: 'lightblue',
			}}
		>
			<Meta />
			<DataTable />
		</div>
	);
};

export default App;
