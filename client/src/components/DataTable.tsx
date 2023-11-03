import Loader from './Loader';
import '../styles/DataTable.module.css'

interface DataTableProps {
	isPending: boolean;
	isError: boolean;
	data: any;
	error: Error | null;
}

const DataTable = ({ isPending, isError, data, error }: DataTableProps) => {
	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <span>Error: {error?.message}</span>;
	}

  console.log(data?.rowValues);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Табличка</th>
					</tr>
				</thead>
				<tbody>
					{data ? (
            data?.rowValues?.map((row: any, index: number) => <tr>
              {/* <td>{index + 1}</td> */}
              {
                row.map((data: any) => <td>{data}</td>)
              }
            </tr>)
						/* data?.rowValues?.map((row: any, index: number) => (
							<tr key={index}>
								{row.map((value: any, index: number) => {
                  <td key={index}>{value}</td>
                })}
							</tr>
						)) */
					) : (
						<tr>
							<td>Выберете поле для поиска</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
