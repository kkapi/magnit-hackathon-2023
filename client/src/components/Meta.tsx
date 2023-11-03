import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import axios from 'axios';
import styles from '../styles/Meta.module.css';
import { Dispatch, SetStateAction } from 'react';

interface MetaProps {
	selectedFieldsId: number[];
	setSelectedFieldsId: Dispatch<SetStateAction<number[]>>
}

const Meta = ({ selectedFieldsId, setSelectedFieldsId }: MetaProps) => {
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

	const toggleSelected = (id: number) => {
		if (!selectedFieldsId.includes(id)) {			
			setSelectedFieldsId(prev => [...prev, id]);
		} else {
			const newSelected = selectedFieldsId.filter(item => item != id);
			setSelectedFieldsId(newSelected);
		}
	};

	const isSelected = (id: number) => {
		return selectedFieldsId.includes(id);
	};

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
			
			{data?.map(
				(item: {
					id: number;
					type: string;
					name: string;
					description: string;
					ordinal: number;
					visible: boolean;
				}) => (
					<div
						key={item.id}
						className={isSelected(item.id) ? styles.active : ''}
						style={{ border: '1px solid blue', padding: 10, cursor: 'pointer' }}
						onClick={() => toggleSelected(item.id)}
					>
						{item.ordinal} {item.name}
					</div>
				)
			)}
		</div>
	);
};

export default Meta;
