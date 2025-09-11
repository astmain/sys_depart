import { api_axios } from './main.ts';

export const api = {
    file_manage: {
        merge_chunks: ({ file_name, file_id, file_size, file_sha256 }: { file_name: string; file_id: string; file_size: number; file_sha256: string }) => api_axios.post('/file_manage/merge_chunks', { file_name, file_id, file_size, file_sha256 }),
        get_upload_progress: ({ file_id }: { file_id: string }) => api_axios.post('/file_manage/get_upload_progress', { file_id }),
        cancel_upload: ({ file_id }: { file_id: string }) => api_axios.post('/file_manage/cancel_upload', { file_id }),
        find_file_list: () => api_axios.post('/file_manage/find_file_list'),
        del_history_file: ({ id }: { id: number }) => api_axios.post('/file_manage/del_history_file', { id }),
    },

    auth: {
        login: ({ password, tel }: { password: string; tel: string }) => api_axios.post('/auth/login', { password, tel }),
        update: () => api_axios.post('/auth/update'),
        findListAll: ({ name }: { name: string }) => api_axios.post('/auth/findListAll', { name }),
        upsert: ({ id, name, password, tel }: { id: number; name: string; password: string; tel: string }) => api_axios.post('/auth/upsert', { id, name, password, tel }),
    },

    menu: {
        create: ({ name, path, parent_id }: { name: string; path: string; parent_id: number }) => api_axios.post('/menu/create', { name, path, parent_id }),
        del: ({ id }: { id: number }) => api_axios.post('/menu/del', { id }),
        update: ({ id, name, path, parent_id }: { id: number; name: string; path: string; parent_id: number }) => api_axios.post('/menu/update', { id, name, path, parent_id }),
        findListAll: ({ name }: { name: string }) => api_axios.post('/menu/findListAll', { name }),
        findTree: () => api_axios.post('/menu/findTree'),
        upsert: ({ id, name, path, parent_id }: { id: number; name: string; path: string; parent_id: number }) => api_axios.post('/menu/upsert', { id, name, path, parent_id }),
    },

    user: {
        del_user: ({ id }: { id: number }) => api_axios.post('/user/del_user', { id }),
        save_user: ({ id, role_ids, name, tel }: { id: number; role_ids: any[]; name: string; tel: string }) => api_axios.post('/user/save_user', { id, role_ids, name, tel }),
        find_user_list_BY_depart_id_BY_name_BY_tel: ({ depart_id, name, tel }: { depart_id: number; name: string; tel: string }) => api_axios.post('/user/find_user_list_BY_depart_id_BY_name_BY_tel', { depart_id, name, tel }),
    },

    depart_role: {
        find_depart_info: ({ id }: { id: number }) => api_axios.post('/depart_role/find_depart_info', { id }),
        create_depart_role: ({ name, is_depart, parent_id, remark }: { name: string; is_depart: boolean; parent_id: number; remark: string }) => api_axios.post('/depart_role/create_depart_role', { name, is_depart, parent_id, remark }),
        del_depart_role: ({ id }: { id: number }) => api_axios.post('/depart_role/del_depart_role', { id }),
        upsert_depart_role: ({ id, name, is_depart, parent_id, remark }: { id: number; name: string; is_depart: boolean; parent_id: number; remark: string }) => api_axios.post('/depart_role/upsert_depart_role', { id, name, is_depart, parent_id, remark }),
        save_permiss_menu_tree: ({ id, name, tree_data }: { id: number; name: string; tree_data: any[] }) => api_axios.post('/depart_role/save_permiss_menu_tree', { id, name, tree_data }),
        find_depart_role_tree: ({ name }: { name: string }) => api_axios.post('/depart_role/find_depart_role_tree', { name }),
        find_permiss_menu_tree: ({ id }: { id: number }) => api_axios.post('/depart_role/find_permiss_menu_tree', { id }),
    },

    mall_car: {
        save_mall_car: ({ name, price, num, img_url, remark, id }: { name: string; price: number; num: number; img_url: string; remark: string; id: number }) => api_axios.post('/mall_car/save_mall_car', { name, price, num, img_url, remark, id }),
        create_mall_car: ({ name, num, remark }: { name: string; num: number; remark: string }) => api_axios.post('/mall_car/create_mall_car', { name, num, remark }),
        update_mall_car: ({ id, name, price, num, img_url, remark }: { id: number; name: string; price: number; num: number; img_url: string; remark: string }) => api_axios.post('/mall_car/update_mall_car', { id, name, price, num, img_url, remark }),
        del_mall_car: ({ id }: { id: number }) => api_axios.post('/mall_car/del_mall_car', { id }),
        find_mall_car_list_all: () => api_axios.post('/mall_car/find_mall_car_list_all'),
    },

    mall_order: {
        del_mall_order: ({ id }: { id: number }) => api_axios.post('/mall_order/del_mall_order', { id }),
        save_mall_order: ({ id, price, details, createdAt, updatedAt, order_number, user_id, remark, status }: { id: number; price: number; details: any[]; createdAt: string; updatedAt: string; order_number: string; user_id: number; remark: string; status: string }) => api_axios.post('/mall_order/save_mall_order', { id, price, details, createdAt, updatedAt, order_number, user_id, remark, status }),
        create_mall_order: ({ details }: { details: any[] }) => api_axios.post('/mall_order/create_mall_order', { details }),
        update_mall_order: ({ id, price, details, createdAt, updatedAt, order_number, user_id, remark, status }: { id: number; price: number; details: any[]; createdAt: string; updatedAt: string; order_number: string; user_id: number; remark: string; status: string }) => api_axios.post('/mall_order/update_mall_order', { id, price, details, createdAt, updatedAt, order_number, user_id, remark, status }),
        find_mall_order_list: ({ status }: { status: string }) => api_axios.post('/mall_order/find_mall_order_list', { status }),
    },
};
