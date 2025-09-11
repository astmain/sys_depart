<template>
    <div class="table-example">
        <h2>数据表格示例</h2>
        
        <DataTable
            :data="tableData"
            :columns="columns"
            :actions="actions"
            :search-fields="searchFields"
            :pagination="pagination"
            :loading="loading"
            :show-selection="true"
            @search="handleSearch"
            @reset="handleReset"
            @add="handleAdd"
            @batch-delete="handleBatchDelete"
            @refresh="handleRefresh"
            @action="handleAction"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @selection-change="handleSelectionChange"
        >
            <!-- 自定义列插槽 -->
            <template #status="{ row }">
                <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                    {{ row.status === 1 ? '启用' : '禁用' }}
                </el-tag>
            </template>

            <template #avatar="{ row }">
                <el-avatar :src="row.avatar" :size="40">
                    {{ row.name.charAt(0) }}
                </el-avatar>
            </template>
        </DataTable>

        <!-- 新增/编辑对话框 -->
        <el-dialog
            v-model="dialogVisible"
            :title="dialogTitle"
            width="600px"
            @close="handleDialogClose"
        >
            <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-width="100px"
            >
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="form.age" :min="1" :max="120" />
                </el-form-item>
                <el-form-item label="电话" prop="tel">
                    <el-input v-model="form.tel" placeholder="请输入电话" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input
                        v-model="form.remark"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import DataTable from '../../components/DataTable.vue'
import { api } from '../../api.ts'

export default {
    name: 'TableExample',
    components: {
        DataTable
    },
    data() {
        return {
            loading: false,
            tableData: [],
            dialogVisible: false,
            dialogTitle: '新增用户',
            form: {
                id: null,
                name: '',
                age: 18,
                tel: '',
                email: '',
                status: 1,
                remark: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
                ]
            },
            // 列配置
            columns: [
                { prop: 'id', label: 'ID', width: 80, align: 'center' },
                { prop: 'avatar', label: '头像', width: 80, align: 'center', slot: 'avatar' },
                { prop: 'name', label: '姓名', width: 120 },
                { prop: 'age', label: '年龄', width: 80, align: 'center' },
                { prop: 'tel', label: '电话', width: 150 },
                { prop: 'email', label: '邮箱', width: 200 },
                { prop: 'status', label: '状态', width: 100, align: 'center', slot: 'status' },
                { prop: 'remark', label: '备注', minWidth: 200, showOverflowTooltip: true },
                { prop: 'createTime', label: '创建时间', width: 180, align: 'center' }
            ],
            // 操作按钮配置
            actions: [
                { name: 'edit', label: '编辑', type: 'primary', size: 'small', icon: 'Edit' },
                { name: 'delete', label: '删除', type: 'danger', size: 'small', icon: 'Delete' }
            ],
            // 搜索字段配置
            searchFields: [
                { prop: 'name', label: '姓名', type: 'input', placeholder: '请输入姓名' },
                { prop: 'tel', label: '电话', type: 'input', placeholder: '请输入电话' },
                { prop: 'status', label: '状态', type: 'select', placeholder: '请选择状态', options: [
                    { label: '全部', value: '' },
                    { label: '启用', value: 1 },
                    { label: '禁用', value: 0 }
                ]}
            ],
            // 分页配置
            pagination: {
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
                total: 0,
                layout: 'total, sizes, prev, pager, next, jumper',
                background: true
            }
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        // 加载数据
        async loadData() {
            this.loading = true
            try {
                const res = await api.user.findListAll()
                this.tableData = res.data || []
                this.pagination.total = this.tableData.length
            } catch (error) {
                console.error('加载数据失败:', error)
                this.$message.error('加载数据失败')
            } finally {
                this.loading = false
            }
        },

        // 搜索
        handleSearch(searchForm) {
            console.log('搜索条件:', searchForm)
            // 这里可以根据搜索条件过滤数据
            this.loadData()
        },

        // 重置
        handleReset() {
            this.loadData()
        },

        // 新增
        handleAdd() {
            this.dialogTitle = '新增用户'
            this.form = {
                id: null,
                name: '',
                age: 18,
                tel: '',
                email: '',
                status: 1,
                remark: ''
            }
            this.dialogVisible = true
        },

        // 批量删除
        handleBatchDelete(selectedRows) {
            if (selectedRows.length === 0) {
                this.$message.warning('请选择要删除的数据')
                return
            }
            
            this.$confirm(`确定要删除选中的 ${selectedRows.length} 条数据吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    for (const row of selectedRows) {
                        await api.user.del({ id: row.id })
                    }
                    this.$message.success('删除成功')
                    this.loadData()
                } catch (error) {
                    console.error('删除失败:', error)
                    this.$message.error('删除失败')
                }
            })
        },

        // 刷新
        handleRefresh() {
            this.loadData()
        },

        // 操作按钮点击
        handleAction({ actionName, row, index }) {
            if (actionName === 'edit') {
                this.handleEdit(row)
            } else if (actionName === 'delete') {
                this.handleDelete(row)
            }
        },

        // 编辑
        handleEdit(row) {
            this.dialogTitle = '编辑用户'
            this.form = { ...row }
            this.dialogVisible = true
        },

        // 删除
        handleDelete(row) {
            this.$confirm(`确定要删除用户 "${row.name}" 吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await api.user.del({ id: row.id })
                    this.$message.success('删除成功')
                    this.loadData()
                } catch (error) {
                    console.error('删除失败:', error)
                    this.$message.error('删除失败')
                }
            })
        },

        // 分页大小改变
        handleSizeChange(size) {
            this.pagination.pageSize = size
            this.loadData()
        },

        // 当前页改变
        handleCurrentChange(page) {
            this.pagination.currentPage = page
            this.loadData()
        },

        // 选择改变
        handleSelectionChange(selection) {
            console.log('选中的行:', selection)
        },

        // 提交表单
        async handleSubmit() {
            try {
                await this.$refs.formRef.validate()
                
                if (this.form.id) {
                    // 编辑
                    await api.user.update(this.form)
                    this.$message.success('更新成功')
                } else {
                    // 新增
                    await api.user.create(this.form)
                    this.$message.success('创建成功')
                }
                
                this.dialogVisible = false
                this.loadData()
            } catch (error) {
                console.error('提交失败:', error)
                this.$message.error('提交失败')
            }
        },

        // 对话框关闭
        handleDialogClose() {
            this.$refs.formRef?.resetFields()
        }
    }
}
</script>

<style scoped>
.table-example {
    padding: 20px;
}

.table-example h2 {
    margin-bottom: 20px;
    color: #303133;
}
</style> 