import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from './components/Loader';

const App = () => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['meta'],
		queryFn: async () => {
			const response = await axios.post(
				'http://localhost:8080/api/v1/report-job/get-metadata',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			return response.data.data.fields;
		},
	});

	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				backgroundColor: 'lightblue',
			}}
		>
			<div>
				{' '}
				{data?.map(
					(item: {
						id: number;
						type: string;
						name: string;
						description: string;
						ordinal: number;
						visible: boolean;
					}) => (
						<div key={item.id}>
							{item.ordinal} {item.name}
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default App;
