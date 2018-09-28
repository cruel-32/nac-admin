import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      props : true,
      component: Home,
    },
    {
      path: '/management',
      name: 'management',
      props : true,
      component: () => import('./views/Management.vue'),
    },
    {
      path: '/stat',
      name: 'statistics',
      props : true,
      component: () => import('./views/Statistics.vue'),
    },
    {
      path: '/member/:id',
      name: 'memberView',
      props : true,
      component: () => import('./views/MemberView.vue'),
    },
  ],
});
