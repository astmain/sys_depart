import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export const router_menu_children = [
    { path: '/home', name: '首页', component: () => import('../views/home.vue') },
    { path: '/about', name: '关于', component: () => import('../views/about.vue') },
    { path: '/user', name: '用户管理', component: () => import('../views/user/user.vue') },
    { path: '/depart', name: '部门角色', component: () => import('../views/depart_role/index.vue') },
    {
        path: '/test1',
        name: '测试1',
        children: [
            {
                path: '/test1',
                name: '测试1_原始模版',
                component: () => import('../views/test1/test1.vue'),
            },

            {
                path: '/test2',
                name: '测试2_原始模版',
                component: () => import('../views/test1/test2.vue'),
            },
        ],
    },

    {
        path: '/mall',
        name: '商城',
        children: [
            {
                path: '/print_3d',
                name: '3D打印',
                component: () => import('../views/mall/print_3d/index.vue'),
            },
            {
                path: '/order_me',
                name: '我的订单',
                component: () => import('../views/mall/order_me/index.vue'),
            },

        ],
    },
];

// 路由配置
const routes = [
    { path: '/', redirect: '/home' }, //
    { path: '/login', name: 'login', component: () => import('../layout/login.vue') },
    { path: '/', component: () => import('../layout/layout.vue'), children: router_menu_children },
    { path: '/:pathMatch(.*)*', name: 'NotFound404', component: () => import('../layout/NotFound404.vue') }, // 404页面路由 - 必须放在最后，用于捕获所有未匹配的路径
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes as RouteRecordRaw[],
});

// 帮我写views_404页面,显示内容"抱歉您访问的页面不存在",并且整合到路由首页中
// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !localStorage.getItem('token')) {
        // @ts-ignore
        // if (to.path !== '/login' && !window?.BUS?.token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
