<template>
	<div id="posts-list">
		<p class="subtitle is-6">Click on post's title to see more information</p>
		<Post
			v-for="post in getPosts"
			:key="post.id"
			:post="post"
			:isSinglePostRoute="false"
		></Post>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	import Post from './Post.vue';
	export default {
		name: 'PostsList',
		components: { Post },
		computed: {
			...mapGetters(['getPosts']),
		},
		methods: {
			...mapActions(['fetch_posts']),
		},
		created() {
			this.fetch_posts();
		},
	};
</script>
