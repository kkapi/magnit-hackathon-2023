import { useState } from 'react';
import DataTable from './components/DataTable';
import Meta from './components/Meta';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const App = () => {
	const [selectedFieldsId, setSelectedFieldsId] = useState<number[]>([]);
	

	const { isPending, isError, data, error } = useQuery({
		queryKey: ['table', selectedFieldsId],
		queryFn: async () => {
			if (!selectedFieldsId?.length) return null;

			const rowFields = selectedFieldsId.map((item: number) => {
				const res = {
					fieldId: item,
					fieldType: 'REPORT_FIELD',
				}
				return res
			})
			const response = await axios.post(
				'http://localhost:8080/api/v1/olap/get-cube',
				{
					columnFields: [],
					rowFields: rowFields,
					metrics: [],
					columnsInterval: {
						from: 0,
						count: 24,
					},
					rowsInterval: {
						from: 0,
						count: 100,
					},
					filterGroup: {
						childGroups: [],
						filters: [],
						invertResult: false,
						operationType: 'AND',
					},
					metricFilterGroup: {
						childGroups: [],
						filters: [],
						invertResult: false,
						operationType: 'AND',
					},
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			return response.data.data;
		},
	});


	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 30,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'lightblue',
				minHeight: '100vh',
			}}
		>
			<Meta
				selectedFieldsId={selectedFieldsId}
				setSelectedFieldsId={setSelectedFieldsId}
			/>


			<DataTable isPending={isPending} isError={isError} data={data} error={error} />
		</div>
	);
};

export default App;
