<template>
	<div id="delete-author">
		<div
			class="field"
			style="padding-left: 20%; padding-right: 20%"
		>
			<label class="label"
				>Do you realll want to delete author: {{ getSelectedName() }}?</label
			>
			<div style="padding-top: 10px">
				<button
					v-on:click="
						delete_author(name);
						closeModal();
					"
					style="margin-right: 3px"
				>
					Yes</button
				><button
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
		name: 'EditAuthor',
		data() {
			return {
				name: '',
			};
		},
		created() {
			this.name = this.getSelectedName();
		},
		methods: {
			...mapActions(['delete_author']),
			...mapMutations(['SET_NAME']),
			...mapGetters(['getSelectedName', 'getSelectedId']),
			...mapMutations(['closeModal']),
		},
	};
</script>
