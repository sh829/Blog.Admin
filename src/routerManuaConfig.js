import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/Layout.vue'
import store from "./store";

import Login from './views/Login.vue'
import NotFound from './views/403.vue'
import Welcome from './views/Welcome'

import Table from './views/User/Users.vue'
import Roles from './views/User/Roles.vue'

import Module from './views/Permission/Module.vue'
import Permission from './views/Permission/Permission.vue'
import Assign from './views/Permission/Assign.vue'

import Form from './views/Form/Form.vue'
import Charts from './views/Form/Charts.vue'


import Blogs from './views/Blog/Blogs.vue'
import Bugs from './views/Tibug/Bugs.vue'

import Advisory from './views/PartyAdvisory/Advisory.vue'

import Thanks from './views/Thanks'
import {saveRefreshtime} from "./api/api";
import NoPage from "./views/404";
import TestOne from "./views/TestShow/TestOne";
import BookInfo from "./views/PartyBook/BookInfo.vue"
import AddGraduation from "./views/AddGraduation"
import GraduationStatistics from "./views/GraduationStatistics/Index.vue"
Vue.use(Router)


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/404', component: NoPage, name: 'NoPage',
            meta: {
                title: 'NoPage',
                requireAuth: false,
                NoNeedHome: true // 添加该字段，表示不需要home模板
            },
            hidden: true
        },
        
        {
            path: '/403', component: NotFound, name: 'NotFound',
            meta: {
                title: '首页',
                NoTabPage: true,
                requireAuth: false
            },
            hidden: true
        },
        {
            path: '/AddGraduation', component: AddGraduation, name: '毕业生统计',
            meta: {
                title: 'AddGraduation',
                requireAuth: false,
                NoNeedHome: true // 添加该字段，表示不需要home模板
            },
            hidden: true
        },
        {
            path: '/Thanks', component: Thanks, name: 'Thanks',
            meta: {
                title: 'Thanks',
                requireAuth: false
            },
            hidden: true
        },
        {
            path: '/',
            component: Welcome,
            name: 'QQ欢迎页',
            iconCls: 'fa-qq',//图标样式class
            // hidden: true,
            meta: {
                title: 'QQ欢迎页',
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
            iconCls: 'fa-address-card',//图标样式class
            meta: {
                title: '登录',
                NoTabPage: true,
                NoNeedHome: true // 添加该字段，表示不需要home模板
            },
            hidden: true
        },
        {
            path: '/',
            component: Layout,
            name: '用户角色管理',
            iconCls: 'fa-users',//图标样式class
            children: [
                {
                    path: '/Admin/Users', component: Table, name: '用户管理',
                    meta: {
                        title: '用户管理',
                        requireAuth: true
                    }
                },
                {
                    path: '/Admin/Roles', component: Roles, name: '角色管理',
                    meta: {
                        title: '角色管理',
                        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
            ]
        },
        {
            path: '/',
            component: Layout,
            name: '菜单权限管理',
            iconCls: 'fa-sitemap',//图标样式class
            children: [
                {
                    path: '/Permission/Modules', component: Module, name: '接口管理',
                    meta: {
                        title: '接口管理',
                        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
                {
                    path: '/Permission/Menu', component: Permission, name: '菜单管理',
                    meta: {
                        title: '菜单管理',
                        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
                {
                    path: '/Permission/Assign', component: Assign, name: '权限分配',
                    meta: {
                        title: '权限分配',
                        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                    }
                },
            ]
        },
        {
            path: '/',
            component: Layout,
            name: '报表管理',
            iconCls: 'fa-line-chart ',//图标样式class
            children: [
                {
                    path: '/Chart/From', component: Form, name: '表单Form',
                    meta: {
                        title: '表单Form',
                        requireAuth: true
                    }
                },
                {
                    path: '/Chart/Charts', component: Charts, name: '图表Chart',
                    meta: {
                        title: '图表Chart',
                        requireAuth: true
                    }
                },
            ]
        },
        {
            path: '/Tibug',
            component: Bugs,
            name: '问题管理',
            iconCls: ' fa-bug',//图标样式class
            // hidden: true,
            meta: {
                title: '问题管理',
                requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/GraduationStatistics',
            component: GraduationStatistics,
            name: '毕业生信息管理',
            iconCls: ' fa-bug',//图标样式class
            // hidden: true,
            meta: {
                title: '毕业生信息管理',
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/Blogs',
            component: Blogs,
            name: '博客管理',
            iconCls: ' fa-file-word-o',//图标样式class
            // hidden: true,
            meta: {
                title: '博客管理',
                requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/',
            component: Layout,
            name: '咨询信息',
            iconCls: 'fa-line-chart ',//图标样式class
            children: [
                {
                    path: '/PartyAdvisory/Advisory', component: Advisory, name: '咨询信息',
                    meta: {
                        title: '咨询信息',
                        requireAuth: false
                    }
                },
            ]
        },
        // {
        //     path: '/PartyAdvisory/Advisory',
        //     component: Advisory,
        //     name: '咨询信息',
        //     iconCls: ' fa-file-word-o',//图标样式class
        //     // hidden: true,
        //     meta: {
        //         title: '咨询信息',
        //         requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
        //     }
        // },
        {
            path: '/',
            component: Layout,
            name: '预定信息',
            iconCls: 'fa-line-chart ',//图标样式class
            children: [
                {
                    path: '/PartyBook/BookInfo', component: BookInfo, name: '预定信息',
                    meta: {
                        title: '预定信息',
                        requireAuth: false
                    }
                },
            ]
        },
        {
            path: '/',
            component: Layout,
            name: '测试管理',
            iconCls: 'fa-line-chart ',//图标样式class
            children: [
                {
                    path: '/TestShow/TestOne', component: TestOne, name: '测试页1',
                    meta: {
                        title: '测试页1',
                        requireAuth: true
                    }
                },
            ]
        },
        {
            path: '*',
            hidden: true,
            redirect: {path: '/404'}
        }
    ]
})

export default router;
