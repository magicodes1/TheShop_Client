import instance from '../config/Axios';

const subUrl = '/product';

export const productbyCategory = async (categoryName,brandName) => {
    try {
		const response = await instance({ method: 'GET', url: `${subUrl}?categoryName=${categoryName}&brandName=${brandName}`});
		return response;
	} catch (error) {
		return error.response;
	}
}
