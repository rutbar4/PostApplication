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

	store.postData = async function (url, name) {
		try {
			console.log("postData");
			const response = await this.http.post(`/${url}`, {
				id: Math.random * 10,
				name: name,
				created_at: new Date().toLocaleDateString(),
				updated_at: new Date().toLocaleDateString(),
			});
			return response.data;
		} catch (error) {
			throw new Error('There was a problem posting an author');
		}
	};
};

export default APIPlugin;
