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
      component: Home,
    },
    {
      path: '/account',
      name: 'account',
      props : (route) => ({
        params : route.params,
        query : route.query
      }),
      component : () => import('./views/Account.vue'),
    },
    {
      path: '/register',
      name: 'register',
      props : (route) => ({
        params : route.params,
        query : route.query
      }),
      component : () => import('./views/Register.vue'),
    },
    {
      path: '/register',
      name: 'register',
      props : (route) => ({
        params : route.params,
        query : route.query
      }),
      component : () => import('./views/Register.vue'),
    },
    {
      path: '/management',
      name: 'management',
      props : (route) => ({
        params : route.params,
        query : route.query
      }),
      component : () => import('./views/Management.vue'),
    },
    {
      path: '/meetings',
      name: 'meetings',
      props: (route) => ({
        params : route.params,
        query: route.query
      }),
      component: () => import('./views/Meetings.vue'),
    },
    {
      path: '/statistics',
      name: 'statistics',
      props: (route) => ({
        params : route.params,
        query: route.query
      }),
      component: () => import('./views/Statistics.vue'),
    },
    {
      path: '/member/:id',
      name: 'memberView',
      props: (route) => ({
        params : route.params,
        query : route.query
      }),
      component: () => import('./views/MemberView.vue'),
    },
  ],
});
