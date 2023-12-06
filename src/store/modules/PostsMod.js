const state = {
	posts: [],
	post: {},
	authorName: '',
	selectedPostTitle: '',
	selectedPostBody: '',
	selectedPostId: '',
	selectedAuthorId: '',
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
				msg: `Post title: ${title} posted successfully`,
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to post a post',
			});
		}
	},

	async edit_post({ dispatch, commit }, { title, body, selectedAuthorId }) {
		try {
			const post = await this.putPost(
				'posts',
				{
					title,
					body,
					selectedAuthorId,
				},
				state.selectedPostId,
			);
			await dispatch('fetch_posts');
			commit('pushNotification', {
				type: 'success',
				msg: `Post updated successfully. Post title: ${title}`,
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: `Failed to update a post. Post title: ${title}`,
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
	getSelectedPostTitle: (state) => state.selectedPostTitle,
	getSelectedPostBody: (state) => state.selectedPostBody,
	getSelectedPostId: (state) => state.selectedPostId,
};

const mutations = {
	SET_POSTS(state, posts) {
		state.posts = posts;
	},

	SET_POST(state, post) {
		state.post = post;
	},
	SET_SELECTED_POST(state, { title, body, id }) {
		state.selectedPostTitle = title;
		state.selectedPostBody = body;
		state.selectedPostId = id;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
