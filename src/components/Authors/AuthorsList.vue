<template>
	<div id="author-list">
		<Search @search="handleSearch" />
		<Author
			v-for="author in getAuthors"
			:key="author.id"
			:author="author"
		></Author
		><pagination
			:currentPage="currentPage"
			:totalPages="totalPages"
			@changePage="fetchAuthors"
			v-if="getTotalAuthors > 0"
		></pagination>
		<div
			class="label"
			v-else
		>
			There is no authors
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import Author from './Author.vue';
	import Pagination from '../Pagination.vue';
	import Search from '../../components/Search.vue';
	export default {
		name: 'AuthorsList',
		components: { Author, Pagination, Search },
		computed: {
			...mapGetters([
				'getAuthors',
				'getAuthorsPerPage',
				'getTotalAuthors',
				'getCurrentAuthorsPage',
			]),
			currentPage() {
				return this.getCurrentAuthorsPage;
			},
			totalPages() {
				return Math.ceil(this.getTotalAuthors / this.getAuthorsPerPage);
			},
		},
		methods: {
			...mapActions(['fetch_authors']),
			
			fetchAuthors(page) {
				this.$store.commit('SET_CURRENT_AUTHORS_PAGE', page);
				this.fetch_authors();
			},

			handleSearch(query) {
				this.$store.commit('SET_SEARCH_AUTHOR_TEXT', query);
				this.$store.commit('SET_CURRENT_AUTHORS_PAGE', 1);
				this.fetch_authors();
			},
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
