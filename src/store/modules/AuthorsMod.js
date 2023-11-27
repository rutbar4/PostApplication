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
};

const getters = {
	getAuthors: (state) => state.authors,
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
