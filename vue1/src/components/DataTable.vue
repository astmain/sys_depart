<template>
    <div class="data-table-container">
        <!-- 搜索区域 -->
        <div class="search-area" v-if="showSearch">
            <el-form :inline="true" :model="searchForm" class="search-form">
                <el-form-item v-for="item in searchFields" :key="item.prop" :label="item.label">
                    <el-input
                        v-if="item.type === 'input'"
                        v-model="searchForm[item.prop]"
                        :placeholder="item.placeholder || `请输入${item.label}`"
                        clearable
                        @keyup.enter="handleSearch"
                    />
                    <el-select
                        v-else-if="item.type === 'select'"
                        v-model="searchForm[item.prop]"
                        :placeholder="item.placeholder || `请选择${item.label}`"
                        clearable
                    >
                        <el-option
                            v-for="option in item.options"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        />
                    </el-select>
                    <el-date-picker
                        v-else-if="item.type === 'date'"
                        v-model="searchForm[item.prop]"
                        type="date"
                        :placeholder="item.placeholder || `请选择${item.label}`"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch" :icon="Search">搜索</el-button>
                    <el-button @click="handleReset" :icon="Refresh">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class="action-area" v-if="showActions">
            <el-button type="primary" @click="handleAdd" :icon="Plus">新增</el-button>
            <el-button type="danger" @click="handleBatchDelete" :icon="Delete" :disabled="!selectedRows.length">批量删除</el-button>
            <el-button @click="handleRefresh" :icon="Refresh">刷新</el-button>
        </div>

        <!-- 表格 -->
        <el-table
            ref="tableRef"
            :data="tableData"
            :height="tableHeight"
            :max-height="maxHeight"
            :stripe="stripe"
            :border="border"
            :row-key="rowKey"
            :default-expand-all="defaultExpandAll"
            :tree-props="treeProps"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :cell-class-name="cellClassName"
            :cell-style="cellStyle"
            :header-row-class-name="headerRowClassName"
            :header-row-style="headerRowStyle"
            :header-cell-class-name="headerCellClassName"
            :header-cell-style="headerCellStyle"
            :row-mouse-enter="onRowMouseEnter"
            :row-mouse-leave="onRowMouseLeave"
            :cell-click="onCellClick"
            :cell-dblclick="onCellDblclick"
            :row-click="onRowClick"
            :row-contextmenu="onRowContextmenu"
            :row-dblclick="onRowDblclick"
            :cell-mouse-enter="onCellMouseEnter"
            :cell-mouse-leave="onCellMouseLeave"
            :header-click="onHeaderClick"
            :header-contextmenu="onHeaderContextmenu"
            :sort-change="onSortChange"
            :filter-change="onFilterChange"
            :selection-change="onSelectionChange"
            :current-change="onCurrentChange"
            :header-dragend="onHeaderDragend"
            :expand-change="onExpandChange"
            :select-on-indeterminate="selectOnIndeterminate"
            :indent="indent"
            :lazy="lazy"
            :load="load"
            :show-summary="showSummary"
            :sum-text="sumText"
            :summary-method="summaryMethod"
            :span-method="spanMethod"
            :selectable="selectable"
            :reserve-selection="reserveSelection"
            :highlight-current-row="highlightCurrentRow"
            :current-row-key="currentRowKey"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <!-- 选择列 -->
            <el-table-column
                v-if="showSelection"
                type="selection"
                width="55"
                align="center"
                fixed="left"
            />

            <!-- 序号列 -->
            <el-table-column
                v-if="showIndex"
                type="index"
                label="序号"
                width="60"
                align="center"
                fixed="left"
            />

            <!-- 数据列 -->
            <el-table-column
                v-for="column in columns"
                :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :min-width="column.minWidth"
                :fixed="column.fixed"
                :render-header="column.renderHeader"
                :sortable="column.sortable"
                :sort-method="column.sortMethod"
                :sort-by="column.sortBy"
                :sort-orders="column.sortOrders"
                :resizable="column.resizable"
                :formatter="column.formatter"
                :show-overflow-tooltip="column.showOverflowTooltip"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || column.align || 'left'"
                :class-name="column.className"
                :label-class-name="column.labelClassName"
                :selectable="column.selectable"
                :reserve-selection="column.reserveSelection"
                :filters="column.filters"
                :filter-placement="column.filterPlacement"
                :filter-multiple="column.filterMultiple"
                :filter-method="column.filterMethod"
                :filtered-value="column.filteredValue"
            >
                <template #default="scope" v-if="column.slot">
                    <slot :name="column.slot" :row="scope.row" :column="scope.column" :$index="scope.$index"></slot>
                </template>
                <template #header="scope" v-if="column.headerSlot">
                    <slot :name="column.headerSlot" :column="scope.column" :$index="scope.$index"></slot>
                </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column
                v-if="showActions"
                label="操作"
                :width="actionWidth"
                :fixed="actionFixed"
                align="center"
            >
                <template #default="scope">
                    <el-button
                        v-for="action in actions"
                        :key="action.name"
                        :type="action.type || 'primary'"
                        :size="action.size || 'small'"
                        :icon="action.icon"
                        :disabled="action.disabled && action.disabled(scope.row)"
                        @click="handleAction(action.name, scope.row, scope.$index)"
                    >
                        {{ action.label }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-area" v-if="showPagination">
            <el-pagination
                v-model:current-page="pagination.currentPage"
                v-model:page-size="pagination.pageSize"
                :page-sizes="pagination.pageSizes"
                :total="pagination.total"
                :layout="pagination.layout"
                :background="pagination.background"
                :small="pagination.small"
                :hide-on-single-page="pagination.hideOnSinglePage"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script>
import { Search, Refresh, Plus, Delete } from '@element-plus/icons-vue'

export default {
    name: 'DataTable',
    components: {
        Search,
        Refresh,
        Plus,
        Delete
    },
    props: {
        // 表格数据
        data: {
            type: Array,
            default: () => []
        },
        // 列配置
        columns: {
            type: Array,
            default: () => []
        },
        // 操作按钮配置
        actions: {
            type: Array,
            default: () => []
        },
        // 搜索字段配置
        searchFields: {
            type: Array,
            default: () => []
        },
        // 分页配置
        pagination: {
            type: Object,
            default: () => ({
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
                total: 0,
                layout: 'total, sizes, prev, pager, next, jumper',
                background: true,
                small: false,
                hideOnSinglePage: false
            })
        },
        // 表格配置
        tableHeight: {
            type: [String, Number],
            default: 'auto'
        },
        maxHeight: {
            type: [String, Number],
            default: null
        },
        stripe: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        rowKey: {
            type: String,
            default: 'id'
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        treeProps: {
            type: Object,
            default: () => ({ children: 'children', hasChildren: 'hasChildren' })
        },
        // 显示控制
        showSearch: {
            type: Boolean,
            default: true
        },
        showActions: {
            type: Boolean,
            default: true
        },
        showSelection: {
            type: Boolean,
            default: false
        },
        showIndex: {
            type: Boolean,
            default: true
        },
        showPagination: {
            type: Boolean,
            default: true
        },
        // 操作列配置
        actionWidth: {
            type: [String, Number],
            default: 200
        },
        actionFixed: {
            type: String,
            default: 'right'
        },
        // 加载状态
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableData: [],
            searchForm: {},
            selectedRows: [],
            // 表格事件处理函数
            rowClassName: null,
            rowStyle: null,
            cellClassName: null,
            cellStyle: null,
            headerRowClassName: null,
            headerRowStyle: null,
            headerCellClassName: null,
            headerCellStyle: null,
            onRowMouseEnter: null,
            onRowMouseLeave: null,
            onCellClick: null,
            onCellDblclick: null,
            onRowClick: null,
            onRowContextmenu: null,
            onRowDblclick: null,
            onCellMouseEnter: null,
            onCellMouseLeave: null,
            onHeaderClick: null,
            onHeaderContextmenu: null,
            onSortChange: null,
            onFilterChange: null,
            onSelectionChange: null,
            onCurrentChange: null,
            onHeaderDragend: null,
            onExpandChange: null,
            selectOnIndeterminate: false,
            indent: 16,
            lazy: false,
            load: null,
            showSummary: false,
            sumText: '合计',
            summaryMethod: null,
            spanMethod: null,
            selectable: null,
            reserveSelection: false,
            highlightCurrentRow: false,
            currentRowKey: null
        }
    },
    watch: {
        data: {
            handler(newVal) {
                this.tableData = newVal
            },
            immediate: true
        },
        searchFields: {
            handler(newVal) {
                this.initSearchForm()
            },
            immediate: true
        }
    },
    methods: {
        // 初始化搜索表单
        initSearchForm() {
            const form = {}
            this.searchFields.forEach(field => {
                form[field.prop] = ''
            })
            this.searchForm = form
        },

        // 搜索
        handleSearch() {
            this.$emit('search', this.searchForm)
        },

        // 重置搜索
        handleReset() {
            this.initSearchForm()
            this.$emit('reset')
        },

        // 新增
        handleAdd() {
            this.$emit('add')
        },

        // 批量删除
        handleBatchDelete() {
            this.$emit('batch-delete', this.selectedRows)
        },

        // 刷新
        handleRefresh() {
            this.$emit('refresh')
        },

        // 操作按钮点击
        handleAction(actionName, row, index) {
            this.$emit('action', { actionName, row, index })
        },

        // 分页大小改变
        handleSizeChange(size) {
            this.$emit('size-change', size)
        },

        // 当前页改变
        handleCurrentChange(page) {
            this.$emit('current-change', page)
        },

        // 选择改变
        onSelectionChange(selection) {
            this.selectedRows = selection
            this.$emit('selection-change', selection)
        },

        // 获取选中的行
        getSelectedRows() {
            return this.selectedRows
        },

        // 清空选择
        clearSelection() {
            this.$refs.tableRef?.clearSelection()
        },

        // 切换行选择状态
        toggleRowSelection(row, selected) {
            this.$refs.tableRef?.toggleRowSelection(row, selected)
        },

        // 切换全选状态
        toggleAllSelection() {
            this.$refs.tableRef?.toggleAllSelection()
        },

        // 设置当前行
        setCurrentRow(row) {
            this.$refs.tableRef?.setCurrentRow(row)
        },

        // 获取当前行
        getCurrentRow() {
            return this.$refs.tableRef?.getCurrentRow()
        }
    }
}
</script>

<style scoped>
.data-table-container {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-area {
    margin-bottom: 20px;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 6px;
}

.search-form {
    margin: 0;
}

.search-form .el-form-item {
    margin-bottom: 0;
    margin-right: 20px;
}

.action-area {
    margin-bottom: 20px;
}

.action-area .el-button {
    margin-right: 10px;
}

.pagination-area {
    margin-top: 20px;
    text-align: right;
}

:deep(.el-table) {
    border-radius: 6px;
    overflow: hidden;
}

:deep(.el-table th) {
    background-color: #f5f7fa;
    color: #606266;
    font-weight: 600;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
    background: #fafafa;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
    background-color: #f5f7fa;
}
</style> 