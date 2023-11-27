const state = {
	posts: [],
};

const actions = {
	async fetch_posts({ commit }) {
		try {
			const posts = await this.getData('posts');
			commit('SET_POSTS', posts);
			commit('pushNotification', {
				type: 'success',
				msg: 'Posts fetched successfully',
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to fetch posts',
			});
		}
	},
};

const getters = {
	getPosts: (state) => state.posts,
};

const mutations = {
	SET_POSTS(state, posts) {
		state.posts = posts;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
