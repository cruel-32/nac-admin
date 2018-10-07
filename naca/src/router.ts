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
      path: '/members',
      name: 'members',
      props: (route) => ({
        params : route.params,
        query: route.query
      }),
      component: () => import('./views/Members.vue'),
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
      path: '/member/:key',
      name: 'memberUpdate',
      props: (route) => ({
        params : route.params,
        query : route.query
      }),
      component: () => import('./views/MemberCreate.vue'),
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
  ],
});
