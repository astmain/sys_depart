import { ElMessage } from 'element-plus';
import axios from 'axios';

axios.defaults.headers.get['Cache-Control'] = 'no-cache'; // 禁用缓存
axios.defaults.headers.get['Pragma'] = 'no-cache'; // 禁用缓存兼容老旧浏览器
const api_xxx = axios.create({
    baseURL: 'http://127.0.0.1:3000/', //后端接口地址
    // withCredentials: false,// 用于配置请求接口跨域时是否需要凭证
    timeout: 300000, // 超时时间，单位毫秒
});

// 请求拦截器***************************************************
api_xxx.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        // console.log('token---:', token);
        if (token) {
            config.headers['token'] = token;
            try {
                const token_obj = JSON.parse(token);
                config.headers['token'] = token_obj.token;
            } catch (e) {}
        }

        return config;
    },
    (error) => {
        console.error('axios_api请求异常====》', error);
        return Promise.reject(error);
    },
);

//响应拦截器*****************************************************
api_xxx.interceptors.response.use(
    (response) => {
        if (response.data.code === 200) {
        } //
        else if (response.data.code === 201) {
        } //
        else if (response.data.code >= 400) {
            ElMessage.error({ message: response.data.msg });
        } //
        else {
            if (debug === true) console.log('axios_api 其它状态码响应结果 response         :', response);
        }

        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export async function file_upload_one_3d({ file }) {
    let tag = 'file_upload_one_3d';
    const data = new FormData();
    data.append('dir_name', 'filestore');
    data.append('file', file); // 'file' 是后端接收字段名，根据实际情况修改
    let config = { method: 'post', url: 'http://127.0.0.1:3000/file_manage/update_one', data, headers: { 'Content-Type': 'multipart/form-data' } };
    console.log(tag, 'config:', config);
    const res = await api_xxx(config);
    console.log(tag, 'res:', res);
    res.code === 200 ? ElMessage.success({ message: res.msg, duration: 1000, showClose: true }) : 0;
    return res.result;
}
