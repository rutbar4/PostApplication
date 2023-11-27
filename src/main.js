import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './router/index';
import { store } from './store';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: Routes,
	mode: 'history',
});

new Vue({
	render: (h) => h(App),
	store,
	router: router,
	render: (h) => h(App),
	store,
	router: router,
}).$mount('#app');
