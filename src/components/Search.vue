<template>
	<div id="search">
		<div class="columns is-mobile mb-2">
			<div class="column"></div>
			<div class="column is-two-fifths mr-2">
				<div class="control has-icons-left has-icons-right">
					<input
						class="input is-small is-rounded"
						type="text"
						placeholder="Search..."
						v-model="searchQuery"
						@input="updateSearch"
					/>
					<span class="icon is-small is-left"
						><i class="fas fa-search"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { debounce } from 'vue-debounce';
	export default {
		data() {
			return {
				searchQuery: '',
			};
		},
		methods: {
			updateSearch: debounce(function () {
				this.$emit('search', this.searchQuery);
			}, 1000),
		},
		beforeDestroy() {
			this.$emit('search', '');
		},
	};
</script>
