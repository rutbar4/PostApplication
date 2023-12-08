<template>
	<div id="delete-post">
		Delete post
		<div
			class="field"
			style="padding-left: 20%; padding-right: 20%"
		>
			<label class="label"
				>Do you really want to delete post title:
				{{ getSelectedPostTitle() }}?</label
			>
			<div style="padding-top: 10px">
				<button
					class="button is-danger is-small is-rounded"
					v-on:click="
						delete_post();
						navigateToPosts();
						closeModal();
					"
					style="margin-right: 3px"
				>
					Yes, delete</button
				><button
					class="button is-success is-small is-rounded"
					v-on:click="closeModal()"
					style="margin-right: 3px"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapMutations, mapGetters } from 'vuex';
	export default {
		name: 'DeletePost',
		methods: {
			...mapActions(['delete_post']),
			...mapGetters(['getSelectedPostTitle', 'getPost', 'getIsInSinglePost']),
			...mapMutations([
				'closeModal',
				'SET_POST',
				'SET_IS_DELETED_FROM_SINGLEPOST',
			]),
			navigateToPosts() {
				console.log('post::::');
				console.log(this.getIsInSinglePost());
				if (this.getIsInSinglePost()) {
					this.$router.push('/posts');
				}
			},
		},
		beforeDestroy() {
			this.$store.commit('SET_IS_DELETED_FROM_SINGLEPOST', false);
		},
	};
</script>
