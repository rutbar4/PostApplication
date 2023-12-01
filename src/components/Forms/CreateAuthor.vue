<template>
	<div id="create-author">
		<div style="padding-left: 5%; padding-right: 5%">
			<label class="label">Create new author</label>
			<form @submit.prevent="validateBeforeSubmit">
				<div class="column is-12">
					<p class="control has-icon has-icon-right">
						<label class="label">Name:</label>
						<input
							name="authorName"
							v-model="authorName"
							v-validate="'required|regex:[a-zA-Z]|min:2|max:50'"
							:class="{ input: true, 'is-danger': errors.has('authorName') }"
							type="text"
							placeholder="Write author's name"
						/>
						<i
							v-show="errors.has('authorName')"
							class="fa fa-warning"
						></i>
						<span
							v-show="errors.has('authorName')"
							class="help is-danger"
							>{{ errors.first('authorName') }}</span
						>
					</p>
				</div>
				<div class="column is-12">
					<p class="control">
						<button
							class="button is-primary"
							type="submit"
						>
							Submit
						</button>
					</p>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapMutations } from 'vuex';
	export default {
		name: 'CreateAuthor',
		data() {
			return {
				max: 50,
				authorName: '',
			};
		},
		methods: {
			...mapActions(['post_author']),
			...mapMutations(['closeModal', 'pushNotification']),
			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.post_author(this.authorName.trim().replace(/\s{2,}/g, ' '));
						this.closeModal();
						return;
					}
					this.pushNotification({
						type: 'error',
						msg: 'Please correct all errors before submitting!',
					});
				});
			},
		},
	};
</script>
<style scoped>
	.block {
		display: flex;
		align-items: center;
	}
</style>
