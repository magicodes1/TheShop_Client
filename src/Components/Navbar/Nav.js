import React, { useContext } from 'react';
import './css/style.css';
import UseFetch from './UseFetch';

import { NavLink, Link } from 'react-router-dom';
import Base from '../../config/Base';
import { GlobalContext } from '../../Contexts/TheShopContext';
const Nav = () => {
	const {
		value,
		loading,
		handleClick,
		toggle,
		menu,
		handleClickToggle,
		handleKeyUp,
		product,
		name,
		closeSearch,
		toggleLogout,
		handleLickToggleLogout,
		handleLickLogout,
	} = UseFetch();
	const { auths } = useContext(GlobalContext);
	return (
		<nav id='Nav'>
			<NavLink to='/' id='Nav-logo'>
				<span>the shop</span>
			</NavLink>

			<div className='burger' onClick={handleClickToggle}>
				<div className='line1'></div>
				<div className='line2'></div>
				<div className='line3'></div>
			</div>

			<div className={toggle ? 'middle active' : 'middle unactive'}>
				<ul id='menu'>
					{loading ? (
						<span>....</span>
					) : (
						value.length > 0 &&
						value.map((category) => (
							<li
								key={category.categoryId}
								onClick={() => handleClick(category.categoryId)}
							>
								{category.categoryName}

								{menu.categoryId == category.categoryId && menu.display && (
									<ul id='brand-list'>
										{category.brands.length > 0 &&
											category.brands.map((brand) => (
												<Link
													to={`/${category.categoryName}/${brand.brandName}`}
													key={brand.brandId}
												>
													<li>
														<span>{brand.brandName}</span>
													</li>
												</Link>
											))}
									</ul>
								)}
							</li>
						))
					)}
				</ul>

				<div className='last'>
					<input
						onKeyUp={handleKeyUp}
						className='search'
						type='text'
						placeholder='Search...'
						onChange={handleKeyUp}
						value={name}
					/>

					{auths.auth.userName ? (
						<>
							<span className='text-login' onClick={handleLickToggleLogout}>
								{auths.auth.userName}
							</span>
							{toggleLogout && (
								<p className='logout' onClick={handleLickLogout}>
									logout
								</p>
							)}
						</>
					) : (
						<Link to='/login'>
							<span className='text-login'>login</span>
						</Link>
					)}
				</div>

				<button type='button' className='close' onClick={handleClickToggle}>
					x
				</button>

				{name && (
					<div className='result'>
						{product.map((val) => (
							<Link
								to={`/product/${val.productId}`}
								key={val.productId}
								onClick={closeSearch}
							>
								<div className='Item'>
									<div className='image-zone'>
										<img
											className='img-fluid'
											src={`${Base.URL}/images/${val.categoryName}/${val.brandName}/${val.image}`}
										/>
									</div>
									<div className='info-zone'>
										<h5>{val.productName}</h5>
										<p>by {val.brandName}</p>
										<p>Product type {val.categoryName}</p>
										<p>$ {val.productPrice}</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;
