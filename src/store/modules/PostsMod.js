const state = {
	posts: [],
	post: {},
	authorName: '',
	selectedPostTitle: '',
	selectedPostBody: '',
	selectedPostId: '',
	selectedAuthorId: '',
	isDeletedFromSinglePost: false,
	isInSinglePost: false,
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
				msg: `Post (titled: "${title}") posted successfully`,
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: 'Failed to post a post',
			});
		}
	},

	async edit_post({ commit }, { title, body }) {
		try {
			const post = await this.putPost(
				'posts',
				{
					title,
					body,
				},
				state.selectedPostId,
			);
			if (Object.keys(state.post).length === 0) {
				const postIndex = state.posts.findIndex((item) => item.id === post.id);
				const updatedPosts = [...state.posts];
				updatedPosts[postIndex] = post;
				commit('SET_POSTS', updatedPosts);
			} else {
				commit('SET_POST_TITLE_AND_BODY', { title, body });
			}

			commit('pushNotification', {
				type: 'success',
				msg: `Post updated successfully. Post titled: "${title}"`,
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: `Failed to update a post. Post titled: "${title}"`,
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
				msg: `Post (titled: "${post.title}") fetched successfully`,
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: `Failed to fetch post by id: ${id}`,
			});
		}
	},

	async delete_post({ dispatch, commit }) {
		try {
			const post = await this.deleteData('posts', state.selectedPostId);

			if (!state.isDeletedFromSinglePost) {
				await dispatch('fetch_posts');
			}
			commit('pushNotification', {
				type: 'success',
				msg: `Post (titled: "${state.selectedPostTitle}") deleted successfully`,
			});
		} catch {
			commit('pushNotification', {
				type: 'error',
				msg: `Failed to delete post (titled: "${state.selectedPostTitle}")`,
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
	getIsFromSinglePost: (state) => state.isDeletedFromSinglePost,
	getIsInSinglePost: (state) => state.isInSinglePost,
};

const mutations = {
	SET_POSTS(state, posts) {
		state.posts = posts;
	},

	SET_POST(state, post) {
		state.post = post;
	},

	SET_POST_TITLE_AND_BODY(state, { title, body }) {
		state.post.title = title;
		state.post.body = body;
	},
	SET_SELECTED_POST(state, { title, body, id }) {
		state.selectedPostTitle = title;
		state.selectedPostBody = body;
		state.selectedPostId = id;
	},
	SET_POST_TITLE_BODY(state, { title, body, id }) {
		const postIndex = state.posts.findIndex((item) => item.id === post.id);
		const updatedPosts = [...state.posts];
		updatedPosts[postIndex] = post;
	},
	SET_IS_DELETED_FROM_SINGLEPOST(state, isDeleted) {
		state.isDeletedFromSinglePost = isDeleted;
	},
	SET_IS_IN_SINGLEPOST(state, isInSinglePost) {
		state.isInSinglePost = isInSinglePost;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
