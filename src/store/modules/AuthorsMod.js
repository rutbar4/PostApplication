const state = {
	authors: [],
	selectedAuthorName: '',
	selectedAuthorId: '',
};

const actions = {
	async fetch_authors({ commit }) {
		try {
			const authors = await this.getData('authors');
			commit('SET_AUTHORS', authors);
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
			const author = await this.postData('authors', name);
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
			const author = await this.putData(
				'authors',
				newName,
				state.selectedAuthorId,
			);
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
			const author = await this.deleteData('authors', state.selectedAuthorId);
			await dispatch('fetch_authors');
			commit('pushNotification', {
				type: 'success',
				msg: 'Author deleted successfully',
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to deleted author',
			});
		}
	},
};

const getters = {
	getAuthors: (state) => state.authors,
	getSelectedName: (state) => state.selectedAuthorName,
	getSelectedId: (state) => state.selectedAuthorId,
};

const mutations = {
	SET_AUTHORS(state, authors) {
		state.authors = authors;
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
