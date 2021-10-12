import React, { useContext } from 'react';
import Validate from './Validate';
import UseForm from './UseForm';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../../Contexts/TheShopContext';

function getPath() {
	const location = useLocation();

	let { from } = location.state || { from: { pathname: '/' } };

	return from;
}

const Login = () => {
	const path = getPath();

	const { value, error, handleChange, handleSubmit, loading } =
		UseForm(Validate);

	const ctx = useContext(GlobalContext);

	const isAuth = ctx.auths.auth.isAuth;

	if (isAuth) {
		return <Redirect to={path} />;
	}

	return (
		<div className='form-wrapper'>
			<p align='center' className='form-title'>
				login
			</p>
			<form>
				<input
					name='userName'
					type='text'
					className='form-input'
					id='username'
					onChange={handleChange}
					value={value.userName}
					placeholder='User Name'
				/>
				{error.userName && (
					<span className='text-danger'>{error.userName}</span>
				)}
				<input
					name='password'
					type='password'
					className='form-input'
					id='password/'
					onChange={handleChange}
					value={value.password}
					placeholder='Password'
				/>
				{error.password && (
					<span className='text-danger'>{error.password}</span>
				)}

				{error.uncompleted && (
					<span className='text-danger'>{error.uncompleted}</span>
				)}

				<br />
				{loading ? (
					<button className='formbtn' type='button' disabled>
						<span
							className='spinner-border spinner-border-sm'
							role='status'
							aria-hidden='true'
						></span>
						Loading...
					</button>
				) : (
					<button onClick={handleSubmit} type='submit' className='formbtn'>
						Submit
					</button>
				)}
				<br />
				<span>
					if you have not account ?
					<Link to='/register'>
						<span className='Join'>Join us</span>
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
