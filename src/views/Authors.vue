<template>
	<div id="authorsView">
		<h1>Full list of authors</h1>
		<button v-on:click="openModal('CreateAuthor')">
			Open modal Create author
		</button>
		<button v-on:click="openModal('DeletePost')">Open modal Delete post</button>
		<AuthorsList />
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	import AuthorsList from '../components/Authors/AuthorsList.vue';
	export default {
		name: 'AuthorsView',
		components: {
			AuthorsList,
		},
		methods: {
			...mapMutations(['openModal']),
		},
	};
</script>

<style>
	.h1 {
		color: blue;
	}
</style>
