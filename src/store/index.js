import Vue from 'vue';
import Vuex from 'vuex';
import AuthorsMod from './modules/AuthorsMod';
import PostsMod from './modules/PostsMod';
import NotificationsMod from './modules/NotificationsMod';
import ModalMod from './modules/ModalMod';
import APIPlugin from './plugins/apiPlugin';

Vue.use(Vuex);

export const store = new Vuex.Store({
	strict: true,
	modules: {
		NotificationsMod,
		AuthorsMod,
		PostsMod,
		ModalMod,
	},
	plugins: [APIPlugin],
});
