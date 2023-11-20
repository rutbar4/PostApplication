<template>
	<div id="posts">
		<div>
			<h1>Full list of articles</h1>
			<button
				v-on:click="
					pushNotification({
						type: 'success',
						msg: 'Something successfully done. Something successfully done. ',
					})
				"
			>
				Show Short Success Notification
			</button>
			<button
				v-on:click="
					pushNotification({
						type: 'success',
						msg: 'Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. Something successfully done. ',
					})
				"
			>
				Show Long Success Notification</button
			><button
				v-on:click="
					pushNotification({ type: 'error', msg: 'Something failed' })
				"
			>
				Show Error Notification
			</button>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
		computed: {
			count() {
				return this.$store.state.count;
			},
		},
		methods: {
			...mapMutations(['pushNotification']),
		},
	};
</script>
<style></style>
