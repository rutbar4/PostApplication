<template>
	<div id="delete-post">
		<label class="label"
			>Do you really want to delete post title:
			{{ getSelectedPostTitle() }}?</label
		>
		<div class="delete-post-buttons">
			<button
				class="button is-danger is-small is-rounded mr-2"
				v-on:click="
					delete_post();
					navigateToPosts();
					closeModal();
				"
			>
				Yes, delete</button
			><button
				class="button is-success is-small is-rounded mr-2"
				v-on:click="closeModal()"
			>
				Cancel
			</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapMutations, mapGetters } from 'vuex';
	export default {
		name: 'DeletePost',
		methods: {
			...mapActions(['delete_post']),
			...mapGetters(['getSelectedPostTitle', 'SET_IS_DELETED_FROM_SINGLEPOST']),
			...mapMutations(['closeModal', 'SET_POST']),
			navigateToPosts() {
				this.$router.push('/posts');
			},
		},
		beforeDestroy() {
			this.$store.commit('SET_IS_DELETED_FROM_SINGLEPOST', false);
		},
	};
</script>
<style scoped>
	.delete-post-buttons {
		padding-top: 10px;
	}
</style>
