import instance from '../config/Axios';

const subUrl = '/nav';

export const getNav = async () => {
	try {
		const response = await instance({ method: 'GET', url: `${subUrl}` });
		return response;
	} catch (error) {
		return error.response;
	}
};
