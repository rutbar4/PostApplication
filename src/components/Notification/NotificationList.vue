<template>
	<div
		id="notification-list"
		is-overlay
	>
		<div>
			<span class="notification-span"
				><Notification
					v-for="(notification, index) in getNotifications"
					:key="index"
					:notification="notification"
					is-overlay
				></Notification
			></span>
		</div>
	</div>
</template>

<script>
	import Notification from './Notification.vue';
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		name: 'NotificationList',
		components: {
			Notification,
		},
		data() {
			return {
				intervalTimer: null,
			};
		},
		computed: {
			...mapGetters(['getNotifications']),
		},
		methods: {
			...mapMutations(['removeNotification']),
		},
		watch: {
			getNotifications: {
				immediate: true,
				handler: function (notifications) {
					if (notifications.length && this.intervalTimer == null) {
						this.intervalTimer = setInterval(() => {
							this.removeNotification();
						}, 3000);
					} else if (!notifications.length && this.intervalTimer != null) {
						clearInterval(this.intervalTimer);
						this.intervalTimer = null;
					}
				},
			},
		},
	};
</script>

<style scoped>
	.notification-span {
		position: fixed;
		overflow: auto;
		max-height: 80%;
		top: 110px;
		right: 5%;
		overflow-anchor: auto;
	}
</style>
