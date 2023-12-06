import axios from 'axios';

const APIPlugin = (store) => {
	store.http = axios.create({ baseURL: 'http://localhost:3000' });

	store.getData = async function (url) {
		try {
			const response = await this.http.get(`/${url}`);
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem fetching ${url} from the server`);
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
					.replaceAll('.', ''),
				updated_at: new Date()
					.toLocaleDateString('ko-KR')
					.replaceAll('. ', '-')
					.replaceAll('.', ''),
			});
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem posting to ${url}`);
		}
	};

	store.postPost = async function (url, { title, body, selectedAuthorId }) {
		try {
			const response = await this.http.post(`/${url}`, {
				title: title
					.toLowerCase()
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '),
				body: body,
				authorId: selectedAuthorId,
				created_at: new Date()
					.toLocaleDateString('ko-KR')
					.replaceAll('. ', '-')
					.replaceAll('.', ''),
				updated_at: new Date()
					.toLocaleDateString('ko-KR')
					.replaceAll('. ', '-')
					.replaceAll('.', ''),
			});
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem posting to ${url}`);
		}
	};

	store.putPost = async function (url, { title, body, selectedAuthorId }, id) {
		try {
			const response = await this.http.patch(`/${url}/${id}`, {
				title: title
					.toLowerCase()
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '),
				body: body,
				authorId: selectedAuthorId,
				updated_at: new Date()
					.toLocaleDateString('ko-KR')
					.replaceAll('. ', '-')
					.replaceAll('.', ''),
			});
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem posting to ${url}`);
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
					.replaceAll('.', ''),
			});
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem while updating in ${url}`);
		}
	};

	store.deleteData = async function (url, id) {
		try {
			const response = await this.http.delete(`/${url}/${id}`);
			return response.data;
		} catch (error) {
			throw new Error(
				`There was a problem deleting an item id: ${id} from ${url}`,
			);
		}
	};

	store.getById = async function (url, id) {
		try {
			const response = await this.http.get(`/${url}/${id}?_expand=author`);
			return response.data;
		} catch (error) {
			throw new Error(`There was a problem getting item ${id} from ${url}`);
		}
	};
};

export default APIPlugin;
