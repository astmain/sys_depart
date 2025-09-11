import { defineComponent, ref, watch } from 'vue';
import { ElDialog, ElButton, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElMessage, ElMessageBox } from 'element-plus';
import { reactive } from 'vue';
import { api } from '@/api';

export default defineComponent({
    name: 'UserDialogView',
    props: {
        isEdit: { type: Boolean, default: true }, // 是否为编辑模式
        row: { type: Object, default: () => ({}) }, // 用户数据
    },
    emits: ['update:visible', 'confirm', 'cancel'],
    setup(props, { emit, expose }) {
        // 暴露方法给父组件
        expose({
            row: props.row,
            isEdit: props.isEdit,
        });
        const formData = $ref({ ...props.row });
        console.log('formData', formData);

        const rules = reactive({
            name: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
            ],
            tel: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
            ],
        });

        const formRef = ref();

        const submitForm = async () => {
            console.log('submitForm', formData);
            try {
                let data = await formRef.value.validate();
                ElMessage.success('表单验证通过！');
                console.log('表单数据:', formData);
                let ctx = document.querySelector('.ElTree1111111').__vueParentComponent.ctx;
                console.log('ctx', ctx);
                let CheckedNodes = ctx.getCheckedNodes();
                console.log('CheckedNodes', CheckedNodes);
                let role_ids = CheckedNodes.map((item) => ({ id: item.id }));
                console.log('role_ids', role_ids);
                if (role_ids.length <= 0) return ElMessage.error('部门角色不能为空');
                let res = await api.user.save_user({ id: props.row.id, name: formData.name, tel: formData.tel, role_ids: role_ids });
                console.log(`111---res:`, res);
                if (res.code == 200) {
                    ElMessage.success('更新成功');
                } else {
                    ElMessage.error(res.msg);
                }
                // 这里可以发送数据到后端
            } catch (error) {
                ElMessage.error('表单验证失败，请检查输入');
                console.error('表单验证错误:', error);
            }
        };

        const resetForm = () => {
            formRef.value.resetFields();
        };

        function clearForm() {
            Object.keys(formData).forEach((key) => {
                if (Array.isArray(formData[key])) {
                    formData[key] = [];
                } else {
                    formData[key] = '';
                }
            });
        }

        async function del_user() {
            let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' });
            if (confirm != 'confirm') return;
            let res = await api.user.del_user({ id: props.row.id });
            console.log('res', res);
            if (res.code == 200) {
                ElMessage.success('删除成功');
            } else {
                ElMessage.error(res.msg);
            }
        }

        return () => (
            <div class="flex-col gap-1">
                <header class="uno_card h-[10vh] flex gap-1">
                    <ElButton type="primary" onClick={submitForm}>
                        提交
                    </ElButton>
                    <ElButton onClick={resetForm}>重置</ElButton>
                    <ElButton onClick={clearForm}>清空</ElButton>
                    <ElButton onClick={del_user}>删除</ElButton>
                </header>

                <main class="uno_card flex gap-1" style={{ height: '65vh' }}>
                    <ElForm style={{ flex: 1 }} ref={formRef} model={formData} rules={rules} label-width="80px" label-position="left" size="default">
                        <ElFormItem label="用户名" prop="name" label-width="80px" label-position="left">
                            <ElInput v-model={formData.name} />
                        </ElFormItem>
                        <ElFormItem label="电话" prop="tel" label-width="80px" label-position="left">
                            <ElInput v-model={formData.tel} />
                        </ElFormItem>
                    </ElForm>

                    <ElTree
                        class="ElTree1111111"
                        style={{ flex: 1, overflow: 'auto' }}
                        data={BUS.depart_role_tree}
                        props={{ children: 'children', label: 'name' }}
                        node-key="id"
                        current-node-key="id"
                        expand-on-click-node={false}
                        defaultCheckedKeys={props.row.role_ids.map((item) => item.id)}
                        highlight-current
                        show-checkbox
                        default-expand-all
                    ></ElTree>
                </main>
                <div>{props.isEdit ? '编辑模式' : '新增模式'}</div>
            </div>
        );
    },
});
