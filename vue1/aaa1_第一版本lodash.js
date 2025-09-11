const arr = [
    {
        id: 1,
        name: '大宇三维打印',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: null,
        tb_user: [],
    },
    {
        id: 10000,
        name: '客户',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 1,
        tb_user: [],
    },
    {
        id: 20000,
        name: '技术部',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 1,
        tb_user: [],
    },
    {
        id: 30000,
        name: '泉州分公司',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 1,
        tb_user: [],
    },
    {
        id: 30001,
        name: '财务部',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 30000,
        tb_user: [],
    },
    {
        id: 30002,
        name: '业务部',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 30000,
        tb_user: [],
    },
    {
        id: 40000,
        name: '德化分公司',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 1,
        tb_user: [],
    },
    {
        id: 40001,
        name: '财务部',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 40000,
        tb_user: [],
    },
    {
        id: 40002,
        name: '业务部',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 40000,
        tb_user: [],
    },
    {
        id: 1000091,
        name: 'vip1',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 10000,
        tb_user: [
            {
                id: 1,
                name: '许鹏',
                password: '123456',
                tel: '15160315110',
                createdAt: '2025-06-26T17:11:16.051Z',
                address_info: [],
                contacts: [],
            },
            {
                id: 12,
                name: '许12',
                password: '123456',
                tel: '15160315012',
                createdAt: '2025-06-26T17:11:16.051Z',
                address_info: [],
                contacts: [],
            },
        ],
    },
    {
        id: 1000092,
        name: 'vip2',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 10000,
        tb_user: [
            {
                id: 1,
                name: '许鹏',
                password: '123456',
                tel: '15160315110',
                createdAt: '2025-06-26T17:11:16.051Z',
                address_info: [],
                contacts: [],
            },
            {
                id: 12,
                name: '许12',
                password: '123456',
                tel: '15160315012',
                createdAt: '2025-06-26T17:11:16.051Z',
                address_info: [],
                contacts: [],
            },
        ],
    },
    {
        id: 2000091,
        name: '主管',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 20000,
        tb_user: [
            {
                id: 1,
                name: '许鹏',
                password: '123456',
                tel: '15160315110',
                createdAt: '2025-06-26T17:11:16.051Z',
                address_info: [],
                contacts: [],
            },
        ],
    },
    {
        id: 2000092,
        name: '职员',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 20000,
        tb_user: [
            {
                id: 1,
                name: '许鹏',
                password: '123456',
                tel: '15160315110',
                createdAt: '2025-06-26T17:11:16.051Z',
                address_info: [],
                contacts: [],
            },
        ],
    },
    {
        id: 3000191,
        name: '主管',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 30001,
        tb_user: [],
    },
    {
        id: 3000192,
        name: '职员',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 30001,
        tb_user: [],
    },
    {
        id: 3000291,
        name: '主管',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 30002,
        tb_user: [],
    },
    {
        id: 3000292,
        name: '职员',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 30002,
        tb_user: [],
    },
    {
        id: 4000191,
        name: '主管',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 40001,
        tb_user: [],
    },
    {
        id: 4000192,
        name: '职员',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 40001,
        tb_user: [],
    },
    {
        id: 4000291,
        name: '主管',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 40002,
        tb_user: [],
    },
    {
        id: 4000292,
        name: '职员',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 40002,
        tb_user: [],
    },
];

//使用lodash  获取下面的数据
import _ from 'lodash';

// 使用lodash处理数据：将原始的组织结构数据转换为用户列表，每个用户包含其角色列表
const result = _.chain(arr)
    // 过滤出非部门且包含用户的项
    .filter((item) => !item.is_depart && item.tb_user.length > 0)
    // 获取所有用户
    .flatMap((item) => item.tb_user)
    // 去重用户（基于用户ID）
    .uniqBy('id')
    // 为每个用户添加角色列表
    .map((user) => {
        const role_list = _.chain(arr)
            .filter((item) => !item.is_depart && item.tb_user.length > 0)
            .filter((item) => item.tb_user.some((u) => u.id === user.id))
            .map((item) => {
                return { id: item.id, name: item.name, is_depart: item.is_depart, remark: item.remark, parent_id: item.parent_id };
                // return item;
            })
            .value();

        return { ...user, role_list };
    })
    .value();

// 输出结果
console.log(JSON.stringify(result, null, 2));
