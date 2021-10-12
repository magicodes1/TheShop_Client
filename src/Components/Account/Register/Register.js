import React from 'react';
import Validate from './Validate';
import UseForm from './UseForm';
const Register = () => {
	const { value, handleChange, handleSubmit, error, loading } =
		UseForm(Validate);

	return (
		<div className='form-wrapper'>
			<p align='center' className='form-title'>
				register
			</p>

			<form>
				<input
					name='userName'
					type='text'
					className='form-input'
					id='username'
					onChange={handleChange}
					value={value.userName}
					placeholder='User name'
				/>
				{error.userName && (
					<span className='text-danger'>{error.userName}</span>
				)}

				<input
					name='password'
					type='password'
					className='form-input'
					id='password'
					onChange={handleChange}
					value={value.password}
					placeholder='Password'
				/>
				{error.password && (
					<span className='text-danger'>{error.password}</span>
				)}

				<input
					name='confirmPassword'
					onChange={handleChange}
					type='password'
					className='form-input'
					id='confirmPassword'
					value={value.confirmPassword}
					placeholder='Confirm password'
				/>
				{error.confirmPassword && (
					<span className='text-danger'>{error.confirmPassword}</span>
				)}

				{error.unCompleted && (
					<span className='text-danger'>{error.unCompleted}</span>
				)}

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
			</form>
		</div>
	);
};

export default Register;
