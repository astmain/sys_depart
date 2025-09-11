<template>
  <el-dialog v-if="BUS.mall_order_paying_show" v-model="BUS.mall_order_paying_show" title="待支付" draggable>
    <nav class="flex">
      <span class="w-[100px]">创建时间</span>
      <span>{{ formatter_dayjs(BUS.mall_order_curr.createdAt) }}</span>
    </nav>

    <nav class="flex">
      <span class="w-[100px]">订单号</span>
      <span>{{ BUS.mall_order_curr.order_number }}</span>
    </nav>

    <nav class="flex">
      <span class="w-[100px]">订单金额</span>
      <span>{{ BUS.mall_order_curr.price }}</span>
    </nav>

    <img src="@/assets/unpaid_qr_code.jpg" style="width: 100px; height: 100px" />

    <!-- <pre>{{ BUS.mall_order_curr }} </pre> -->
  </el-dialog>
</template>
<script>
//自定义
import dayjs from 'dayjs';

export default {
  data() {
    return {};
  },
  methods: {
    formatter_dayjs(cellValue) {
      return dayjs(cellValue).format('YYYY年MM月DD日 HH:mm:ss');
    },
  }, ////

  async mounted() {}, ////
};
</script>

<style scoped></style>
