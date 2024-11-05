/** @format */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import DashboardLayout from './pages/DashboardLayout';
import Account from './pages/Account';
import Profile from './pages/Profile';
import DashboardPage from './pages/DashboardPage';
import Product from './pages/Product';
import AuthFormComponent from './pages/AuthPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Protect from './components/Protect';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Wrapper from './pages/Wrapper';
import InteractiveMap from './pages/InteractiveMap';
import { useMemo } from 'react'; // Import useMemo

const router = createBrowserRouter([
	{
		path: 'login',
		element: <AuthFormComponent />,
	},
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <div className='h-screen'>Home</div>,
			},
		],
	},
	{
		path: 'dashboard',
		element: (
			<Protect>
				<DashboardLayout />
			</Protect>
		),
		children: [
			{
				path: 'account',
				element: <Account />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'home',
				element: <DashboardPage />,
			},
			{
				path: 'product',
				element: <Product />,
			},
			{
				path: 'map',
				element: <InteractiveMap />,
			},
		],
	},
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	const devtools = useMemo(
		() =>
			process.env.NODE_ENV === 'development' ? (
				<div>
					<ReactQueryDevtools initialIsOpen={false} />
				</div>
			) : null,
		[]
	);
	const routerProvider = useMemo(
		() => <RouterProvider router={router} />,
		[router]
	);

	return (
		<QueryClientProvider client={queryClient}>
			{devtools}
			<Wrapper>{routerProvider}</Wrapper>
		</QueryClientProvider>
	);
}

export default App;
