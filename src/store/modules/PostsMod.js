import { formatAuthorName, getCurrentDate } from '../../utils/utils';

const state = {
	posts: [],
	post: {},
	authorName: '',
	selectedPostTitle: '',
	selectedPostBody: '',
	selectedPostId: '',
	selectedAuthorId: '',
	isDeletedFromSinglePost: false,
	currentPage: 1,
	postsPerPage: 4,
	totalPosts: 0,
};

const actions = {
	async post_post({ dispatch, commit }, { title, body, selectedAuthorId }) {
		try {
			const post = await this.postData('posts', {
				title: formatAuthorName(title),
				body: body,
				authorId: selectedAuthorId,
				created_at: getCurrentDate(),
				updated_at: getCurrentDate(),
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
			const post = await this.putData(`posts/${state.selectedPostId}`, {
				title: formatAuthorName(title),
				body: body,
				updated_at: getCurrentDate(),
			});

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
			const response = await this.getData(
				`posts?_page=${state.currentPage}&&_limit=${state.postsPerPage}`,
			);

			commit('SET_POSTS', response.data);
			commit('SET_POSTS_COUNT', response.headers['x-total-count']);

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
			const post = await this.getData(`posts/${id}?_expand=author`);
			console.log(post.data);
			commit('SET_POST', post.data);

			commit('pushNotification', {
				type: 'success',
				msg: `Post (titled: "${post.data.title}") fetched successfully`,
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
			const post = await this.deleteData(`posts/${state.selectedPostId}`);

			if (state.posts.length === 1) {
				commit('SET_CURRENT_PAGE', state.currentPage - 1);
			}

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
	getCurrentPage: (state) => state.currentPage,
	getTotalPosts: (state) => state.totalPosts,
	getPostsPerPage: (state) => state.postsPerPage,
};

const mutations = {
	SET_POSTS(state, posts) {
		state.posts = posts;
	},

	SET_POSTS_COUNT(state, totalPosts) {
		state.totalPosts = totalPosts;
	},

	SET_CURRENT_PAGE(state, currentPage) {
		state.currentPage = currentPage;
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
