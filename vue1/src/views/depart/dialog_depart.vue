<template>
    <el-dialog class="dialog_depart" v-model="show" top="60px" width="600px" height="600px" title="编辑-组织" draggable>
        <nav style="display: flex; gap: 20px">
            <pre style="flex: 1"></pre>
            <el-button type="primary" @click="upsert_depart_role()">保存</el-button>
            <el-button type="" @click="del_depart_role()">删除</el-button>
        </nav>

        <nav style="font-weight: bold; font-size: 14px; margin: 10px 0"></nav>

        <el-form :model="form" label-width="60px" label-position="left">
            <el-form-item label="id">
                <el-input v-model="form.id" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>

            <el-form-item label="备注">
                <el-input v-model="form.remark" :autosize="{ minRows: 8, maxRows: 8 }" type="textarea" placeholder="请填写备注" />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
//自定义
import { api } from '../../api.ts';
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
export default {
    data() {
        return {
            show: false,
            form: {
                id: 0,
                name: '',
                is_depart: true,
                parent_id: 0,
                remark: '请填写备注',
            },
        };
    },
    methods: {
        async find_depart_info(id) {
            let res = await api.depart_role.find_depart_info({ id: id });
            console.error(`222---res:`, res);
            if (res.code === 200) {
                this.form.id = res.depart_info.id;
                this.form.name = res.depart_info.name;
                this.form.parent_id = res.depart_info.parent_id;
                this.form.is_depart = res.depart_info.is_depart;
            } else {
                ElMessage.error(res.message);
            }
        },
        async del_depart_role() {
            let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' });
            if (confirm != 'confirm') return;
            let res = await api.depart_role.del_depart_role({ id: this.form.id });
            console.error(`222---res:`, res);
            if (res.code === 200) {
                ElMessage.success(res.message);
                this.$parent.find_depart_role_tree();
                this.show = false;
            } else {
                ElMessage.error(res.message);
            }
        },
        async upsert_depart_role() {
            let res = await api.depart_role.upsert_depart_role(this.form);
            console.error(`222---res:`, res);
            if (res.code === 200) {
                ElMessage.success(res.message);
                this.$parent.find_depart_role_tree();
            } else {
                ElMessage.error(res.message);
            }
        },
    }, ////

    async mounted() {}, ////
};
</script>

<style scoped></style>
