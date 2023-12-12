<template>
	<div id="pagination  is-centered">
		<nav
			class="pagination is-rounded is-centered pagination-class"
			role="navigation"
			aria-label="pagination"
		>
			<button
				id="previous_button"
				class="pagination-previous"
				v-on:click="changePage(currentPage - 1)"
				:disabled="currentPage === 1"
			>
				Previous
			</button>
			<ul class="pagination-list">
				<button
					class="pagination-link"
					@click="changePage(1)"
					:class="{ 'is-current': 1 === currentPage }"
				>
					1
				</button>
				<li
					v-if="showLeftEllipsis"
					aria-hidden="true"
				>
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<button
					class="pagination-link"
					@click="changePage(page)"
					:class="{ 'is-current': page === currentPage }"
					v-for="page in displayedPages"
					:key="page"
				>
					{{ page }}
				</button>

				<li
					v-if="showRightEllipsis"
					aria-hidden="true"
				>
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<button
					v-if="!(this.totalPages === 1)"
					class="pagination-link"
					@click="changePage(totalPages)"
					:class="{ 'is-current': totalPages === currentPage }"
				>
					{{ totalPages }}
				</button>
			</ul>
			<button
				id="next_button"
				class="pagination-next"
				v-on:click="changePage(currentPage + 1)"
				:disabled="currentPage === totalPages"
			>
				Next
			</button>
		</nav>
	</div>
</template>

<script>
	export default {
		props: {
			currentPage: { type: Number },
			totalPages: { type: Number },
			visiblePages: {
				type: Number,
				default: 5,
			},
		},
		methods: {
			changePage(page) {
				if (page >= 1 && page <= this.totalPages) {
					this.$emit('changePage', page);
				}
			},
		},
		computed: {
			displayedPages() {
				const pages = [];
				let startPage = Math.max(
					2,
					this.currentPage - Math.floor(this.visiblePages / 2),
				);
				let endPage = Math.min(
					this.totalPages - 1,
					startPage + this.visiblePages - 1,
				);

				if (endPage - startPage + 1 < this.visiblePages) {
					startPage = Math.max(2, endPage - this.visiblePages + 1);
				}

				for (let page = startPage; page <= endPage; page++) {
					pages.push(page);
				}

				return pages;
			},

			showLeftEllipsis() {
				return (
					this.currentPage - Math.floor(this.visiblePages / 2) &&
					this.totalPages > 5
				);
			},
			showRightEllipsis() {
				return (
					this.currentPage + Math.floor(this.visiblePages / 2) <
						this.totalPages && this.totalPages > 5
				);
			},
			pages() {
				return Array.from({ length: this.totalPages }, (_, i) => i + 1);
			},
		},
	};
</script>

<style scoped>
	.pagination-class {
		background-color: transparent;
	}
</style>
