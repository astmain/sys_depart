<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <nav style="padding: 0; margin: 0">路由:{{ this.$route.name }}</nav>

    <nav class="uno_card">
      <el-radio-group class="flex-row-between" v-model="option_value" @change="find_mall_order_list()">
        <el-radio v-for="item in option_list" :value="item.value" border>{{ item.label }}</el-radio>
      </el-radio-group>
    </nav>

    <nav class="uno_card">
      <el-table :data="mall_order_list" style="width: 100%" size="default" height="400" highlight-current-row show-overflow-tooltip>
        <el-table-column label="序号" type="index" width="60px" />
        <el-table-column label="订单状态" prop="status" width="100px" />
        <el-table-column label="订单号" prop="order_number" width="280px" />
        <el-table-column label="创建时间" prop="createdAt" width="220px" :formatter="formatter_dayjs" />

        <el-table-column label="图片" prop="url" width="70px">
          <template #default="scope">
            <img :src="scope.row?.details[0]?.img_url" alt="" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button style="margin: 0px" @click="show_dialog_paying(scope.row)" type="primary" text>立即支付</el-button>
            <el-button style="margin: 0px" @click="del_mall_order(scope.row.id)" type="info" text>删除</el-button>
            <el-button style="margin: 0px" v-if="scope.row.status !== '已取消订单'" @click="update_mall_order(scope.row, '已取消订单')" type="primary" text>取消订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </nav>

    <dialog_mall_order_paying />

    <dialog_mall_order_paying />
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { api } from '@/api';
import { isok_delete_confirm } from '@/plugins/isok_delete_confirm';
import dialog_mall_order_paying from './dialog_mall_order_paying.vue';
import dayjs from 'dayjs';

export default {
  components: {
    dialog_mall_order_paying,
  },
  data() {
    return {
      mall_order_list: [],
      option_value: '', //空表示:全部订单
      option_list: [
        { label: '全部订单', value: '' },
        { label: '待支付', value: '待支付' },
        { label: '待收货', value: '待收货' },
        { label: '已取消订单', value: '已取消订单' },
        { label: '已支付', value: '已支付' },
        { label: '已完结', value: '已完结' },
      ],
    };
  },

  methods: {
    // 查询-商城订单
    async find_mall_order_list() {
      let res = await api.mall_order.find_mall_order_list({ status: this.option_value });
      if (res.code !== 200) return ElMessage.error(res.msg);
      // ElMessage.success('查询成功');
      this.mall_order_list = res.mall_order_list;
    }, //

    // 删除-商城订单
    async del_mall_order(id) {
      if ((await isok_delete_confirm()) === false) return;
      let res = await api.mall_order.del_mall_order({ id });
      if (res.code !== 200) return ElMessage.error(res.msg);
      ElMessage.success('删除成功');
      await this.find_mall_order_list();
    }, //

    //更新-商城订单
    async update_mall_order(row, status) {
      let res = await api.mall_order.update_mall_order({ ...row, status });
      if (res.code !== 200) return ElMessage.error(res.msg);
      ElMessage.success('成功:' + status);
      await this.find_mall_order_list();
    }, //

    //显示-待支付弹框
    async show_dialog_paying(row) {
      BUS.mall_order_curr = row;
      BUS.mall_order_paying_show = true;
    }, //

    formatter_dayjs(row, column, cellValue) {
      return dayjs(cellValue).format('YYYY年MM月DD日 HH:mm:ss');
    },
  }, ////

  async mounted() {
    this.find_mall_order_list();
  }, ////
};
</script>

<style scoped>
:deep(.el-radio__input) {
  display: none !important;
}

:deep(.el-radio) {
  padding: 0 !important;
  width: 100px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  border-radius: 8px !important;
}

:deep(.el-radio__label) {
  padding: 0 !important;
}
</style>
