import axios from 'axios';

const APIPlugin = (store) => {
	store.http = axios.create({ baseURL: 'http://localhost:3000' });

	store.getData = async function (url) {
		try {
			const response = await this.http.get(`/${url}`);
			return response;
		} catch (error) {
			throw new Error(`There was a problem fetching ${url} from the server`);
		}
	};

	store.postData = async function (url, data) {
		try {
			const response = await this.http.post(`/${url}`, data);
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem posting to ${url}`);
		}
	};

	store.putData = async function (url, data) {
		try {
			const response = await this.http.patch(`/${url}`, data);
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem while updating in ${url}`);
		}
	};

	store.deleteData = async function (url) {
		try {
			const response = await this.http.delete(`/${url}`);
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem deleting an item from ${url}`);
		}
	};
};

export default APIPlugin;
