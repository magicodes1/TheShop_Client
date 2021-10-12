import React from 'react';
import './css/style.css';
import UseForm from './UseForm';
import Validate from './Validate';
const Payment = () => {
	const { value, handleChange, handleSubmit, error, loading } =
		UseForm(Validate);

	return (
		<div className='payment'>
			<div className='form-wrapper'>
				<p align='center' className='form-title'>
					payment
				</p>
				<form>
					<input
						name='phone'
						className='form-input'
						placeholder='Phone number'
						onChange={handleChange}
						value={value.phone}
					/>
					{error.phone && <span className='text-danger'>{error.phone}</span>}
					<input
						name='address'
						className='form-input'
						placeholder='Address'
						onChange={handleChange}
						value={value.address}
					/>
					{error.address && (
						<span className='text-danger'>{error.address}</span>
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
						<button onClick={handleSubmit} type='button' className='formbtn'>
							confirm
						</button>
					)}
				</form>
			</div>
		</div>
	);
};

export default Payment;
