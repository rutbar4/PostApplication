import Authors from '../views/Authors.vue';
import Posts from '../views/Posts/Posts.vue';
import PostsHome from '../views/Posts/PostsHome.vue';
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
			{
				path: '/posts',
				component: PostsHome,
				name: 'Posts',
				children: [
					{ path: '', component: Posts },
					{ path: ':id', component: SinglePost, name: 'SinglePost' },
				],
			},
			{ path: '/authors', component: Authors, name: 'Authors' },
		],
	},
	{ path: '/*', component: NotFound },
];
