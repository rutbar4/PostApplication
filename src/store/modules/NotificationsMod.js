const state = {
	notifications: [],
};

const getters = {
	getNotifications: (state) => {
		return state.notifications;
	},
};

const mutations = {
	pushNotification: (state, notification) => {
		state.notifications.push(notification);
	},
	
	removeNotification: (state) => {
		if (state.notifications.length) {
			state.notifications.shift();
		}
	},
};

const actions = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
