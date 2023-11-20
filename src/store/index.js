import Vue from 'vue';
import Vuex from 'vuex';
import NotificationsMod from './modules/NotificationsMod';

Vue.use(Vuex);

export const store = new Vuex.Store({
	strict: true,
	modules: {
		NotificationsMod,
	},
});
