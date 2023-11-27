<template>
	<div id="author">
		<div style="height: 100px; align-items: center; align-content: center">
			<div
				class="card"
				style="align-items: center; align-content: center"
			>
				<div class="media-content">
					<p class="title is-4">{{ author.name }}</p>
					<time datetime="2016-1-1">{{ author.created_at }}</time>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Author',
		props: {
			author: {
				type: Object,
				required: true,
			},
		},
	};
</script>

<style>
	.h1 {
		color: blue;
	}
</style>
