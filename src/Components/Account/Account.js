import React from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import './css/style.css';
import { Route, Switch } from 'react-router-dom';
const Account = () => {
	return (
		<div className='login'>
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
			</Switch>
		</div>
	);
};

export default Account;
