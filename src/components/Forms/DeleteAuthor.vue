<template>
	<div id="delete-author">
		<div
			class="field"
			style="padding-left: 20%; padding-right: 20%"
		>
			<label class="label"
				>Do you really want to delete author: {{ getSelectedName() }}?</label
			>
			<div style="padding-top: 10px">
				<button
					class="button is-danger is-small is-rounded"
					v-on:click="
						delete_author();
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
