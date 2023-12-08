<template>
	<div id="post">
		<div class="card mb-6">
			<header class="card-header">
				<router-link
					exact
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
						<div
							class="column"
							v-if="post.created_at >= post.updated_at"
						>
							<time datetime="2016-1-1">Created at: {{ post.created_at }}</time>
						</div>
						<div
							class="column"
							v-else
						>
							<time datetime="2016-1-1">Updated at: {{ post.updated_at }}</time>
						</div>
					</div>
				</div>
			</div>
			<footer class="card-footer">
				<a
					href="#"
					class="card-footer-item pr-6 pl-6"
				>
					<button
						class="button is-success is-outlined is-fullwidth mr-6 ml-6 is-small is-rounded"
						v-on:click="
							SET_SELECTED_POST({
								title: post.title,
								body: post.body,
								id: post.id,
							});
							openModal('EditPost');
						"
					>
						Edit
					</button></a
				>
				<a
					href="#"
					class="card-footer-item pr-6 pl-6"
					><button
						class="button is-danger is-fullwidth mr-6 ml-6 is-outlined is-small is-rounded"
						v-on:click="
							SET_SELECTED_POST({
								title: post.title,
								body: post.body,
								id: post.id,
							});
							openModal('DeletePost');
						"
					>
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
			...mapMutations([
				'openModal',
				'SET_SELECTED_POST',
				'SET_SELECTED_NAME_AND_ID',
				'SET_POST',
			]),
		},
		beforeDestroy() {
			this.$store.commit('SET_POST', {});
		},
	};
</script>
