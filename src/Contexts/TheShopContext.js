import React, { createContext, useReducer } from 'react';
import InitialCreate from '../Resource/InitialCreate';
import AuthReducer from '../Reducers/AuthReducer';
import CartReducer from '../Reducers/CartReducer';

export const GlobalContext = createContext(InitialCreate);

const TheShopContext = ({ children }) => {
	
	const [auth, authDispatch] = useReducer(AuthReducer, InitialCreate.auth);
	const [cart, cartDispatch] = useReducer(CartReducer, InitialCreate.cart);

	const val = { auths: { auth, authDispatch }, carts: { cart, cartDispatch } };

	return (
		<GlobalContext.Provider value={val}>{children}</GlobalContext.Provider>
	);
};

export default TheShopContext;
