<template>
	<div id="edit-author">
		<div
			class="field"
			style="padding-left: 20%; padding-right: 20%"
		>
			<label class="label">Edit Name</label>

			<div class="field-body">
				<input
					class="input"
					type="text"
					v-model="name"
				/>
			</div>
			<div style="padding-top: 10px">
				<button
					v-on:click="
						edit_author(name);
						closeModal();
					"
				>
					Sumbit
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
			...mapActions(['edit_author']),
			...mapMutations(['SET_NAME']),
			...mapGetters(['getSelectedName', 'getSelectedId']),
			...mapMutations(['closeModal']),
		},
	};
</script>
