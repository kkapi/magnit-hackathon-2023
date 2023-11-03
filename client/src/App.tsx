import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const App = () => {
	const { data } = useQuery({
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

	console.log(data);

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
						<div>
							{item.ordinal} {item.name}
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default App;
