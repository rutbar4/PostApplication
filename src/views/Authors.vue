<template>
	<div id="authorsView">
		<h1>Full list of authors</h1>
		<button
			class="button is-primary is-rounded"
			style="margin-bottom: 15px; margin-top: 10px"
			v-on:click="openModal('CreateAuthor')"
		>
			Create author
		</button>
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
