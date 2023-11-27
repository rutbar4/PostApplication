<template>
	<div id="create-author">
		<form>
			<div
				class="field"
				style="padding-left: 20%; padding-right: 20%"
			>
				<div>Create author</div>
				<input
					class="input"
					placeholder="Name"
					type="text"
					v-model="authorName"
				/>
				<div style="padding-top: 10px">
					<button v-on:click="post_author(authorName)">Sumbit</button>
				</div>
			</div>
		</form>
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
		},
	};
</script>
