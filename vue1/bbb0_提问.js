import _ from 'lodash';
const arr = [
    {
      id: 1,
      name: '大宇三维打印',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: null
    },
    {
      id: 10000,
      name: '客户',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 1
    },
    {
      id: 20000,
      name: '技术部',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 1
    },
    {
      id: 30000,
      name: '泉州分公司',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 1
    },
    {
      id: 30001,
      name: '财务部',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 30000
    },
    {
      id: 30002,
      name: '业务部',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 30000
    },
    {
      id: 40000,
      name: '德化分公司',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 1
    },
    {
      id: 40001,
      name: '财务部',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 40000
    },
    {
      id: 40002,
      name: '业务部',
      is_depart: true,
      remark: '请填写备注说明!',
      parent_id: 40000
    },
    {
      id: 1000091,
      name: 'vip1',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 10000
    },
    {
      id: 1000092,
      name: 'vip2',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 10000
    },
    {
      id: 2000091,
      name: '主管',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 20000
    },
    {
      id: 2000092,
      name: '职员',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 20000
    },
    {
      id: 3000191,
      name: '主管',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 30001
    },
    {
      id: 3000192,
      name: '职员',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 30001
    },
    {
      id: 3000291,
      name: '主管',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 30002
    },
    {
      id: 3000292,
      name: '职员',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 30002
    },
    {
      id: 4000191,
      name: '主管',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 40001
    },
    {
      id: 4000192,
      name: '职员',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 40001
    },
    {
      id: 4000291,
      name: '主管',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 40002
    },
    {
      id: 4000292,
      name: '职员',
      is_depart: false,
      remark: '请填写备注说明!',
      parent_id: 40002
    }
  ]
  

// 使用lodash  获取下面的数据  封装成函数名tool_get_parent_chidren,参数是arr,返回值是result
// 我想根据id1000092,获取所有的父级和子级别


