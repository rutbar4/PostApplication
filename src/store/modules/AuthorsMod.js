const state = {
	authors: [],
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
				const authors = await this.postData('authors', name);
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
};

const getters = {
	getAuthors: (state) => state.authors,
	getName: (state) => state.authors,
};

const mutations = {
	SET_AUTHORS(state, authors) {
		state.authors = authors;
	},
};

const mounted = {};

export default {
	state,
	actions,
	mutations,
	getters,
};
