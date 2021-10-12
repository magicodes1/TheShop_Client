import React, { useContext } from 'react';
import UseFetch from './UseFetch';

import './css/style.css';
import Base from '../../../config/Base';
import { GlobalContext } from '../../../Contexts/TheShopContext';
import { Link } from 'react-router-dom';

const Category = () => {
	const { value, loading } = UseFetch();
	const { carts } = useContext(GlobalContext);

	return loading ? (
		<div className='container-loading'>
			<div
				className='spinner-border text-danger'
				role='status'
				style={{ width: '3rem', height: '3rem' }}
			>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	) : (
		<div className='products'>
			{value.length > 0 &&
				value.map((val) => (
					<div className='custom-card' key={val.productId}>
						<Link to={`/product/${val.productId}`}>
							<img
								src={`${Base.URL}/images/${val.categoryName}/${val.brandName}/${val.image}`}
							/>
							<h3>{val.productName}</h3>
							<p className='price'>${val.productPrice}</p>
						</Link>
						<button
							onClick={() => {
								carts.cartDispatch({
									type: 'ADD',
									data: {
										productId: val.productId,
										productName: val.productName,
										categoryName: val.categoryName,
										brandName: val.brandName,
										productPrice: val.productPrice,
										image: val.image,
										quantity: 1,
									},
								});
							}}
						>
							Add to cart
						</button>
					</div>
				))}
		</div>
	);
};

export default Category;
