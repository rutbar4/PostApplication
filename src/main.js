import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './router/index';
import { store } from './store';
import VeeValidate from 'vee-validate';
import vueDebounce from 'vue-debounce';

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(vueDebounce);

const router = new VueRouter({
	routes: Routes,
	mode: 'history',
});

new Vue({
	render: (h) => h(App),
	store,
	router: router,
}).$mount('#app');
