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
    // {
    //   id: 1000092333,
    //   name: 'vip3',
    //   is_depart: false,
    //   remark: '请填写备注说明!',
    //   parent_id: 1000092
    // },
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



// arr: 数据数组, id: 目标id
function tool_get_parent_chidren(arr, id) {
  // 1. 获取自身
  const self = _.find(arr, { id });

  // 2. 获取所有父级
  function getParents(item, result = []) {
    if (!item || !item.parent_id) return result;
    const parent = _.find(arr, { id: item.parent_id });
    if (parent) {
      result.unshift(parent); // 从上往下
      return getParents(parent, result);
    }
    return result;
  }
  const parents = getParents(self);

  // 3. 获取所有子级
  function getChildren(item, result = []) {
    const children = _.filter(arr, { parent_id: item.id });
    if (children.length) {
      result.push(...children);
      children.forEach(child => getChildren(child, result));
    }
    return result;
  }
  const children = getChildren(self);

  return { parents, self, children };
}

// 用法示例
const result = tool_get_parent_chidren(arr, 1000092);
console.log(result);


