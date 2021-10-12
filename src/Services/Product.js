import instance from '../config/Axios';

const subUrl = '/product';

export const product = async (id) => {
	try {
		const response = await instance({ method: 'GET', url: `${subUrl}/${id}` });
		return response;
	} catch (error) {
		return error.response;
	}
};

export const productByName = async (name) => {
	try {
		const response = await instance({ method: 'GET', url: `${subUrl}/search/${name}` });
		return response;
	} catch (error) {
		return error.response;
	}
};