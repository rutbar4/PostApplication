<template>
	<div
		id="authorList"
		style="
			align-content: center;
			padding-top: 10px;
			padding-left: 10%;
			padding-right: 10%;
		"
	>
		<Author
			style="align-items: center"
			v-for="author in getAuthors"
			:key="author.id"
			:author="author"
		></Author>
	</div>
</template>

<script>
	import { mapMutations, mapGetters, mapActions } from 'vuex';
	import Author from './Author.vue';
	export default {
		name: 'AuthorsList',
		components: { Author },
		computed: {
			...mapGetters(['getAuthors']),
		},
		methods: {
			...mapActions(['fetch_authors']),
			...mapMutations(['pushNotification']),
		},
		created() {
			this.fetch_authors();
		},
	};
</script>

<style>
	.h1 {
		color: blue;
	}
</style>
