import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface AppProviderProps {
	children?: ReactNode;
}

const queryClient = new QueryClient();

const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default AppProvider;