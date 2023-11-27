import axios from 'axios';

const APIPlugin = (store) => {
	store.http = axios.create({ baseURL: 'http://localhost:3000' });

	store.getData = async function (url) {
		try {
			const response = await this.http.get(`/${url}`);
			return response.data;
		} catch (error) {
			throw new Error('There was a problem fetching posts from the server');
		}
	};
};

export default APIPlugin;
