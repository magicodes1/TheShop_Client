import { useState, useContext } from 'react';
import { GlobalContext } from '../../../Contexts/TheShopContext';
import { payment } from '../../../Services/CartService';
import { useHistory } from 'react-router-dom';

const UseForm = (Validate) => {
	
	const [value, setvalue] = useState({ phone: '', address: '' });
	const [error, setError] = useState({ phone: '', address: '' });

	const [loading, setLoading] = useState(false);

	const { carts, auths } = useContext(GlobalContext);

	const userId = auths.auth.userId;
	const token = auths.auth.token;

	const history = useHistory();

	function payLoad() {
		let totalPrice = 0;

		[...carts.cart].forEach((val) => {
			totalPrice += val.quantity * val.productPrice;
		});
		
		
		const bill = {
			phoneNumber: value.phone,
			address: value.address,
			dayOfBillExport:new Date(Date.now()),
			totalPrice,
			userId,
		};

		const billDetail = [...carts.cart].map((val) => ({
			productId: val.productId,
			quantity: val.quantity,
			price: val.productPrice,
		}));
		const addToCart =   {
			bill,
			billDetail,
		};
		return addToCart;
	}

	const handleChange = (e) => {
		const { value, name } = e.target;

		setvalue((pre) => (pre = { ...pre, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const error = Validate(value);

		setError((pre) => (pre = { ...error }));

		if (error.phone || error.address) {
			return;
		}

		const addToCart = payLoad();
		
		payProducts(addToCart);
	};

	const payProducts = async (addToCart) => {
		setLoading((pre) => (pre = !pre));
		const response = await payment(token,addToCart);

		const code = response.status;

		if (code == 401 || code == 403) {
			setLoading((pre) => (pre = !pre));
			auths.authDispatch({ type: 'REMOVE_AUTHENTICATION' });
			history.push('/login');
			return;
		}

		const data = response ? response.data : null;

		if (data && !data.success) {
			setLoading((pre) => (pre = !pre));
			console.log(data);
			return;
		}

		setLoading((pre) => (pre = !pre));
		carts.cartDispatch({ type: 'REMOVE_ALL' });
		history.push('/');
	};

	return {
		value,
		handleChange,
		handleSubmit,
		error,
		loading
	};
};

export default UseForm;
