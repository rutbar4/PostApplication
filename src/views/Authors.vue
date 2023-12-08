<template>
	<div id="authors-view">
		<h1>Full list of authors</h1>
		<button
			class="button is-primary is-rounded mt-3 mb-3"
			v-on:click="openModal('CreateAuthor')"
		>
			Create author
		</button>
		<AuthorsList />
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
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
