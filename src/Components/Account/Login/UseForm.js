import { useState, useContext } from 'react';
import { LoginUser } from '../../../Services/AccountService';

import { GlobalContext } from '../../../Contexts/TheShopContext';

const UseForm = (Validate) => {
	const [value, setValue] = useState({
		userName: '',
		password: '',
	});

	const [error, setError] = useState({
		userName: '',
		password: '',
		uncompleted: '',
	});

	const [loading, setloading] = useState(false);

	const ctx = useContext(GlobalContext);

	const auth = ctx.auths;

	const handleChange = (e) => {
		const { value, name } = e.target;

		setValue((pre) => (pre = { ...pre, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = Validate(value);

		setError((pre) => (pre = errors));

		if (errors.userName || errors.password) {
			return;
		}
		login();
	};

	const login = async () => {

		setloading((pre) => (pre = !pre));

		const response = await LoginUser(value.userName,value.password);

		const valueResponse = response ? response.data : null;

		if (valueResponse && valueResponse.success) {
			setloading((pre) => (pre = !pre));

			setValue((pre) => (pre = { ...pre, userName: '', password: '' }));

			auth.authDispatch({
				type: 'AUTHENTICATION',
				data: {
					userId: valueResponse.user.userId,
					userName: valueResponse.user.userName,
					token: valueResponse.token,
				},
			});
			return;
		}

		const error = valueResponse && valueResponse.Message;
		setloading((pre) => (pre = !pre));
		setError((pre) => (pre = { ...pre, uncompleted: error }));
	}
	

	return {
		value,
		error,
		handleChange,
		handleSubmit,
		loading,
	};
};

export default UseForm;
