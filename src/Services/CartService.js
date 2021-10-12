import instance from '../config/Axios';

const subUrl = '/cart';

export const payment = async (token,addToCart) => {
	try {
		const response = await instance({
			method: 'POST',
			url: `${subUrl}`,
			headers: { Authorization: `Bearer ${token}` },
			data: addToCart,
		});
		return response;
	} catch (error) {
		return error.response;
	}
};
