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
      path: '/meeting',
      name: 'meeting',
      props: (route) => ({
        params : route.params,
        query: route.query
      }),
      component: () => import('./views/Meetings.vue'),
    },
    {
      path: '/statistic',
      name: 'statistic',
      props: (route) => ({
        params : route.params,
        query: route.query
      }),
      component: () => import('./views/Statistic.vue'),
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
