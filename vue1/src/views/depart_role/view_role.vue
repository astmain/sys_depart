<template>
    <div>
        <nav style="display: flex; gap: 20px">
            <el-input v-model="tree_permiss.name"></el-input>
            <el-button type="primary" @click="save_permiss_menu_tree()">保存</el-button>
            <el-button type="" @click="del_depart_role()">删除</el-button>
        </nav>

        <nav style="font-weight: bold; font-size: 14px; margin: 10px 0">权限明细</nav>

        <el-tree style="width: 100%" :data="tree_permiss.data" :props="tree_permiss.props" :node-key="tree_permiss.props.id" :expand-on-click-node="false" highlight-current default-expand-all>
            <template #default="{ node, data }">
                <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px">
                    <span style="margin-right: 20px; font-weight: bold; font-size: 12px">{{ node.label }}</span>
                    <div style="display: flex; gap: 20px">
                        <div class="btn_normal" :class="{ btn_active: data.view }" @click="btn_click(data, 'view')">显示</div>
                        <div class="btn_normal" :class="{ btn_active: data.create }" @click="btn_click(data, 'create')">添加</div>
                        <div class="btn_normal" :class="{ btn_active: data.delete }" @click="btn_click(data, 'delete')">删除</div>
                        <div class="btn_normal" :class="{ btn_active: data.update }" @click="btn_click(data, 'update')">修改</div>
                        <div class="btn_normal" :class="{ btn_active: data.find }" @click="btn_click(data, 'find')">查询</div>
                    </div>
                </div>
            </template>
        </el-tree>
    </div>
</template>
<script>
//自定义
import { api } from '../../api.ts';
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
export default {
    data() {
        return {
            // 数据_权限树
            tree_permiss: {
                show: false,
                data: [],
                node: {},
                name: '',
                id: 0,
                props: {
                    children: 'children',
                    label: 'name',
                    nodeKey: 'id',
                },
            },
        };
    },
    methods: {
        async btn_click(data, kind) {
            console.log('btn_click:', data, kind);
            if (data[kind]) {
                data[kind] = !data[kind];
            } else {
                data[kind] = true;
            }
        }, //

        async find_permiss_menu_tree(node) {
            let res = await api.depart_role.find_permiss_menu_tree({ id: node.id });
            // console.log(`find_permiss_menu_tree---res:`, res);
            this.tree_permiss.data = res.permiss_menu_tree;
            this.tree_permiss.name = node.name;
            this.tree_permiss.id = node.id;
        }, //

        async save_permiss_menu_tree() {
            let res = await api.depart_role.save_permiss_menu_tree({ id: this.tree_permiss.id, name: this.tree_permiss.name, tree_data: this.tree_permiss.data });
            // console.log(`save_permiss_menu_tree---res:`, res);
            if (res.code === 200) {
                ElMessage.success('保存成功');
                this.$parent.find_depart_role_tree();
            } else {
                ElMessage.error('保存失败');
            }
        }, //

        async del_depart_role() {
            let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' });
            if (confirm != 'confirm') return;
            let res = await api.depart_role.del_depart_role({ id: this.tree_permiss.id });
            console.log(`222---res:`, res);
            if (res.code === 200) {
                ElMessage.success('删除成功');
                this.$parent.find_depart_role_tree();
                this.tree_permiss.show = false;
            } else {
                ElMessage.error('删除失败');
            }
        }, //
    }, ////

    async mounted() {}, ////
};
</script>

<style scoped>
.btn_active {
    color: white;
    cursor: pointer;
    border-radius: 4px;
    background-color: #45a0ff;
    transition: all 0.3s ease;
    &:hover {
        background-color: #79bbff;
    }
}

.btn_normal {
    box-sizing: border-box;
    padding: 2px 6px;
    font-size: 12px;
}
</style>
