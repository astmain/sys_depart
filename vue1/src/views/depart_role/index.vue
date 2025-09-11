<template>
    <dialog_add_depart_role ref="dialog_add_depart_role" />

    <header class="uno_card flex mb-2 justify-between user_header">
        <div class="flex gap-2">
            <el-input v-model="search_form.name"> <template #prepend>部门/角色</template> </el-input>
        </div>
        <div>
            <el-button type="primary" @click="find_depart_role_tree()">搜索</el-button>
            <el-button type="success" @click="add_depart_role()">新增</el-button>
        </div>
    </header>

    <main class="uno_card flex">
        <nav>
            <el-tree
                ref="tree_depart_ref"
                style="width: 300px; height: 800px; overflow: auto"
                :data="tree_depart.data"
                :props="tree_depart.props"
                :node-key="tree_depart.props.nodeKey"
                :current-node-key="tree_depart.currentNodeKey"
                :expand-on-click-node="false"
                highlight-current
                default-expand-all
                @node-click="tree_left_click"
                @node-contextmenu="tree_ritht_click"
            >
            </el-tree>
        </nav>
        <nav>
            <view_depart v-show="currentComponent === 'view_depart'" ref="view_depart" />
            <view_role v-show="currentComponent === 'view_role'" ref="view_role" />
        </nav>
    </main>
</template>
<script>
//自定义
import { api } from '../../api.ts';
import view_role from './view_role.vue';
import view_depart from './view_depart.vue';
import dialog_add_depart_role from './dialog_add_depart_role.vue';
export default {
    components: {
        view_role,
        view_depart,
        dialog_add_depart_role,
    },
    data() {
        return {
            search_form: {
                name: '',
            },
            currentComponent: 'view_depart',
            tree_depart: {
                data: [],
                node: {},
                user_list: [],
                currentNodeKey: null,
                props: {
                    label: 'name',
                    nodeKey: 'id',
                },
            },
        };
    },
    methods: {
        async find_depart_role_tree() {
            const res = await api.depart_role.find_depart_role_tree(this.search_form);
            console.log(`find_depart_role_tree---res:`, res);
            if (res.code === 200) {
                this.tree_depart.data = res.depart_role_tree;
            } else {
                this.$message.error('基础数据接口异常', res.message);
            }
        }, //

        add_depart_role() {
            this.$refs.dialog_add_depart_role.show = true;
            console.log(`111---this.$refs.dialog_add_depart_role:`, this.$refs);
        }, //

        // 菜单左键点击
        async tree_left_click(node) {
            console.log('tree_left_click---node:', node);
            this.tree_depart.node = node;
            if (node.is_depart) {
                this.currentComponent = 'view_depart';
                this.$refs.view_depart.find_depart_info(this.tree_depart.node.id);
            } else {
                this.currentComponent = 'view_role';
                this.$refs.view_role.find_permiss_menu_tree(this.tree_depart.node);
            }
        }, //

        async tree_ritht_click(node) {
            console.log('tree_ritht_click---node:', node);
        }, //
    }, ////

    async mounted() {
        this.find_depart_role_tree(this.search_form);
    }, ////
};
</script>

<style scoped></style>
