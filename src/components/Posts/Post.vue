<template>
	<div id="post">
		<div class="card mb-4">
			<header class="card-header">
				<router-link
					exact
					style="padding: 0"
					v-if="!isSinglePostRoute"
					:to="{ path: '/posts/' + post.id }"
				>
					<p class="card-header-title">{{ post.title }}</p>
				</router-link>
				<div v-else>
					<p class="card-header-title">{{ post.title }}</p>
				</div>
			</header>
			<div class="card-content mb-1">
				<div
					class="content"
					v-if="isSinglePostRoute"
				>
					<div clas>Author: {{ post.author.name }}</div>
				</div>
				<div class="content">
					<div>
						{{ post.body }}
					</div>
				</div>
				<div class="content">
					<div class="columns is-mobile">
						<div class="column">
							<time datetime="2016-1-1">Created at: {{ post.created_at }}</time>
						</div>
						<div
							class="column"
							v-if="isSinglePostRoute"
						>
							<time datetime="2016-1-1">Updated at: {{ post.updated_at }}</time>
						</div>
					</div>
				</div>
			</div>
			<footer class="card-footer">
				<a
					href="#"
					class="card-footer-item"
					><button
						class="button is-success is-outlined is-small is-rounded"
						v-on:click="openModal('EditPost')"
					>
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
			isSinglePostRoute: {
				type: Boolean,
				default: true,
			},
		},
		methods: {
			...mapMutations(['openModal']),
		},
	};
</script>
