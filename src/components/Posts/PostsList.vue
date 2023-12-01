<template>
	<div id="posts-list">
		<Post
			style="align-items: center"
			v-for="post in getPosts"
			:key="post.id"
			:post="post"
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
