import { mount, createLocalVue } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Pagination from '../../src/components/Pagination.vue';
import { describe, it, expect, beforeEach } from 'vitest';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Pagination component', () => {
	let methods;
	let state;
	let actions;
	let store;

	beforeEach(() => {
		state = {
			pages: 4,
			currentPage: 1,
			totalPages: 5,
			visiblePages: 5,
			totalPosts: 20,
			postsPerPage: 4,
		};
		store = new Vuex.Store({
			modules: {
				PostsMod: {
					state,
					actions,
					getters: {
						totalPages: (state) => state.pages,
						getCurrentPage: (state) => state.currentPage,
						getTotalPosts: (state) => state.totalPosts,
						getPostsPerPage: (state) => state.postsPerPage,
					},
				},
			},
		});
	});

	it('should call *changePage* action', () => {
		const wrapper = shallowMount(Pagination, {
			store,
			localVue,
			propsData: {
				totalPages: 5,
			},
		});
		const spy = vi.spyOn(wrapper.vm, 'changePage');
		const next_page = wrapper.find('#next_button');

		next_page.trigger('click');
		next_page.trigger('click');

		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('button text is Next', () => {
		const wrapper = shallowMount(Pagination, { store, localVue });

		const next_button = wrapper.find('#next_button');

		expect(next_button.text()).toBe('Next');
	});

	it('button text is Previous', () => {
		const wrapper = shallowMount(Pagination, { store, localVue });

		const previous_button = wrapper.find('#previous_button');

		expect(previous_button.text()).toBe('Previous');
	});

	it('button Previous is disabled in page 1', () => {
		const wrapper = shallowMount(Pagination, {
			store,
			localVue,
			propsData: {
				totalPages: 5,
				currentPage: 1,
			},
		});

		const previous_button = wrapper.find('#previous_button');

		expect(previous_button.element.disabled).toBe(true);
	});

	it('button Next is disabled in last page no. 5', () => {
		const wrapper = shallowMount(Pagination, {
			store,
			localVue,
			propsData: {
				totalPages: 5,
				currentPage: 5,
			},
		});

		const next_button = wrapper.find('#next_button');

		expect(next_button.element.disabled).toBe(true);
	});

	it('button Previous is NOT disabled in page 3', () => {
		const wrapper = shallowMount(Pagination, {
			store,
			localVue,
			propsData: {
				totalPages: 5,
				currentPage: 3,
			},
		});

		const previous_button = wrapper.find('#previous_button');

		expect(previous_button.element.disabled).toBe(false);
	});

	it('button Next is NOT disabled in last page no. 1', () => {
		const wrapper = shallowMount(Pagination, {
			store,
			localVue,
			propsData: {
				totalPages: 5,
				currentPage: 1,
			},
		});

		const next_button = wrapper.find('#next_button');

		expect(next_button.element.disabled).toBe(false);
	});
});
