<template>
    <header class="uno_card flex mb-2 justify-between user_header">
        <div class="flex gap-2">
            <el-input v-model="search_form.name"> <template #prepend>姓名</template> </el-input>
            <el-input v-model="search_form.tel"> <template #prepend>电话</template> </el-input>
        </div>
        <div>
            <el-button type="primary" @click="find_user_list_BY_depart_id_BY_name_BY_tel()">搜索</el-button>
            <el-button type="" @click="clear_search()">清空</el-button>
            <el-button type="success" @click="add_user()">新增</el-button>
        </div>
    </header>

    <main class="uno_card flex h-full user_main">
        <el-tree
            class="user_tree_left"
            ref="ele-tree"
            style="width: 250px; height: auto; overflow: auto"
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

        <!-- 为el-card增加遮罩层根据loading状态 -->
        <div class="div_width" style="flex: 1; position: relative">
            <el-table-v2 :columns="table.columns" :data="table.data" :width="800" :height="600" fixed :estimated-row-height="77" scrollbar-always-on :expand-column-key="table.columns[0].key">
            </el-table-v2>

            <!-- 遮罩层 -->
            <div v-show="table.loading" class="loading">加载中...</div>
            <footer style="border-top: 1px solid #e6e6e6; font-size: 14px; font-weight: 600; color: #909399" class="flex justify-center items-center gap-2">
                <span>用户数:</span>
                <span>{{ table.data.length }}</span>
                <span>禁用数:</span>
                <span>{{ table.data.length }}</span>
            </footer>
        </div>

        <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="用户信息" draggable top="60px" width="50vw" class="uno_card">
            <user_dialog_view ref="user_dialog_view" :is-edit="isEditMode" :row="currentUserData" />
        </el-dialog>
    </main>
</template>
<script lang="jsx">
import dayjs from 'dayjs';
import { ref, render, reactive } from 'vue';
import { ElMessageBox, ElTag } from 'element-plus';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElSwitch, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup, ElButton, ElMessage } from 'element-plus';

//自定义
import { api } from '../../api.ts';
import user_dialog_view from './user_dialog_view.jsx';

export default {
    components: {
        user_dialog_view,
    },
    data() {
        return {
            // 搜索
            search_form: { name: '', tel: '' },

            // 弹框
            dialogVisible: false,
            dialogTitle: '用户信息',
            isEditMode: false,
            currentUserData: {},

            // 树形控件
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
            // 表格
            div_width: 0,
            table: {
                columns: [
                    { key: 'id', dataKey: 'id', title: `序号`, width: 60 },
                    { key: 'name', dataKey: 'name', title: '姓名', width: 80 },
                    { key: 'tel', dataKey: 'tel', title: '电话', width: 180, maxWidth: 5000 },
                    // { key: 'createdAt', dataKey: 'createdAt', title: '创建时间', width: 200, cellRenderer: ({ rowData }) => dayjs(rowData.createdAt).format('YYYY-MM-DD HH:mm:ss') },
                    {
                        key: 'depart_list',
                        dataKey: 'depart_list',
                        title: '部门数',
                        width: 200,
                        cellRenderer: ({ rowData }) => {
                            let depart_list = rowData.depart_list;
                            let depart_list_name = depart_list.map((item) => item.name).join('、');
                            return (
                                <ElTooltip placement="top" content={depart_list_name}>
                                    <ElTag> {depart_list.length}</ElTag>
                                </ElTooltip>
                            );
                        },
                    },

                    {
                        key: 'operations',
                        title: '操作',
                        width: 150,
                        cellRenderer: (row) => (
                            <ElButton type="primary" onClick={() => this.look_info(row.rowData)}>
                                查看
                            </ElButton>
                        ),
                    },
                ],
                data: [],
                loading: false,
            },
        };
    },
    methods: {
        clear_search() {
            this.search_form = { name: '', tel: '' };
            this.find_user_list_BY_depart_id_BY_name_BY_tel();
        },

        async find_user_list_BY_depart_id_BY_name_BY_tel() {
            this.table.loading = true;
            let form = { depart_id: this.tree_depart.node.id, name: this.search_form.name, tel: this.search_form.tel };
            console.log(`111---:`, form);
            let res = await api.user.find_user_list_BY_depart_id_BY_name_BY_tel(form);
            console.log(`find_user_list---res:`, JSON.parse(JSON.stringify(res)));
            if (res.code === 200) {
                this.table.data = res.user_list;
            } else {
                ElMessage.error('失败');
            }
            this.table.loading = false;
        },

        async find_depart_role_tree() {
            let res = await api.depart_role.find_depart_role_tree({ name: '' });
            console.log(`111---res:`, res);
            this.tree_depart.data = res.depart_role_tree;
        }, //

        // 菜单左键点击
        async tree_left_click(node) {
            console.log('tree_left_click---node:', JSON.parse(JSON.stringify(node)));
            this.tree_depart.node = node;
            this.find_user_list_BY_depart_id_BY_name_BY_tel();
        }, //

        // 菜单右键点击
        async tree_ritht_click(event, data, Node, element) {}, //

        async get_div_height() {
            document.querySelector('.div_width');
            this.div_width = document.querySelector('.div_width').clientWidth - 50;
            // console.error(`div_width:`, this.div_width);
        }, //

        async add_user() {
            this.isEditMode = false;
            this.currentUserData = {
                name: '',
                tel: '',
                depart_list: [],
                role_ids: [],
            };
            this.dialogVisible = true;
        },

        async look_info(row) {
            console.log('查看用户信息:', row);
            this.isEditMode = true;
            this.currentUserData = { ...row };
            this.dialogVisible = true;
        },
    }, ////

    async mounted() {
        await this.find_depart_role_tree();
        this.tree_depart.node.id = 1;
        this.$refs['ele-tree'].setCurrentKey(1); //默认树形控件选中1
        this.find_user_list_BY_depart_id_BY_name_BY_tel();
        document.body.addEventListener('click', () => (this.menu_show = false));
        window.addEventListener('resize', this.get_div_height);
        this.get_div_height();
    }, ////
};
</script>

<style scoped>
/*树形控件点击是高亮字体加粗 */

:deep(.user_tree_left.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content .el-tree-node__label) {
    color: #409eff !important;
    font-weight: bold !important;
}

/*树形控件点击是背景透明 */
:deep(.user_tree_left.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
    background-color: transparent !important;
}

/* 遮罩层样式 */
.loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border-radius: 20px;
}

/* 表格样式设置头部高度*/
:deep(.el-table-v2__header-row) {
    height: 24px !important;
}

/* 表格样式设置行高 */
:deep(.el-table-v2__row-depth-0) {
    height: 77px !important;
}

/* 展开数据不显示背景颜色 */
:deep(.el-table-v2__row-depth-1:hover) {
    background-color: transparent !important;
}

/* 展开箭头隐藏 */
:deep(.el-table-v2__expand-icon) {
    display: none;
    color: transparent;
}
</style>
