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
				name: name
					.toLowerCase()
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '),
				created_at: new Date()
					.toLocaleDateString('ko-KR')
					.replaceAll('. ', '-')
					.slice(0, 10),
				updated_at: new Date()
					.toLocaleDateString('ko-KR')
					.replaceAll('. ', '-')
					.slice(0, 10),
			});
			return response.data;
		} catch (error) {
			throw new Error('There was a problem posting an author');
		}
	};

	store.putData = async function (url, name, id) {
		try {
			const response = await this.http.patch(`/${url}/${id}`, {
				name: name
					.toLowerCase()
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '),
				updated_at: new Date()
					.toLocaleDateString('ko-KR')
					.replaceAll('. ', '-')
					.slice(0, 10),
			});
			return response.data;
		} catch (error) {
			throw new Error('There was a problem posting an author');
		}
	};

	store.DeleteData = async function (url, id) {
		try {
			const response = await this.http.delete(`/${url}/${id}`);
			return response.data;
		} catch (error) {
			throw new Error('There was a problem deleting an author');
		}
	};
};

export default APIPlugin;
