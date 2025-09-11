import _ from 'lodash';
let list = [
    {
        id: 1,
        name: '大宇三维打印',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: null,
    },
    {
        id: 20000,
        name: '技术部',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: 1,
    },

    {
        id: 20001,
        name: '技术部_主管',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 20000,
    },

    {
        id: 20002,
        name: '技术部_职员',
        is_depart: false,
        remark: '请填写备注说明!',
        parent_id: 20000,
    },
];

//使用lodash  获取下面的数据  封装成函数名tool_tree,参数是arr,返回值是result

const result = [
    {
        id: 1,
        name: '大宇三维打印',
        is_depart: true,
        remark: '请填写备注说明!',
        parent_id: null,
        children: [
            {
                id: 20000,
                name: '技术部',
                is_depart: true,
                remark: '请填写备注说明!',
                parent_id: 1,
                children: [
                    {
                        id: 20001,
                        name: '技术部_主管',
                        is_depart: false,
                        remark: '请填写备注说明!',
                        parent_id: 20000,
                    },
                    {
                        id: 20002,
                        name: '技术部_职员',
                        is_depart: false,
                        remark: '请填写备注说明!',
                        parent_id: 20000,
                    },
                ],
            },
        ],
    },
];
