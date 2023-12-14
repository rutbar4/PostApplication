import { mount, createLocalVue } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Pagination from '../../src/components/Pagination.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { all } from 'axios';

const localVue = createLocalVue();
localVue.use(Vuex);

const createWrapper = (currentPage, totalPages) => {
	const state = {
		totalPosts: 20,
		postsPerPage: 4,
		currentPage: 1,
	};

	const store = new Vuex.Store({
		modules: {
			PostsMod: {
				state,
				getters: {
					totalPages: (state) => state.totalPages,
					getPostsPerPage: () => state.postsPerPage,
					getCurrentPage: (state) => state.currentPage,
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

function findByText(wrap, selector, text) {
	return wrap.findAll(selector).filter((n) => n.text().match(text));
}

describe('Pagination component buttons', () => {
	it('buttons text is Next And Previous', () => {
		const wrapper = createWrapper(1, 5);

		const next_button = wrapper.find('#next_button');
		const previous_button = wrapper.find('#previous_button');

		expect(next_button.text()).toBe('Next');
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

	it('both Next and Previous buttons disabled when totalPageCount=1', () => {
		const wrapper = createWrapper(1, 1);

		const previous_button = wrapper.find('#previous_button');
		const next_button = wrapper.find('#next_button');

		expect(previous_button.element.disabled).toBe(true);
		expect(next_button.element.disabled).toBe(true);
	});
});

describe('Pagination component buttons', () => {
	it('should call *changePage* action', () => {
		const wrapper = createWrapper(1, 5);
		const spy = vi.spyOn(wrapper.vm, 'changePage');
		const next_page = wrapper.find('#next_button');

		next_page.trigger('click');
		next_page.trigger('click');

		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should call *changePage* action one times and page emitted should be 3 when current=2', () => {
		const wrapper = createWrapper(2, 6);
		const next_button = wrapper.find('#next_button');

		next_button.trigger('click');

		expect(wrapper.emitted().changePage[0][0]).toBe(3);
	});

	it('should call *changePage* action one times and page emitted should be 2 when current=1', () => {
		const wrapper = createWrapper(1, 20);
		const next_button = wrapper.find('#next_button');

		next_button.trigger('click');

		expect(wrapper.emitted().changePage[0][0]).toBe(2);
	});

	it('should call *changePage* action one times and page emitted should be 11 when current=10', () => {
		const wrapper = createWrapper(10, 20);
		const next_button = wrapper.find('#next_button');

		next_button.trigger('click');

		expect(wrapper.emitted().changePage[0][0]).toBe(11);
	});

	it('should show all 6 buttons out of 6 pages', () => {
		const numberOfPages = 6;
		const wrapper = createWrapper(1, numberOfPages);
		const buttonIndices = Array.from(
			{ length: numberOfPages },
			(_, index) => index + 1,
		);

		const buttonExistsChecks = buttonIndices.map((index) =>
			findByText(wrapper, 'button', index).exists(),
		);

		for (let i = 0; i < numberOfPages; i++) {
			expect(buttonExistsChecks[i]).toBe(true);
		}
	});

	it('should show all 7 buttons out of 7 pages', () => {
		const numberOfPages = 7;
		const wrapper = createWrapper(1, numberOfPages);
		const buttonIndices = Array.from(
			{ length: numberOfPages },
			(_, index) => index + 1,
		);

		const buttonExistsChecks = buttonIndices.map((index) =>
			findByText(wrapper, 'button', index).exists(),
		);

		for (let i = 0; i < numberOfPages; i++) {
			expect(buttonExistsChecks[i]).toBe(true);
		}
	});

	it('should not show button 7 out of 8 pages when currentPage=1', () => {
		const numberOfPages = 8;
		const wrapper = createWrapper(1, numberOfPages);

		const allButtons = wrapper.findAll('button');
		const allButtonsText = allButtons.wrappers.map((button) => button.text());

		expect(allButtonsText.includes('7')).toBe(false);
	});

	it('should not show 2 button out of 8 pages when currentPage=7', () => {
		const numberOfPages = 8;
		const wrapper = createWrapper(7, numberOfPages);

		const allButtons = wrapper.findAll('button');
		const allButtonsText = allButtons.wrappers.map((button) => button.text());

		expect(allButtonsText.includes('2')).toBe(false);
	});

	it('should not show button 7 out of 8 pages when currentPage=4', () => {
		const numberOfPages = 8;
		const wrapper = createWrapper(4, numberOfPages);

		const allButtons = wrapper.findAll('button');
		const allButtonsText = allButtons.wrappers.map((button) => button.text());

		expect(allButtonsText.includes('7')).toBe(false);
	});

	it('should not show button 2 out of 8 pages when currentPage=5', () => {
		const numberOfPages = 8;
		const wrapper = createWrapper(5, numberOfPages);

		const allButtons = wrapper.findAll('button');
		const allButtonsText = allButtons.wrappers.map((button) => button.text());

		expect(allButtonsText.includes('2')).toBe(false);
	});

	it('should not show buttons 7 and 8 out of 9 pages when currentPage=1', () => {
		const numberOfPages = 9;
		const wrapper = createWrapper(1, numberOfPages);
		const notShownPages = [7, 8];

		const allButtons = wrapper.findAll('button');
		const allButtonsText = allButtons.wrappers.map((button) => button.text());

		for (let i = 0; i < notShownPages.length; i++) {
			expect(allButtonsText.includes(notShownPages[i].toString())).toBe(false);
		}
	});

	it('should not show buttons 2 and 3 out of 9 pages when currentPage=6', () => {
		const numberOfPages = 9;
		const wrapper = createWrapper(6, numberOfPages);
		const notShownPages = [2, 3];

		const allButtons = wrapper.findAll('button');
		const allButtonsText = allButtons.wrappers.map((button) => button.text());

		for (let i = 0; i < notShownPages.length; i++) {
			expect(allButtonsText.includes(notShownPages[i].toString())).toBe(false);
		}
	});

	it('should not show buttons 2 and 8 out of 9 pages when currentPage=5', () => {
		const numberOfPages = 9;
		const wrapper = createWrapper(5, numberOfPages);
		const notShownPages = [2, 8];

		const allButtons = wrapper.findAll('button');
		const allButtonsText = allButtons.wrappers.map((button) => button.text());

		for (let i = 0; i < notShownPages.length; i++) {
			expect(allButtonsText.includes(notShownPages[i].toString())).toBe(false);
		}
	});

	it('should be 9 button when PageCount=100', () => {
		const numberOfPages = 100;
		const wrapper = createWrapper(1, numberOfPages);

		const numberOfButtons = wrapper.findAll('button').length;

		expect(numberOfButtons).toBe(9);
	});

	it('should be 3 buttons when PageCount=1', () => {
		const numberOfPages = 1;
		const wrapper = createWrapper(1, numberOfPages);

		const numberOfButtons = wrapper.findAll('button').length;

		expect(numberOfButtons).toBe(3);
	});
});

describe('Pagination component component sequence', () => {
	it('should pagination text be "Previous  1 … 2  3  4  5  6 … 9  Next" with 9 pages total', () => {
		const wrapper = createWrapper(1, 9);

		expect(wrapper.text()).toBe('Previous  1 … 2  3  4  5  6 … 9  Next');
	});

	it('should pagination text be "Previous  1  2  3  4  5 … 6  Next" with 6 pages total when in page 2', () => {
		const wrapper = createWrapper(2, 6);

		expect(wrapper.text()).toBe('Previous  1  2  3  4  5 … 6  Next');
	});

	it('should pagination text be "Previous  1 … 2  3  4  5  6 … 9  Next" with 4 pages total', () => {
		const wrapper = createWrapper(1, 4);

		expect(wrapper.text()).toBe('Previous  1  2  3  4  Next');
	});

	it('should pagination text be "Previous  1  2  3  4  5  Next" with 5 pages total', () => {
		const wrapper = createWrapper(1, 5);

		expect(wrapper.text()).toBe('Previous  1  2  3  4  5  Next');
	});

	it('should pagination text be "Previous  1 … 2  3  4  5  6 … 9  Next" with 1 page total', () => {
		const wrapper = createWrapper(1, 1);

		expect(wrapper.text()).toBe('Previous  1  Next');
	});
});

describe('Pagination component visible pages and ellipses', () => {
	it('should not show more than 5 buttons in pagination middle between ellipses', () => {
		const wrapper = createWrapper(1, 11);

		const displayedPages = wrapper.vm.displayedPages;

		//length should always be 5 when active when page number >6
		expect(displayedPages.length).toBe(5);

		//should not include first page
		expect(displayedPages[0]).not.toBe(1);

		//should not include last page
		expect(displayedPages[displayedPages.length - 1]).not.toBe(
			wrapper.props().totalPages,
		);
	});

	it('should show only one button in pagination middle', () => {
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

	it('should show ellipses when PageCount=7', () => {
		const wrapper = createWrapper(1, 7);

		const right_ellipsis = wrapper.find('#right_ellipsis');
		const left_ellipsis = wrapper.find('#left_ellipsis');

		expect(right_ellipsis.exists()).toBe(true);
		expect(left_ellipsis.exists()).toBe(true);
	});

	it('should show right ellipse when PageCount=7 and CurrentPage=2', () => {
		const wrapper = createWrapper(2, 7);

		const right_ellipsis = wrapper.find('#right_ellipsis');
		const left_ellipsis = wrapper.find('#left_ellipsis');

		expect(right_ellipsis.exists()).toBe(true);
		expect(left_ellipsis.exists()).toBe(false);
	});

	it('should show left ellipse when PageCount=7 and CurrentPage=6', () => {
		const wrapper = createWrapper(6, 7);

		const right_ellipsis = wrapper.find('#right_ellipsis');
		const left_ellipsis = wrapper.find('#left_ellipsis');

		expect(right_ellipsis.exists()).toBe(false);
		expect(left_ellipsis.exists()).toBe(true);
	});

	it('should NOT show ellipses when PageCount=5', () => {
		const wrapper = createWrapper(1, 5);

		const right_ellipsis = wrapper.find('#right_ellipsis');
		const left_ellipsis = wrapper.find('#left_ellipsis');

		expect(right_ellipsis.exists()).toBe(false);
		expect(left_ellipsis.exists()).toBe(false);
	});

	it('should only show right ellipse when PageCount=6, CurrentPage=2', () => {
		const wrapper = createWrapper(2, 6);

		const right_ellipsis = wrapper.find('#right_ellipsis');
		const left_ellipsis = wrapper.find('#left_ellipsis');

		expect(right_ellipsis.exists()).toBe(true);
		expect(left_ellipsis.exists()).toBe(false);
	});

	it('should only show left ellipse when PageCount=6, CurrentPage=4', () => {
		const wrapper = createWrapper(4, 6);

		const right_ellipsis = wrapper.find('#right_ellipsis');
		const left_ellipsis = wrapper.find('#left_ellipsis');

		expect(right_ellipsis.exists()).toBe(false);
		expect(left_ellipsis.exists()).toBe(true);
	});
});
