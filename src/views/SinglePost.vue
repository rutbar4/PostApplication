<template>
	<div id="singlePost">
		<div style="margin-top: 15px">
			<Post :post="getPost"></Post>
		</div>
	</div>
</template>

<script>
	import Post from '../components/Posts/Post.vue';
	import { mapActions, mapGetters } from 'vuex';
	export default {
		name: 'SinglePost',
		components: { Post },
		data() {
			return {
				id: this.$route.params.id,
			};
		},
		computed: {
			...mapGetters(['getPost']),
		},
		methods: {
			...mapActions(['fetch_post_by_id']),
		},
		created() {
			this.fetch_post_by_id(this.id);
		},
	};
</script>

<style></style>
