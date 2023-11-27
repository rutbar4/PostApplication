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

	store.putData = async function (url, name, id) {
		try {
			console.log(`/${url}/${id}`);
			const response = await this.http.patch(`/${url}/${id}`, {
				name: name,
				updated_at: new Date().toLocaleDateString(),
			});
			return response.data;
		} catch (error) {
			throw new Error('There was a problem posting an author');
		}
	};

	store.DeleteData = async function (url, id) {
		try {
			console.log(`/${url}/${id}`);
			const response = await this.http.delete(`/${url}/${id}`);
			return response.data;
		} catch (error) {
			throw new Error('There was a problem deleting an author');
		}
	};
};

export default APIPlugin;
