import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if `hidden: true`, this route will not show in the sidebar (default is false)
    alwaysShow: true             if set to true, it will always show the root menu
                                 if not set, only show with nested mode if there are more than one route under its children
  }
*/

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    base: process.env.BASE_URL,
    routes: [
        { path: '/404', component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue') },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            name: 'Dashboard',
            meta: { hidden: true },
            children: [{
                path: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
            }],
        },
        {
            path: '/example',
            component: Layout,
            redirect: '/example/table',
            name: 'Example',
            meta: { title: 'Example', icon: 'example' },
            children: [
                {
                    path: 'table',
                    name: 'Table',
                    component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
                    meta: { title: 'Table', icon: 'table' },
                },
                {
                    path: 'tree',
                    name: 'Tree',
                    component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
                    meta: { title: 'Tree', icon: 'tree' },
                },
            ],
        },
        {
            path: '/tools',
            component: Layout,
            redirect: '/tools/tools',
            name: 'tools',
            meta: { title: '工具', icon: 'example' },
            children: [
                {
                    path: 'regex',
                    name: 'regex',
                    component: () => import(/* webpackChunkName: "regex" */ '@/views/tools/regex.vue'),
                    meta: { title: '正则表达式', icon: 'regex' },
                },
                {
                    path: 'script',
                    name: 'script',
                    component: () => import(/* webpackChunkName: "script" */ '@/views/tools/script.vue'),
                    meta: { title: '测试脚本', icon: 'script' },
                },
            ],
        },
        {
            path: '/form',
            component: Layout,
            children: [
                {
                    path: 'index',
                    name: 'Form',
                    component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
                    meta: { title: 'Form', icon: 'form' },
                },
            ],
        },
        { path: '*', redirect: '/404' },
    ],
});
