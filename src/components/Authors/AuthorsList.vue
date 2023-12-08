<template>
	<div id="author-list">
		<Author
			v-for="author in getAuthors"
			:key="author.id"
			:author="author"
		></Author>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import Author from './Author.vue';
	export default {
		name: 'AuthorsList',
		components: { Author },
		computed: {
			...mapGetters(['getAuthors']),
		},
		methods: {
			...mapActions(['fetch_authors']),
		},
		created() {
			this.fetch_authors();
		},
	};
</script>

<style scoped>
	#author-list {
		align-content: center;
		padding-top: 10px;
		padding-left: 10%;
		padding-right: 10%;
	}
</style>
