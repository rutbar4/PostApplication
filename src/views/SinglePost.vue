<template>
	<div id="single-post">
		<Post :post="getPost"></Post>
	</div>
</template>

<script>
	import Post from '../components/Posts/Post.vue';
	import { mapActions, mapGetters } from 'vuex';
	export default {
		name: 'SinglePost',
		components: { Post },
		computed: {
			...mapGetters(['getPost']),
		},
		methods: {
			...mapActions([
				'fetch_post_by_id',
				'SET_POST',
				'SET_IS_DELETED_FROM_SINGLEPOST',
				'SET_IS_IN_SINGLEPOST'
			]),
		},
		created() {
			this.fetch_post_by_id(this.$route.params.id);
		},
		beforeDestroy() {
			this.$store.commit('SET_POST', {});
			this.$store.commit('SET_IS_DELETED_FROM_SINGLEPOST', true);
			this.$store.commit('SET_IS_IN_SINGLEPOST', false);
		},
		beforeCreate(){
			this.$store.commit('SET_IS_IN_SINGLEPOST', true);
		},
	};
</script>

<style scoped>
	#singlePost {
		margin-top: 15px;
	}
</style>
