import React, { useContext } from 'react';
import './css/style.css';
import { GlobalContext } from '../../../Contexts/TheShopContext';
import Base from '../../../config/Base';
import {Link} from 'react-router-dom'
const Cart = () => {
	const { carts } = useContext(GlobalContext);
	
	const totalPrice = () => {
		let sum = 0;
		for (const item of [...carts.cart]) {
			sum+=(item.productPrice*item.quantity);
		}
		return sum;
	}
	

	return (
		<div className='cart-wrap'>
			<div className='cart-zone'>
				<div className='cart'>
					<div className='head-cart'>
						<h4>cart</h4>
					</div>
					<div className='content-cart'>
						{carts.cart.length > 0 &&
							carts.cart.map((val) => (
								<div className='cart-item' key={val.productId}>
									<img
										src={`${Base.URL}/images/${val.categoryName}/${val.brandName}/${val.image}`}
										width='150'
									/>
									<div className='cart-info'>
										<p>{val.productName}</p>
										<span>$ {val.productPrice}</span>
										<div className='button-group'>
											<button
												style={{ padding: '3px 10px 3px 10px'}}
												onClick={() =>
													carts.cartDispatch({
														type: 'QUANTITY_DECREMENT',
														data: val.productId,
													})
												}
											>
												-
											</button>
											<button style={{ padding: '3px 10px 3px 10px'}}>{val.quantity}</button>
											<button
												style={{ padding: '3px 10px 3px 10px'}}
												onClick={() =>
													carts.cartDispatch({
														type: 'QUANTITY_INCREMENT',
														data: val.productId,
													})
												}
											>
												+
											</button>
										</div>
										<button
											onClick={() =>
												carts.cartDispatch({
													type: 'REMOVE',
													data: val.productId,
												})
											}
											className='remove-cart'
										>
											x
										</button>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<br />
			<div className='confirm-payment'>
				<div className='table-price'>
					<div className='head'>
						<h4>sumary</h4>
					</div>
					<table style={{ width: '100%'}}>
						<tbody>
							<tr>
								<td>Item:</td>
								<td>
									<p align='right'>$ {totalPrice()}</p>
								</td>
							</tr>
							<tr>
								<td>Shipping:</td>
								<td>
									<p align='right'>Free</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p align='right'>$ {totalPrice()}</p>
				{
					totalPrice() > 0
					&& 
					<Link to='/payment'>
						<button id='confirm-cart'>confirm</button>
					</Link>
				}
			</div>
		</div>
	);
};

export default Cart;
