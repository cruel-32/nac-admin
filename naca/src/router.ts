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
      path: '/meeting',
      name: 'meetingCreate',
      props: (route) => ({
        params : route.params,
        query: route.query
      }),
      component: () => import('./views/MeetingCreate.vue'),
    },
    {
      path: '/meeting/:key',
      name: 'meetingUpdate',
      props: (route) => ({
        params : route.params,
        query: route.query
      }),
      component: () => import('./views/MeetingCreate.vue'),
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
      path: '/member',
      name: 'memberCreate',
      props: (route) => ({
        params : route.params,
        query : route.query
      }),
      component: () => import('./views/MemberCreate.vue'),
    },
    {
      path: '/member/:id',
      name: 'memberUpdate',
      props: (route) => ({
        params : route.params,
        query : route.query
      }),
      component: () => import('./views/MemberCreate.vue'),
    },
  ],
});
