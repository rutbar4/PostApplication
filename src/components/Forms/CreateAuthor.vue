<template>
	<div id="create-author">
		<div
			class="field"
			style="padding-left: 20%; padding-right: 20%"
		>
			<label class="label">Create new author</label>
			<input
				class="input"
				placeholder="Name"
				type="text"
				v-model="authorName"
			/>
			<div style="padding-top: 10px">
				<button
					class="button"
					v-on:click="
						post_author(authorName);
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
	import { mapActions, mapMutations } from 'vuex';
	export default {
		name: 'CreateAuthor',
		data() {
			return {
				authorName: '',
			};
		},
		methods: {
			...mapActions(['post_author']),
			...mapMutations(['SET_NAME']),
			...mapMutations(['closeModal']),
		},
	};
</script>
