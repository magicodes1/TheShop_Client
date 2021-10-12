import React, { useContext } from 'react';
import Footer from './Footer/Footer';
import Nav from './Navbar/Nav';

import Home from './Layouts/Home/Home';
import Category from './Layouts/Category/Category';
import Detail from './Layouts/Detail/Detail';
import Cart from './Layouts/Cart/Cart';
import NotFound from './NotFound/NotFound';
import PrivateRoute from '../Routes/PrivateRoute';
import Payment from './Layouts/Payment/Payment';
import { Route, Switch, Link } from 'react-router-dom';

import { GlobalContext } from '../Contexts/TheShopContext';

function totalCart() {
	const { carts } = useContext(GlobalContext);
	let sum = 0;
	for (const item of [...carts.cart]) {
		sum += item.quantity;
	}
	return sum;
}

const Wrapper = () => {
	const sum = totalCart();
	return (
		<div style={{width:'100%',height:'100vh',display:'block'}}>
			{/*Navbar*/}
			<Nav />
			{/*Content Layout*/}
			<div style={{ display: 'flex'}}>
				<Switch>
					<PrivateRoute path='/payment'>
						<Payment />
					</PrivateRoute>
					<Route path='/cart' component={Cart} />
					<Route path='/product/:id' component={Detail} />
					<Route path='/:category/:brand' component={Category} />
					<Route exact path='/' component={Home} />
					<Route path='*' component={NotFound} />
				</Switch>

				{sum > 0 && (
					<div className='your-cart'>
						<Link to='/cart'>
							<img src='/assets/images/cart.png' />
							<div className='quantity-cart'>{sum}</div>
						</Link>
					</div>
				)}
			</div>
			{/*foot*/}
			<Footer />
		</div>
	);
};

export default Wrapper;
