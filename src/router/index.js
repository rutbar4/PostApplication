import Authors from '../views/Authors.vue';
import Posts from '../views/Posts.vue';
import SinglePost from '../views/SinglePost.vue';
import NotFound from '../views/NotFound.vue';
import Home from '../views/Home.vue';

export default [
	{
		path: '/',
		name: 'Home',
		component: Home,
		redirect: { name: 'Posts' },
		children: [
			{ path: '/posts', component: Posts, name: 'Posts' },
			{ path: '/authors', component: Authors, name: 'Authors' },
		],
	},
	{ path: '/singlePost/:id', component: SinglePost },
	{ path: '/*', component: NotFound },
];
