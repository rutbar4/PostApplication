<template>
	<nav>
		<ul>
			<li>
				<router-link
					to="/authors"
					exact
					>Authors</router-link
				>
			</li>
			<li>
				<router-link
					to="/posts"
					exact
					>Posts</router-link
				>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {};
</script>

<style>
	ul {
		list-style-type: none;
		text-align: center;
		margin: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #fff;
		text-decoration: none;
		padding: 6px 8px;
		border-radius: 10px;
	}
	nav {
		background: #e8c02e;
		padding: 14px 0;
		margin-bottom: 40px;
	}
	.router-link-active {
		background: #444;
		color: #e8c02e;
	}
</style>
