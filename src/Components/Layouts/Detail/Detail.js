import React, { useContext } from 'react';
import './css/style.css';
import UseFetch from './UseFetch';

import Base from '../../../config/Base';

import { GlobalContext } from '../../../Contexts/TheShopContext';

const Detail = () => {
	const { value, loading, count, toggle, increment, decrement, handleClick } =
		UseFetch();

	const { carts } = useContext(GlobalContext);


	window.addEventListener('keyup', (e) => {
		if (e.key == 'Escape') {
			handleClick();
		}
	});

	const add2cart = () => {
		if (count <= 0) return;

		carts.cartDispatch({
			type: 'ADD',
			data: {
				productId: value.productId,
				productName: value.productName,
				categoryName: value.categoryName,
				brandName: value.brandName,
				productPrice: value.productPrice,
				image: value.image,
				quantity: count,
			},
		});
	};

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
		<div className='detail-product'>
			{value.productId && (
				<>
					<div className='left'>
						<img
							src={
								value.image
									? `${Base.URL}/images/${value.categoryName}/${value.brandName}/${value.image}`
									: ''
							}
						/>
					</div>
					<div className='right'>
						<h3>{value.productName}</h3>
						<h4>$ {value.productPrice}</h4>
						<div className='button-group'>
							<button onClick={decrement}>-</button>
							<button>{count}</button>
							<button onClick={increment}>+</button>
						</div>
						<p>
							<button className='add2cart' onClick={add2cart}>
								add to cart
							</button>
						</p>
						<p
							className='text-uppercase text-decoration-underline'
							onClick={handleClick}
						>
							View detail
						</p>
					</div>
				</>
			)}
			<div
				className='detail'
				style={{ display: toggle ? 'flex' : 'none' }}
				onClick={handleClick}
			>
				<table id='detail'>
					<tbody>
						<tr>
							<td className='title'>
								<p>cpu</p>
							</td>
							<td>
								<p>{value.cpu}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>gpu</p>
							</td>
							<td>
								<p>{value.gpu}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>screen</p>
							</td>
							<td>
								<p>{value.screen}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>external storage</p>
							</td>
							<td>
								<p>{value.externalStorage}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>storage</p>
							</td>
							<td>
								<p>{value.storage}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>ram</p>
							</td>
							<td>
								<p>{value.ram}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>sim</p>
							</td>
							<td>
								<p>{value.simCard}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>main camera</p>
							</td>
							<td>
								<p>{value.mainCamera}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>front camera</p>
							</td>
							<td>
								<p>{value.frontCamera}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>OS</p>
							</td>
							<td>
								<p>{value.os}</p>
							</td>
						</tr>
						<tr>
							<td className='title'>
								<p>battery</p>
							</td>
							<td>
								<p>{value.battery}</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Detail;
