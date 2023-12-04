const state = {
	posts: [],
	post: {},
	authorName: '',
};

const actions = {
	async post_post({ dispatch, commit }, { title, body, selectedAuthorId }) {
		try {
			const post = await this.postPost('posts', {
				title,
				body,
				selectedAuthorId,
			});
			await dispatch('fetch_posts');
			commit('pushNotification', {
				type: 'success',
				msg: 'Post posted successfully',
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to post a post',
			});
		}
	},

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

	async fetch_post_by_id({ commit }, id) {
		try {
			const post = await this.getById(`posts`, id);
			commit('SET_POST', post);
			commit('pushNotification', {
				type: 'success',
				msg: `Post (id: ${id}) fetched successfully`,
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: `Failed to fetch post by id: ${id}`,
			});
		}
	},
};

const getters = {
	getPosts: (state) => state.posts,
	getPost: (state) => state.post,
};

const mutations = {
	SET_POSTS(state, posts) {
		state.posts = posts;
	},

	SET_POST(state, post) {
		state.post = post;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
