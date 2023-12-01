<template>
	<div id="edit-author">
		<div style="padding-left: 5%; padding-right: 5%">
			<label class="label">Edit Name</label>
			<form @submit.prevent="validateBeforeSubmit">
				<div class="column is-12">
					<label class="label">Name:</label>
					<p class="control has-icon has-icon-right">
						<input
							name="name"
							v-model="name"
							v-validate="'required|regex:[a-zA-Z]|min:2|max:50'"
							:class="{ input: true, 'is-danger': errors.has('name') }"
							type="text"
							placeholder="Write author's name to change"
						/>
						<i
							v-show="errors.has('name')"
							class="fa fa-warning"
						></i>
						<span
							v-show="errors.has('name')"
							class="help is-danger"
							>{{ errors.first('name') }}</span
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
	import { mapActions, mapMutations, mapGetters } from 'vuex';
	export default {
		name: 'EditAuthor',
		data() {
			return {
				name: '',
				max: 50,
			};
		},
		created() {
			this.name = this.getSelectedName();
		},
		methods: {
			...mapActions(['edit_author']),
			...mapMutations(['closeModal', 'pushNotification']),
			...mapGetters(['getSelectedName', 'getSelectedId']),
			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.edit_author(this.name.trim().replace(/\s{2,}/g, ' '));
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
