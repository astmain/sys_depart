import axios from 'axios';

import { ElMessage } from 'element-plus';

interface ConfigAxiosApiOptions {
    name: string;
    baseURL: string;
    debug?: boolean;
    timeout?: number;
}

export async function config_api_axios({ name = 'axios_api', baseURL, debug = false, timeout = 30000 }: ConfigAxiosApiOptions) {
    console.log('axios_create 初始化基础链接  baseURL         :', baseURL);
    axios.defaults.headers.get['Cache-Control'] = 'no-cache'; // 禁用缓存
    axios.defaults.headers.get['Pragma'] = 'no-cache'; // 禁用缓存兼容老旧浏览器
    const api_axios = axios.create({
        baseURL: baseURL, //后端接口地址
        // withCredentials: false,// 用于配置请求接口跨域时是否需要凭证
        timeout: timeout, // 超时时间，单位毫秒
    });

    // 请求拦截器***************************************************
    api_axios.interceptors.request.use(
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
    api_axios.interceptors.response.use(
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

    // 全局注册axios_api
    (window as any)[name] = api_axios;
    console.log(`全局注册axios_api:`, name, baseURL);

    return api_axios;
}
