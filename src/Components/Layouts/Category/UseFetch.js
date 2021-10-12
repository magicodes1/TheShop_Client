import { useState, useEffect } from 'react';
import { productbyCategory } from '../../../Services/CategoryService';
import { useParams } from 'react-router-dom';

const UseFetch = () => {
	const [value, setvalue] = useState([]);
	const [loading, setloading] = useState(false);

	const { category, brand } = useParams();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) fetchData();
		return () => (isMounted = false);
	}, [category, brand]);

	async function fetchData() {

		setloading((pre) => (pre = !pre));

		const response = await productbyCategory(category, brand);

		const data = response ? response.data : null;


		if(data && data.success){
			setvalue((pre) => (pre = [...data.data]));
		}
		else{
			console.log(data);
		}

		setloading((pre) => (pre = !pre));
	}

	return {
		value,
		loading,
	};
};

export default UseFetch;
