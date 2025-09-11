<template>
    <el-dialog v-if="show" v-model="show" title="新增-部门/角色" draggable top="60px" width="50vw" class="uno_card">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="primary" @click="met1()">met1</el-button>
        <el-form ref="formRef" :model="form" label-width="120px" label-position="left" labelWidth="100px">
            <el-form-item label="类型">
                <div class="flex gap-2">
                    <el-radio-group v-model="form.is_depart" size="default">
                        <el-radio-button label="部门" :value="true" />
                        <el-radio-button label="角色" :value="false" />
                    </el-radio-group>
                </div>
            </el-form-item>

            <el-form-item
                label="名称"
                prop="name"
                required
                :rules="[
                    { required: true, message: '请输入名称' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符' },
                ]"
            >
                <el-input v-model="form.name" />
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" type="textarea" :rows="4" />
            </el-form-item>

            <el-form-item label="部门/角色">
                <el-cascader v-model="form.selectedValue" :options="form.options" :props="cascaderProps" style="width: 100%" />
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import { api } from '@/api';
import { ElMessage } from 'element-plus';
//自定义

export default {
    data() {
        return {
            show: false,
            form: {
                name: '',
                remark: '未填写备注',
                selectedValue: [],
                is_depart: true,
                options: [],
            },
            cascaderProps: {
                value: 'id',
                label: 'name',
                children: 'children',
                checkStrictly: true, // ✅ 允许选择任意级别
            },
        };
    },
    methods: {
        save() {
            this.$refs.formRef.validate(async (valid) => {
                if (valid) {
                    console.log('save', this.form);
                    const parent_id = this.form.selectedValue.at(-1);
                    const new_form = { name: this.form.name, parent_id: parent_id, remark: this.form.remark, is_depart: this.form.is_depart };
                    const res = await api.depart_role.create_depart_role(new_form);

                    if (res.code === 200) {
                        ElMessage.success('保存成功');
                        this.show = false;
                    } else {
                        ElMessage.error(res.message);
                    }
                } else {
                    ElMessage.error('表单校验失败');
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        met1() {
            this.options = window.BUS.depart_role_tree;
            console.log('met1', this.$route.name);
            console.log('met1', this.options);
            console.log('met1', BUS.depart_role_tree);
        },
    }, ////

    async mounted() {
        const res = await BUS.find_depart_role_tree();
        this.form.options = res.depart_tree;
        console.log('mounted--- this.form.options', this.form.options);      
    }, ////
};
</script>

<style scoped></style>
