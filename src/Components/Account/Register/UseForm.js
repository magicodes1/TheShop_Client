import { useState } from 'react';
import { registerUser } from '../../../Services/AccountService';
import { useHistory } from 'react-router-dom';
const UseForm = (Validate) => {
	const [value, setValue] = useState({
		userName: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState({
		userName: '',
		password: '',
		confirmPassword: '',
		unCompleted: '',
	});

	const [loading, setLoading] = useState(false);

	const history = useHistory();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setValue((pre) => ({ ...pre, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = Validate(value);
		setError((pre) => (pre = errors));

		if (errors.userName || errors.password || errors.confirmPassword) {
			return;
		}
		enrolling();
	};

	const enrolling = async () => {

		setLoading((pre) => (pre = !pre));

		const response = await registerUser('','');
		

		const valueResponse = response ? response.data : null;

		if (valueResponse && valueResponse.success) {
			setValue(
				(pre) =>
					(pre = { ...pre, userName: '', password: '', confirmPassword: '' })
			);
			setLoading((pre) => (pre = !pre));
			history.push('/login');
			return;
		}

		const error = valueResponse && valueResponse.Message;
		setLoading((pre) => (pre = !pre));
		setError((pre) => (pre = { ...pre, unCompleted: error }));
	}
	

	return {
		value,
		handleChange,
		handleSubmit,
		error,
		loading,
	};
};

export default UseForm;
