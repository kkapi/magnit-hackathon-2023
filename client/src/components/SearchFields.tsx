import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import Loader from './Loader';
import styles from '../styles/Meta.module.css';

interface SearchFieldsProps {
	searchFieldId: number | null;
	setSearchFieldId: Dispatch<SetStateAction<number | null>>;
}

const SearchFields = ({
	searchFieldId,
	setSearchFieldId,
}: SearchFieldsProps) => {
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

	const isSelected = (id: number) => {
		return id === searchFieldId;
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
                        onClick={() => searchFieldId === item.id ? setSearchFieldId(null) : setSearchFieldId(item.id) }
					>
						{item.ordinal} {item.name}
					</div>
				)
			)}
		</div>
	);
};

export default SearchFields;
