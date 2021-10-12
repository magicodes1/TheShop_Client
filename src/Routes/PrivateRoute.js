import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GlobalContext } from '../Contexts/TheShopContext';
const PrivateRoute = ({ children, ...rest }) => {
	const ctx = useContext(GlobalContext);
	const isAuth = ctx.auths.auth.isAuth;
	
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					children
				) : (
					<Redirect to={{ pathname: '/login', state: { from: location } }} />
				)
			}
		/>
	);
};

export default PrivateRoute;
