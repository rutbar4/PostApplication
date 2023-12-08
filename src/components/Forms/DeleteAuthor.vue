<template>
	<div id="delete-author">
		<label class="label"
			>Do you really want to delete author: {{ getSelectedName() }}?</label
		>
		<div class="delete-author-buttons">
			<button
				class="button is-danger is-small is-rounded mr-2"
				v-on:click="
					delete_author();
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
		name: 'DeleteAuthor',
		created() {
			this.name = this.getSelectedName();
		},
		methods: {
			...mapActions(['delete_author']),
			...mapGetters(['getSelectedName']),
			...mapMutations(['closeModal']),
		},
	};
</script>
<style scoped>
	.delete-author-buttons {
		padding-top: 10px;
	}
</style>
