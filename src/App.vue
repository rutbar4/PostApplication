<template>
	<div id="app">
		<app-header />
		<div class="columns">
			<div class="column"><modal /></div>
			<div class="column"><router-view /></div>
			<div class="column"><notification-list /></div>
		</div>
	</div>
</template>

<script>
	import header from './components/Header/header.vue';
	import NotificationList from './components/Notification/NotificationList.vue';
	import Modal from './components/Modal.vue';

	export default {
		name: 'app',
		components: {
			'app-header': header,
			NotificationList,
			Modal,
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
