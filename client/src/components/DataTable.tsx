import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from './Loader';

const DataTable = () => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['table'],
		queryFn: async () => {
			const response = await axios.post(
				'http://localhost:8080/api/v1/olap/get-cube',
				{
					columnFields: [],
					rowFields: [
						{
							fieldId: 15,
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
						count: 99,
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

	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	console.log(data.map((row: any) => row[0]));

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Название населенного пункта</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row: any) => (
						<div>{row[0]}</div>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
