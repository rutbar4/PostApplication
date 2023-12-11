<template>
	<div id="posts-list">
		<p class="subtitle is-6">Click on post's title to see more information</p>
		<Post
			v-for="post in getPosts"
			:key="post.id"
			:post="post"
			:isSinglePostRoute="false"
		></Post
		><pagination
			:currentPage="currentPage"
			:totalPages="totalPages"
			@changePage="fetchPosts"
			v-if="getTotalPosts > 1"
		></pagination>
		<div
			class="label"
			v-else
		>
			There is no posts
		</div>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	import Post from './Post.vue';
	import Pagination from '../Pagination.vue';
	export default {
		name: 'PostsList',
		components: { Post, Pagination },
		computed: {
			...mapGetters([
				'getPosts',
				'getPostsPerPage',
				'getTotalPosts',
				'getCurrentPage',
			]),
			currentPage() {
				return this.getCurrentPage;
			},
			totalPages() {
				return Math.ceil(this.getTotalPosts / this.getPostsPerPage);
			},
		},
		methods: {
			...mapActions(['fetch_posts']),
			fetchPosts(page) {
				this.$store.commit('SET_CURRENT_PAGE', page);
				this.fetch_posts();
			},
		},
		created() {
			this.fetch_posts();
		},
	};
</script>
