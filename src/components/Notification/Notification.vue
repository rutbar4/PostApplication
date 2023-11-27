<template>
	<div
		v-bind:class="
			notification.type == 'success'
				? 'notification is-success'
				: 'notification is-danger'
		"
	>
		<span class="not-msg">
			{{ notification.msg }}
		</span>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		props: {
			notification: {
				type: Object,
				required: true,
			},
		},
		methods: {
			...mapMutations(['removeNotification']),
		},
		created() {
			// setTimeout(() => {
			//   this.removeNotification();
			// }, 5000);
		},
	};
</script>
<style scoped>
	.notification {
		width: 360px;
		max-height: 200px;
	}
	.not-msg {
		justify-content: flex-start;
		max-height: 200px;
		text-align: start;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
