<template>
	<div id="author">
		<div style="max-height: 150px; align-items: center; align-content: center">
			<div
				class="card mb-4"
				style="align-items: center; align-content: center"
			>
				<div class="media-content">
					<div
						class="card-header mb-3"
						style="align-items: center"
					>
						<div
							class="card-header-title is-2"
							style="
								max-height: 80px;
								max-width: 80%;
								overflow: auto;
								flex-wrap: wrap;
								hyphens: auto;
							"
						>
							{{ author.name }}
						</div>
						<div style="min-width: fit-content">
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
						<time
							datetime="2016-1-1"
							class="subtitle is-6"
							>Date created: {{ author.created_at }}</time
						>
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

<style>
	.h1 {
		color: blue;
	}
</style>
