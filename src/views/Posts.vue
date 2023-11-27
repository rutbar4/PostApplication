<template>
	<div id="posts">
		<div>
			<div
				class="block"
				v-for="post in getPosts"
				:key="post.id"
			>
				<div class="card">
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
							>Edit</a
						>
						<a
							href="#"
							class="card-footer-item"
							>Delete</a
						>
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapActions, mapGetters } from 'vuex';
	export default {
		computed: {
			...mapGetters(['getPosts']),
		},
		methods: {
			...mapActions(['fetch_posts']),
		},
		created() {
			this.fetch_posts();
		},
	};
</script> 
