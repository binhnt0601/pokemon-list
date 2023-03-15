import { Suspense, useEffect } from 'react';

import DashBoard from '../src/pages/Dashboard/index';
import { useLocation, Outlet, Routes, Route } from 'react-router-dom';
import { Loading } from './components/Atoms/Loading';

interface PropType {
	component?: React.FC;
	children?: React.ReactNode | React.ReactElement | null;
	page?: React.ReactNode;
}

const PrivateRoute: React.FC<PropType> = () => {
	return (
		<DashBoard>
			<Outlet />
		</DashBoard>
	);
};

const IndexRoutes = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path={'/'} element={<PrivateRoute />} />
			</Routes>
		</Suspense>
	);
};

export default IndexRoutes;
