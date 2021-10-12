import instance from '../config/Axios';

const subUrl = '/user';

export const registerUser = async (userName, password) => {
	const role = 'User';
	try {
		const response = await instance({
			method: 'POST',
			url: `${subUrl}/register`,
			data: { userName, password, role },
		});
		return response;
	} catch (error) {
		return error.response;
	}
};

export const LoginUser = async (userName, password) => {
	try {
		const response = await instance({
			method: 'POST',
			url: `${subUrl}/login`,
			data: { userName, password },
		});

		return response;
	} catch (error) {
		return error.response;
	}
};
