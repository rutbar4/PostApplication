import { formatAuthorName, getCurrentDate } from '../../utils/utils';

const state = {
	authors: [],
	selectedAuthorName: '',
	selectedAuthorId: '',
	currentAuthorsPage: 1,
	authorsPerPage: 1,
	totalAuthors: 0,
};

const actions = {
	async fetch_authors({ commit }) {
		try {
			const response = await this.getData(
				`authors?_page=${state.currentAuthorsPage}&&_limit=${state.authorsPerPage}`,
			);

			commit('SET_AUTHORS', response.data);
			commit('SET_AUTHORS_COUNT', response.headers['x-total-count']);

			commit('pushNotification', {
				type: 'success',
				msg: 'Authors fetched successfully',
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to fetch authors',
			});
		}
	},

	async post_author({ dispatch, commit }, name) {
		try {
			const author = await this.postData('authors', {
				name: formatAuthorName(name),
				created_at: getCurrentDate(),
				updated_at: getCurrentDate(),
			});

			await dispatch('fetch_authors');

			commit('pushNotification', {
				type: 'success',
				msg: 'Author posted successfully',
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to post author',
			});
		}
	},

	async edit_author({ dispatch, commit }, newName) {
		try {
			const author = await this.putData(`authors/${state.selectedAuthorId}`, {
				name: formatAuthorName(newName),
				updated_at: getCurrentDate(),
			});

			await dispatch('fetch_authors');

			commit('pushNotification', {
				type: 'success',
				msg: 'Author updated successfully',
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to update author',
			});
		}
	},

	async delete_author({ dispatch, commit }) {
		try {
			const author = await this.deleteData(`authors/${state.selectedAuthorId}`);
			if (state.authors.length === 1) {
				commit('SET_CURRENT_AUTHORS_PAGE', state.currentAuthorsPage - 1);
			}

			await dispatch('fetch_authors');

			commit('pushNotification', {
				type: 'success',
				msg: 'Author deleted successfully',
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to delete author',
			});
		}
	},
};

const getters = {
	getAuthors: (state) => state.authors,
	getSelectedName: (state) => state.selectedAuthorName,
	getSelectedId: (state) => state.selectedAuthorId,
	getCurrentAuthorsPage: (state) => state.currentAuthorsPage,
	getTotalAuthors: (state) => state.totalAuthors,
	getAuthorsPerPage: (state) => state.authorsPerPage,
};

const mutations = {
	SET_AUTHORS(state, authors) {
		state.authors = authors;
	},

	SET_AUTHORS_COUNT(state, totalAuthors) {
		state.totalAuthors = totalAuthors;
	},

	SET_CURRENT_AUTHORS_PAGE(state, currentPage) {
		state.currentAuthorsPage = currentPage;
	},

	SET_SELECTED_NAME_AND_ID(state, { name, id }) {
		state.selectedAuthorName = name;
		state.selectedAuthorId = id;
	},
};

const mounted = {};

export default {
	state,
	actions,
	mutations,
	getters,
};
