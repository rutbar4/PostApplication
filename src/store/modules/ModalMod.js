const state = {
	modal: '',
	isOpen: false,
	component: '',
};

const getters = {
	getComponent: (state) => state.component,
	getIsOpen: (state) => state.isOpen,
};

const mutations = {
	openModal: (state, component) => {
		state.isOpen = true;
		state.component = component;
	},
	
	closeModal: (state) => {
		state.isOpen = false;
		state.component = '';
	},
};

const actions = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
