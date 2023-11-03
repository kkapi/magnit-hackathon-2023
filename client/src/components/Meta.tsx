import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import axios from 'axios';
import { useState } from 'react';

const Meta = () => {
	const [selectedFields, setselectedFields] = useState([]);
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
				flexWrap: 'wrap',
				justifyContent: 'start',
				justifyItems: 'center',
				gap: 8,
				paddingLeft: 10,
			}}
		>
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
					<div key={item.id} style={{ border: '1px solid blue', padding: 10 }}>
						{item.ordinal} {item.name}
					</div>
				)
			)}
		</div>
	);
};

export default Meta;
