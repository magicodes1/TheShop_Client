const InitialCreate = {
	auth: localStorage.getItem('auth')
		? JSON.parse(localStorage.getItem('auth'))
		: {
				userId: '',
				userName: '',
				token: '',
				isAuth: false,
		  },
	cart: localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [
			
		  ],
};

export default InitialCreate;
