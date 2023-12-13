import { mount, createLocalVue } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Pagination from '../../src/components/Pagination.vue';
import { describe, it, expect, beforeEach } from 'vitest';

const localVue = createLocalVue();
localVue.use(Vuex);

const createWrapper = (currentPage, totalPages) => {
	const state = {
		pages: 4,
		totalPages,
		visiblePages: 5,
		totalPosts: 20,
		postsPerPage: 4,
	};

	const store = new Vuex.Store({
		modules: {
			PostsMod: {
				state,
				actions: {},
				getters: {
					totalPages: (state) => state.pages,
					getCurrentPage: () => currentPage,
					getTotalPosts: () => state.totalPosts,
					getPostsPerPage: () => state.postsPerPage,
				},
			},
		},
	});

	return shallowMount(Pagination, {
		store,
		localVue,
		propsData: {
			totalPages,
			currentPage,
		},
	});
};

describe('Pagination component', () => {
	it('button text is Next', () => {
		const wrapper = createWrapper(1, 5);

		const next_button = wrapper.find('#next_button');

		expect(next_button.text()).toBe('Next');
	});

	it('button text is Previous', () => {
		const wrapper = createWrapper(1, 5);

		const previous_button = wrapper.find('#previous_button');

		expect(previous_button.text()).toBe('Previous');
	});

	it('button Previous is disabled in page 1', () => {
		const wrapper = createWrapper(1, 5);

		const previous_button = wrapper.find('#previous_button');

		expect(previous_button.element.disabled).toBe(true);
	});

	it('button Next is disabled in last page no. 5', () => {
		const wrapper = createWrapper(5, 5);

		const next_button = wrapper.find('#next_button');

		expect(next_button.element.disabled).toBe(true);
	});

	it('button Previous is NOT disabled in page 3', () => {
		const wrapper = createWrapper(3, 5);

		const previous_button = wrapper.find('#previous_button');

		expect(previous_button.element.disabled).toBe(false);
	});

	it('button Next is NOT disabled in last page no. 1', () => {
		const wrapper = createWrapper(1, 5);

		const next_button = wrapper.find('#next_button');

		expect(next_button.element.disabled).toBe(false);
	});

	it('should call *changePage* action', () => {
		const wrapper = createWrapper(1, 5);
		const spy = vi.spyOn(wrapper.vm, 'changePage');
		const next_page = wrapper.find('#next_button');

		next_page.trigger('click');
		next_page.trigger('click');

		expect(spy).toHaveBeenCalledTimes(2);
	});

	// it('should call *changePage* action two times and be in page 3', () => {
	// 	const wrapper = shallowMount(Pagination, {
	// 		store,
	// 		localVue,
	// 		propsData: {
	// 			totalPages: 5,
	// 		},
	// 	});
	// 	const currentPage = wrapper.props().currentPage;
	// 	const next_page = wrapper.find('#next_button');

	// 	next_page.trigger('click');
	// 	next_page.trigger('click');

	// 	expect(currentPage).toBe(3);
	// });

	it('should pagination text be "Previous  1 … 2  3  4  5  6 … 9  Next" with 9 pages total', () => {
		const wrapper = createWrapper(1, 9);

		expect(wrapper.text()).toBe('Previous  1 … 2  3  4  5  6 … 9  Next');
	});

	it('pagination middle buttons should not be more than 5', () => {
		const wrapper = createWrapper(1, 11);

		const displayedPages = wrapper.vm.displayedPages;

		//length should always be 5 when active when page number >7
		expect(displayedPages.length).toBe(5);

		//should not include first page
		expect(displayedPages[0]).not.toBe(1);

		//should not include last page
		expect(displayedPages[displayedPages.length - 1]).not.toBe(
			wrapper.props().totalPages,
		);
	});

	it('pagination middle buttons should not be more than 5', () => {
		const wrapper = createWrapper(1, 3);

		const displayedPages = wrapper.vm.displayedPages;

		//length should be 1 when there 3 pages
		expect(displayedPages.length).toBe(1);

		//should not include first page
		expect(displayedPages[0]).not.toBe(1);

		//should not include last page
		expect(displayedPages[displayedPages.length - 1]).not.toBe(
			wrapper.props().totalPages,
		);
	});

	it('should pagination text be ', () => {
		const wrapper = createWrapper(1, 3);

		const displayedPages = wrapper.vm.displayedPages;

		//length should be 1 when there 3 pages
		expect(displayedPages.length).toBe(1);

		//should not include first page
		expect(displayedPages[0]).not.toBe(1);

		//should not include last page
		expect(displayedPages[displayedPages.length - 1]).not.toBe(
			wrapper.props().totalPages,
		);
	});
});
