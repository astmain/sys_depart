<template>
    <h3 style="padding: 0; margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>
    <depart_premiss_tree_dialog ref="depart_premiss_tree_dialog"></depart_premiss_tree_dialog>
    <dialog_depart ref="dialog_depart"></dialog_depart>
    <nav>
        <el-button @click="find_depart_role_tree()">find_depart_role_tree</el-button>
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

    <el-card v-show="menu_show" :style="{ position: 'fixed', left: menu_left + 'px', top: menu_top + 'px' }" :body-style="{ padding: '12px' }">
        <div v-for="(item, i) in menu_opt">
            <div style="margin-top: 8px" @click="menu_opt_click(item)">{{ item.title }}</div>
        </div>
    </el-card>
</template>
<script>
//自定义
import { api } from '../../api.ts';
import depart_premiss_tree_dialog from './depart_premiss_tree_dialog.vue';
import dialog_depart from './dialog_depart.vue';
export default {
    components: {
        depart_premiss_tree_dialog,
        dialog_depart,
    },
    data() {
        return {
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

            // 数据_右键菜单
            menu_show: false,
            menu_left: 0,
            menu_top: 0,
            menu_opt: [],
            menu_original: [
                // 职位
                { is_depart: false, title: '查看' },
                // 组织
                { is_depart: true, title: '查看-组织' },
            ],
        };
    },
    methods: {
        met1() {
            console.log('met1', this.$route.name);
        },

        async find_depart_role_tree() {
            let res = await api.depart_role.find_depart_tree();
            console.log(`111---res:`, res);
            this.tree_depart.data = res.depart_tree;
        }, //

        // 菜单左键点击
        async tree_left_click(node) {
            console.log('tree_left_click---node:', JSON.parse(JSON.stringify(node)));
            this.menu_show = false;
            this.tree_depart.node = node;
        }, //

        // 菜单右键点击
        async tree_ritht_click(event, data, Node, element) {
            this.tree_left_click(data);
            this.menu_show = true;
            this.menu_left = event.x;
            this.menu_top = event.y;
            this.$refs.tree_depart_ref.setCurrentKey(data.id); //右键点击时高亮
            this.tree_depart.node = data;
            console.log('tree_ritht_click---data:', JSON.parse(JSON.stringify(data)));
            this.menu_opt = this.menu_original.filter((item) => item.is_depart === data.is_depart);
        }, //

        // 菜单-选项-点击
        async menu_opt_click(item) {
            console.log('menu_opt_click:', JSON.parse(JSON.stringify(item)));
            //组织:修改-组织
            if (item.is_depart && item.title === '查看-组织') {
                this.$refs.dialog_depart.show = true;
                this.$refs.dialog_depart.find_depart_info(this.tree_depart.node.id);
            }
            // 角色=================================================================
            //角色:修改-角色-权限
            else if (!item.is_depart && item.title === '查看') {
                this.$refs.depart_premiss_tree_dialog.tree_permiss.show = true;
                this.$refs.depart_premiss_tree_dialog.find_permiss_menu_tree(this.tree_depart.node);
            }
        },
    }, ////

    async mounted() {
        this.find_depart_role_tree();
        document.body.addEventListener('click', () => (this.menu_show = false));
    }, ////
};
</script>

<style scoped></style>
