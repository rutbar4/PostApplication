<template>
	<div id="edit-post">
		<div style="padding-left: 10%; padding-right: 10%">
			<label class="label">Edit post</label>
			<form @submit.prevent="validateBeforeSubmit">
				<label class="label has-text-weight-normal mt-3">Title: </label>
				<input
					name="PostTitle"
					class="input is-link is-hovered"
					:class="{ input: true, 'is-danger': errors.has('PostTitle') }"
					placeholder="Title"
					type="text"
					v-model="title"
					@input="onFormInput"
					v-validate="'required|min:2|max:50'"
				/>
				<span
					v-show="errors.has('PostTitle')"
					class="help is-danger"
					>{{ errors.first('PostTitle') }}</span
				>
				<label class="label has-text-weight-normal mt-3">Body: </label>
				<textarea
					name="PostBody"
					class="textarea is-link is-hovered"
					:class="{ input: true, 'is-danger': errors.has('PostBody') }"
					rows="3"
					v-model="body"
					@input="onFormInput"
					placeholder="Write yor body here..."
					v-validate="'required|regex:[a-zA-Z]|min:2|max:250'"
				></textarea>
				<span
					v-show="errors.has('PostBody')"
					class="help is-danger"
					>{{ errors.first('PostBody') }}</span
				>

				<div style="padding-top: 10px">
					<button
						class="button is-primary is-rounded"
						type="submit"
						:disabled="
							!isEdited ||
							(notChangedTitle === title && notChangedBody === body)
						"
					>
						Sumbit
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex';
	export default {
		name: 'EditPost',
		data() {
			return {
				title: '',
				notChangedTitle: '',
				body: '',
				notChangedBody: '',
				id: '',
				isEdited: false,
				reloadKey: 0,
			};
		},
		methods: {
			...mapActions(['edit_post']),
			...mapMutations(['closeModal', 'pushNotification']),
			...mapGetters([
				'getSelectedPostTitle',
				'getSelectedPostBody',
				'getSelectedId',
			]),
			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.edit_post({
							title: this.title,
							body: this.body,
							id: this.id,
						});
						this.closeModal();
						this.reloadComponent();
						return;
					}
					this.pushNotification({
						type: 'error',
						msg: 'Please correct all errors before submitting!',
					});
				});
			},
			onFormInput() {
				this.isEdited = true;
			},
			reloadComponent() {
				this.$emit('reloadComponent');
			},
		},
		created() {
			this.title = this.getSelectedPostTitle();
			this.body = this.getSelectedPostBody();
			this.notChangedTitle = this.getSelectedPostTitle();
			this.notChangedBody = this.getSelectedPostBody();
		},
	};
</script>
