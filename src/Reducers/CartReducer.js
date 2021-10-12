const CartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD': {
			const product = action.data;

			const cpState = [...state];

			const existProduct = cpState.find(
				(val) => val.productId == product.productId
			);

			existProduct
				? existProduct.quantity < 10 && (existProduct.quantity += product.quantity)
				: cpState.push({
						productId: product.productId,
						productName: product.productName,
						productPrice: product.productPrice,
						image: product.image,
						categoryName: product.categoryName,
						brandName: product.brandName,
						quantity: product.quantity,
				  });
			localStorage.setItem('cart',JSON.stringify(cpState));
			return cpState;
		}
		case 'QUANTITY_INCREMENT':{
			const id = action.data;
			const cpState = [...state];
			const existProduct = cpState.find(p=>p.productId==id);

			existProduct && (existProduct.quantity<10 && (existProduct.quantity+=1));
			localStorage.setItem('cart',JSON.stringify(cpState));
			return cpState;
		}
		case 'QUANTITY_DECREMENT':{
			const id = action.data;
			const cpState = [...state];
			const existProduct = cpState.find(p=>p.productId==id);

			existProduct && (existProduct.quantity>1 && (existProduct.quantity-=1));
			localStorage.setItem('cart',JSON.stringify(cpState));
			return cpState;
		}
		case 'REMOVE': {
			const id = action.data;
			console.log(id);
			const newState = [...state.filter((val) => val.productId != parseInt(id))];
			localStorage.setItem('cart',JSON.stringify(newState));
			return newState;
		}

		case 'REMOVE_ALL':{
			localStorage.setItem('cart',JSON.stringify([]));
			return [];
		}

		default: {
			return state;
		}
	}
};

export default CartReducer;
