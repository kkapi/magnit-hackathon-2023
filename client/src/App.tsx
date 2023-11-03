import { useState } from 'react';
import DataTable from './components/DataTable';
import Meta from './components/Meta';
import SearchFields from './components/SearchFields';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const App = () => {
	const [selectedFieldsId, setSelectedFieldsId] = useState<number[]>([]);
	const [searchFieldId, setSearchFieldId] = useState<number | null>(null);

	const { isPending, isError, data, error } = useQuery({
		queryKey: ['table', searchFieldId],
		queryFn: async () => {
			if (!searchFieldId) return null;
			const response = await axios.post(
				'http://localhost:8080/api/v1/olap/get-cube',
				{
					columnFields: [],
					rowFields: [
						{
							fieldId: searchFieldId,
							fieldType: 'REPORT_FIELD',
						},
					],
					metrics: [],
					columnsInterval: {
						from: 0,
						count: 24,
					},
					rowsInterval: {
						from: 0,
						count: 1000,
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
			return response.data.data.rowValues;
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
			{/* <Meta
				selectedFieldsId={selectedFieldsId}
				setSelectedFieldsId={setSelectedFieldsId}
			/> */}

			<SearchFields searchFieldId={searchFieldId} setSearchFieldId={setSearchFieldId}/>

			<DataTable isPending={isPending} isError={isError} data={data} error={error} />
		</div>
	);
};

export default App;
