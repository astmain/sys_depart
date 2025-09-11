import {Controller, Module, Get, Post, Body, Req, Inject} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import {PrismaClient} from '@prisma/client';
import * as _ from 'lodash';
// 自定义
import {ApiPost} from "@Plugins/ApiPost";
// import * as dto from "./test_user_dto"
import * as dto from "./dto"
import {factory} from "ts-jest/dist/transformers/hoist-jest";
import {del_user} from "./dto";


@ApiTags('user_用户管理')
@Controller('user')
export class user {
    constructor(
        @Inject("DB_prisma") private db: PrismaClient,//注入全局数据库
        @Inject("Global_tools") private tools: any,   //注入全局工具
    ) {
    }


    @ApiPost("del_user", "删除-用户")
    async del_user(@Body() body: dto.del_user, @Req() _req: any) {
        await this.db.tb_user.delete({where: {id: body.id}})
        return {code: 200, message: '成功:删除-用户'};


    }


    @ApiPost("save_user", "保存-用户")
    async save_user(@Body() body: dto.update_user, @Req() _req: any) {
        let user_obj = await this.db.tb_user.findFirst({where: {id: body.id, tel: body.tel}})

        if (user_obj) {
            await this.db.tb_user.update({
                where: {id: body.id},
                data: {
                    name: body.name,
                    tel: body.tel,
                    tb_depart_role: {
                        connect: body.role_ids//dto没有定义好     role_ids: any[];  以后要优化  [{id:11}]
                    }
                },

            })
        } else {
            //判断手机号是否已存在
            let user_obj_tel = await this.db.tb_user.findFirst({where: {tel: body.tel}})
            if (user_obj_tel) return {code: 400, message: '失败:手机号已存在'};
            await this.db.tb_user.create({
                data: {
                    name: body.name,
                    tel: body.tel,
                    tb_depart_role: {
                        connect: body.role_ids//dto没有定义好     role_ids: any[];  以后要优化  [{id:11}]
                    }
                },

            })
        }
        return {code: 200, count: 1, message: '成功:创建-用户'};
    }

    @ApiPost("find_user_list_BY_depart_id_BY_name_BY_tel", "查询-模糊-用户-列表")
    async find_user_list_BY_depart_id_BY_name_BY_tel(@Body() body: dto.find_user_list_BY_depart_id_BY_name_BY_tel, @Req() _req: any) {

        // 思路
        // 一 : 因为会点击部门,所以,利用函数own_children_parent关系
        // 二 : 函数own_children_parent关系从部门角色表中,找到user_list1
        // 二 : user_list1中的用户可能在其他部门角色也存在,所以再找出来,使用prisma的关联查询
        let depart_all_list = await this.db.tb_depart_role.findMany()
        let reference = tool_arr_reference_own_children_parent_to_obj(depart_all_list, body.depart_id)
        let user_list1 = await this.db.tb_depart_role.findMany({
            where: {id: {in: reference.own_children_ids},},
            include: {
                tb_user: //找到当前部门角色的根据name,tel模糊查询user_list1
                    {
                        where: {name: {contains: body.name}, tel: {contains: body.tel}},
                        include: {
                            tb_depart_role: {
                                // where: {is_depart: true},
                                include: {children: true}
                            }
                        }
                    }
            },
        })
        let user_list2 = _.uniqBy(user_list1.map(o => o.tb_user).flat(), 'id')
        let user_list3 = user_list2.map(user => {
            user.depart_list = []
            user.role_ids = []
            user.tb_depart_role.map(ele2 => {
                let obj = tool_arr_reference_own_children_parent_to_obj(depart_all_list, ele2.id)
                user.depart_list.push({name: obj.parent_own.map(ele3 => ele3.id != 1 ? ele3.name : "").filter(o => o).join("/")})
                user.role_ids.push({id: ele2.id})
            })
            return user
        })

        return {code: 200, message: "成功:查询-模糊-用户-列表", user_list: user_list3, reference,}
    }


}

@Module({
    controllers: [user],
    providers: [],
})
export class test_user_module {
}

// 数组关联自己_子级_父级
function tool_arr_reference_own_children_parent_to_obj(arr, id) {
    // 1. 获取自身
    const own = _.find(arr, {id});
    // console.log(`own---`, own)
    const parent = getParents(own);
    const children = getChildren(own);
    const all = [own, ...parent, ...children]

    // 方便数据调用
    // @ts-ignore
    let own_ids = [own.id]//自己ids
    // @ts-ignore
    let parent_ids = parent.map(o => o.id)//父级ids
    // @ts-ignore 子级ids
    let children_ids = children.map(o => o.id)//子级ids
    // -------------------------------------
    let own_children_ids = [...own_ids, ...children_ids]//自己ids+子级ids
    // console.log(`111---own_children_ids:`,     own_children_ids        )
    // console.log(`111---own_ids:`,     own_ids        )
    // console.log(`111---children_ids:`,     children_ids        )
    let own_parent_ids = [...own_ids, ...parent_ids]//自己ids+父级ids
    let all_ids = [...own_ids, ...parent_ids, ...children_ids] //所有ids

    let parent_own = [...parent, own]


    // 2. 获取所有父级
    function getParents(item, result = []) {
        if (!item || !item.parent_id) return result;
        let parent = _.find(arr, {id: item.parent_id});
        if (parent) {
            // @ts-ignore
            result.unshift(parent); // 从上往下
            return getParents(parent, result);
        }
        return result;
    }


    // 3. 获取所有子级
    function getChildren(item, result = []) {
        const children = _.filter(arr, {parent_id: item.id});
        if (children.length) {
            // @ts-ignore
            result.push(...children);
            children.forEach(child => getChildren(child, result));
        }
        return result;
    }


    return {parent, own: [own], children, all, own_ids, parent_ids, children_ids, own_children_ids, own_parent_ids, all_ids, parent_own};
}


