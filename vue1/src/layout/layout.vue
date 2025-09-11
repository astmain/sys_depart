<template>
    <el-container style="height: 100vh">
        <!-- 顶部 -->
        <App_header />
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside width="200px">
                <el-menu class="menu_height" :default-active="$route.path" router active-text-color="#ffd04b" background-color="#24292E" text-color="#fff">
                    <template v-for="route in routerMenuChildren" :key="route.path">
                        <!-- 有子菜单的情况 -->
                        <el-sub-menu v-if="route.children && route.children.length > 0" :index="route.path">
                            <template #title>
                                <span>{{ route.name }}</span>
                            </template>
                            <el-menu-item v-for="child in route.children" :key="child.path" :index="child.path">
                                {{ child.name }}
                            </el-menu-item>
                        </el-sub-menu>
                        <!-- 没有子菜单的情况 -->
                        <el-menu-item v-else :index="route.path">
                            {{ route.name }}
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>

            <!-- 右侧内容 -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
        <!-- 底部  -->
        <el-footer style="width: 100%; padding: 0">
            <App_footer />
        </el-footer>
    </el-container>
</template>

<script>
import App_header from './App_header.vue';
import App_footer from './App_footer.vue';
import { router_menu_children } from '../router';
import { api } from '@/api';
console.log(router_menu_children);
export default {
    components: {
        App_header,
        App_footer,
    },
    name: 'layout',
    data() {
        return {
            routerMenuChildren: router_menu_children,
        };
    },
    methods: {
        async find_depart_role_tree() {
            const res = await api.depart_role.find_depart_role_tree({ name: '' });
            if (res.code === 200) {
                // debugger
                BUS.depart_role_tree = res.depart_role_tree;
                BUS.depart_tree = res.depart_tree;
            } else {
                this.$message.error('基础数据接口异常', res.message);
            }
        },
    },
    async mounted() {
        await this.find_depart_role_tree();
    },
};
</script>

<style scoped>
.menu_height {
    /* height: calc(100vh - 60px); */
    /* height: calc(100vh - 100px); */
    height: 100%;
    border-right: none;
}
</style>
