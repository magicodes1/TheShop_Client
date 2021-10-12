import { useState, useEffect } from 'react';
import { product } from '../../../Services/Product';

import { useParams } from 'react-router-dom';
const UseFetch = () => {
	const [value, setvalue] = useState({});
	const [loading, setloading] = useState(false);
	const [count, setCount] = useState(0);

	const [toggle, setToggle] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			setloading((pre) => (pre = !pre));
			const response = await product(id);
			const data = response ? response.data : null;

			if(data && data.success){
				setvalue((pre) => (pre = data.data));
			}
			else{
				console.log(data);
			}
            setloading((pre) => (pre = !pre));
		};

		if (isMounted) fetchData();

		return () => (isMounted = false);
	}, [id]);



	const increment = () => {
		setCount(pre=>{
			if(pre<10){
				pre=pre+1;
			}
			return pre;
		})
	}
	const decrement = () => {
	
		setCount(pre=>{
			if(pre>0){
				pre=pre-1;
			}
			return pre;
		})
	}

	const handleClick = () => setToggle(pre=>pre=!pre);
	

	return {
		value,
		loading,
		count,
		increment,
		decrement,
		handleClick,
		toggle
	};

	
	
	
};

export default UseFetch;
