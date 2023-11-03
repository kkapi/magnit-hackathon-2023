import Loader from './Loader';

interface DataTableProps {
	isPending: boolean;
	isError: boolean;
	data: unknown[] | null;
	error: Error | null;
}

const DataTable = ({ isPending, isError, data, error }: DataTableProps) => {
	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <span>Error: {error?.message}</span>;
	}

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Название населенного пункта</th>
					</tr>
				</thead>
				<tbody>
					{data ? (
						data?.map((row: any, index: number) => (
							<tr key={index}>
								<td>{row[0]}</td>
							</tr>
						))
					) : (
						<div>Выберете поле для поиска</div>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
