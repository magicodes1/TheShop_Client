import { useEffect, useState, useContext } from 'react';
import { getNav } from '../../Services/NavService';
import { productByName } from '../../Services/Product';
import {GlobalContext} from '../../Contexts/TheShopContext'
function UseFetch() {
	const [value, setvalue] = useState([]);
	const [loading, setloading] = useState(false);
	const [menu, setMenu] = useState({ categoryId: 0, display: false });
	const [toggle, setToggle] = useState(false);
	const [toggleLogout, setToggleLogout] = useState(false);

	const [name, setName] = useState('');
	const [product, setProduct] = useState([]);

	const {auths} = useContext(GlobalContext);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) dynamicNav();
		return () => (isMounted = false);
	}, []);

	useEffect(() => {
		let isMounted = true;

		if (isMounted && name) searchProduct();

		return () => (isMounted = false);
	}, [name]);

	const dynamicNav = async () => {
		setloading((pre) => (pre = !pre));
		const response = await getNav();

		const data = response ? response.data : null;

		if (data && data.success) {
			setvalue((pre) => (pre = [...data.data]));
		} else {
			console.log(data);
		}
		setloading((pre) => (pre = !pre));
	};

	const handleClick = (categoryId) =>
		setMenu(
			(pre) =>
				(pre = {
					...pre,
					categoryId: categoryId,
					display: pre.categoryId == categoryId ? !pre.display : true,
				})
		);

	const handleClickToggle = () => setToggle((pre) => (pre = !pre));

	const handleKeyUp = (e) => {
		const { value } = e.target;
		setName((pre) => (pre = value));
	};

	const searchProduct = async () => {
		setloading((pre) => (pre = !pre));
		const response = await productByName(name);
		const data = response ? response.data : null;

		if (data && data.success) {
			setProduct((pre) => (pre = [...data.data]));
		}

		setloading((pre) => (pre = !pre));
	};

	const closeSearch = () => {
		setName((pre) => (pre = ''));
		setToggle((pre) => (pre = !pre));
	};

	const handleLickToggleLogout = () => setToggleLogout(pre=>pre=!pre);
	
	const handleLickLogout = () => auths.authDispatch({type:'REMOVE_AUTHENTICATION'});
	

	return {
		value,
		loading,
		handleClick,
		menu,
		toggle,
		handleClickToggle,
		handleKeyUp,
		product,
		name,
		closeSearch,
		toggleLogout,
		handleLickToggleLogout,
		handleLickLogout
	};
}

export default UseFetch;
