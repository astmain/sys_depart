import { api } from './api';
import { ElMessage } from 'element-plus';

let name = 'BUS';
let state = {
  count: 0,
  token: 'token',
  user: { name: '无用户名' },

  depart_role_tree: [],
  depart_tree: [],

  mall_order_curr: {}, //商城订单当前数据
  mall_order_paying_show: false, //商城订单显示待支付弹框

  find_depart_role_tree: async () => {
    const res: any = await api.depart_role.find_depart_role_tree({ name: '' });
    if (res.code === 200) {
      return { depart_role_tree: res.depart_role_tree, depart_tree: res.depart_tree };
    } else {
      ElMessage.error('基础数据接口异常', res.message);
      return { depart_role_tree: [], depart_tree: [] };
    }
  },
};

let persist = {
  //这里存储默认使用的是session
  enabled: true,
  strategies: [
    { key: 'token', paths: ['token'], storage: window.localStorage }, //sessionStorage
    { key: 'user', paths: ['user'], storage: window.localStorage }, //sessionStorage
    { key: 'count', paths: ['count'], storage: window.localStorage }, //sessionStorage
  ],
};

export default { name, state, persist };
