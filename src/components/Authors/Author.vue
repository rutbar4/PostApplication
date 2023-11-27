<template>
	<div id="author">
		<div style="height: 150px; align-items: center; align-content: center">
			<div
				class="card"
				style="align-items: center; align-content: center"
			>
				<div class="media-content">
					<div
						class="card-header"
						style="
							align-items: center;
							align-content: center;
							padding-right: 5px;
							margin-bottom: 10px;
						"
					>
						<p class="card-header-title is-2">
							{{ author.name }}
						</p>
						<div>
							<button
								class="button is-success is-outlined is-small is-rounded"
								style="margin-right: 3px"
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
								class="button is-danger is-outlined is-small is-rounded"
								style="margin-right: 3px"
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
							style="margin-bottom: 5px"
						>
							{{ author.id }}
						</div>
						<time datetime="2016-1-1">{{ author.created_at }}</time>
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
