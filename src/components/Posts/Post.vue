<template>
	<div id="post">
		<div class="card mb-4">
			<header class="card-header">
				<p class="card-header-title">{{ post.title }}</p>
			</header>
			<div class="card-content">
				<div class="content">
					{{ post.body }}
					<br />
					<time datetime="2016-1-1">{{ post.created_at }}</time>
				</div>
			</div>
			<footer class="card-footer">
				<a
					href="#"
					class="card-footer-item"
					><button class="button is-success is-outlined is-small is-rounded">
						Edit
					</button></a
				>
				<a
					href="#"
					class="card-footer-item"
					><button class="button is-danger is-outlined is-small is-rounded">
						Delete
					</button></a
				>
			</footer>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
		name: 'Post',
		props: {
			post: {
				type: Object,
				required: true,
			},
		},
		methods: {
			...mapMutations(['openModal']),
		},
	};
</script>
