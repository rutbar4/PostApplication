<template>
	<div id="posts-view">
		<router-view></router-view>
		<h1>Full list of authors</h1>
		<button
			class="button is-primary is-rounded"
			style="margin-bottom: 15px; margin-top: 10px"
			v-on:click="openModal('CreatePost')"
		>
			Create post
		</button>
		<PostsList />
		<div></div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	import PostsList from '../../components/Posts/PostsList.vue';
	export default {
		name: 'PostsView',
		components: {
			PostsList,
		},
		methods: {
			...mapMutations(['openModal']),
		},
	};
</script>