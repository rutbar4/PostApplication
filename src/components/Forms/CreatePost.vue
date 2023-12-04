<template>
	<div id="create-post">
		<div
			class="field"
			style="padding-left: 10%; padding-right: 10%"
		>
			<label class="label">Create new post</label>
			<form @submit.prevent="validateBeforeSubmit">
				<label class="label has-text-weight-normal mt-3">Title: </label>
				<input
					name="PostTitle"
					class="input is-link is-hovered"
					placeholder="Title"
					type="text"
					v-model="title"
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
					rows="3"
					v-model="body"
					placeholder="Write yor body here..."
					v-validate="'required|regex:[a-zA-Z]|min:2|max:250'"
				></textarea>
				<span
					v-show="errors.has('PostBody')"
					class="help is-danger"
					>{{ errors.first('PostBody') }}</span
				>
				<label class="label has-text-weight-normal mt-3">Select author: </label>
				<div>
					<div class="select is-link">
						<select
							name="authorSelect"
							v-model="selectedAuthorId"
							v-validate="'required'"
						>
							<option
								disabled
								value=""
								selected
							>
								-Select an author-
							</option>
							<option
								v-for="author in getAuthors"
								:key="author.id"
								:value="author.id"
							>
								{{ author.name }}
							</option>
						</select>
					</div>
					<span
						v-show="errors.has('authorSelect')"
						class="help is-danger"
						>{{ errors.first('authorSelect') }}</span
					>
				</div>
				<div style="padding-top: 10px">
					<button
						class="button is-primary"
						type="submit"
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
		name: 'CreatePost',
		data() {
			return {
				title: '',
				body: '',
				selectedAuthorId: '',
			};
		},
		methods: {
			...mapActions(['post_post', 'fetch_authors']),
			...mapMutations(['closeModal', 'pushNotification']),
			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.post_post({
							title: this.title,
							body: this.body,
							selectedAuthorId: this.selectedAuthorId,
						});
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
		computed: {
			...mapGetters(['getAuthors']),
		},
		created() {
			this.fetch_authors();
		},
	};
</script>
