<template>
	<div
		id="modal"
		is-overlay
	>
		<div
			style="padding-right: 20%; padding-left: 20%"
			v-bind:class="getIsOpen ? 'modal is-active' : 'modal'"
		>
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title"></p>
					<button
						class="delete"
						aria-label="close"
						v-on:click="closeModal"
					></button>
				</header>
				<section class="modal-card-body">
					<component :is="getComponent" />
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';

	export default {
		name: 'Modal',
		data() {
			return {
				content: null,
			};
		},
		computed: {
			...mapGetters(['getComponent', 'getIsOpen']),
		},
		methods: {
			...mapMutations(['closeModal']),
		},
		components: {
			CreateAuthor,
			CreatePost,
			DeleteAuthor,
			DeletePost,
			EditAuthor,
			EditPost,
		},
	};
</script>
<script setup>
	import CreateAuthor from './Forms/CreateAuthor.vue';
	import CreatePost from './Forms/CreatePost.vue';
	import DeleteAuthor from './Forms/DeleteAuthor.vue';
	import DeletePost from './Forms/DeletePost.vue';
	import EditAuthor from './Forms/EditAuthor.vue';
	import EditPost from './Forms/EditPost.vue';
	import LoadingView from './LoadingView.vue';
	import LoadingError from './LoadingError.vue';
</script>
<style></style>
