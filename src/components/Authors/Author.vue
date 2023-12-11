<template>
	<div id="author">
		<div class="card mb-4">
			<div class="media-content">
				<div class="card-header mb-3 author-header">
					<div class="card-header-title is-2 author-title">
						{{ author.name }}
					</div>
					<div class="author-buttons-container">
						<button
							class="button is-success is-outlined is-small is-rounded mr-1"
							v-on:click="
								SET_SELECTED_NAME_AND_ID({
									name: author.name,
									id: author.id,
								});
								openModal('EditAuthor');
							"
						>
							Edit
						</button>
						<button
							class="button is-danger is-outlined is-small is-rounded mr-3"
							v-on:click="
								SET_SELECTED_NAME_AND_ID({
									name: author.name,
									id: author.id,
								});
								openModal('DeleteAuthor');
							"
						>
							Delete
						</button>
					</div>
				</div>
				<div class="content">
					<div
						class="subtitle is-6"
						v-if="author.created_at >= author.updated_at"
					>
						<time datetime="2016-1-1">Created at: {{ author.created_at }}</time>
					</div>
					<div
						class="subtitle is-6"
						v-else
					>
						<time datetime="2016-1-1">Updated at: {{ author.updated_at }}</time>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
		name: 'Author',
		props: {
			author: {
				type: Object,
				required: true,
			},
		},
		methods: {
			...mapMutations(['openModal', 'SET_SELECTED_NAME_AND_ID']),
		},
	};
</script>

<style scoped>
	#author {
		max-height: 150px;
		align-items: center;
		align-content: center;
	}
	.author-title {
		max-height: 80px;
		max-width: 80%;
		overflow: auto;
		flex-wrap: wrap;
		hyphens: auto;
	}
	.author-header {
		align-items: center;
	}
	.author-buttons-container {
		min-width: fit-content;
	}
</style>
