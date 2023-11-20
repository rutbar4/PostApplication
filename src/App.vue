<template>
	<div id="app">
		<app-header />
		<router-view />
		<notification-list />
	</div>
</template>

<script>
	import header from './components/Header/header.vue';
	import NotificationList from './components/Notification/NotificationList.vue';

	export default {
		name: 'app',
		components: {
			'app-header': header,
			NotificationList,
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 40px;
	}
</style>
