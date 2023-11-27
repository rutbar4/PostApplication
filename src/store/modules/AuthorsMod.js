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

	async post_author({ commit }, name) {
		try {
			if (name === null || name === '') {
				commit('pushNotification', {
					type: 'error',
					msg: 'Name was not imputed',
				});
				throw error;
			} else {
				const author = await this.postData('authors', name);
				const authors = await this.getData('authors');
				commit('SET_AUTHORS', authors);
				commit('pushNotification', {
					type: 'success',
					msg: 'Author posted successfully',
				});
			}
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to post author',
			});
		}
	},

	async edit_author({ commit }, newName) {
		try {
			if (newName === null || newName === '') {
				//nothing was edited
				commit('pushNotification', {
					type: 'error',
					msg: 'Name was not imputed',
				});
				throw error;
			} else {
				const author = await this.putData(
					'authors',
					newName,
					state.selectedAuthorId,
				);
				const authors = await this.getData('authors');
				commit('SET_AUTHORS', authors);
				commit('pushNotification', {
					type: 'success',
					msg: 'Author updated successfully',
				});
			}
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to update author',
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
		console.log('selected: ' + name + ' ' + id);
		state.selectedAuthorName = name;
		state.selectedAuthorId = id;
	},
	SET_NAME(state, name) {
		state.selectedAuthorName = name;
		return state.selectedAuthorName;
	},
};

const mounted = {};

export default {
	state,
	actions,
	mutations,
	getters,
};
