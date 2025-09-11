<template>
    <div class="login-container">
        <main class="login-card">
            <h2 style="text-align: center">登录</h2>
            <el-form :model="form" @submit.prevent="onLogin" label-width="60px" label-position="left">
                <el-form-item label="电话">
                    <el-input v-model="form.tel" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="form.password" type="password" autocomplete="off" />
                </el-form-item>
            </el-form>

            <div style="display: flex; flex-direction: column; gap: 14px">
                <el-button type="primary" @click="onLogin" style="margin: 0">登录</el-button>
                <el-button type="" @click="onLogin" style="margin: 0">注册</el-button>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { api } from '../api.ts';

const router = useRouter();
const form = $ref({ tel: '15160315110', password: '123456' });

async function onLogin() {
    let data = { tel: form.tel, password: form.password };
    let res = await api.auth.login({ tel: form.tel, password: form.password });
    console.log(`222---res:`, res);
    if (res.code === 200) {
        // localStorage.setItem('token', res.token);
        BUS.token = res.token;
        BUS.user = res.user;
        router.push('/home');
        ElMessage.success('登录成功');
    } else {
        ElMessage.error(res.message);
    }

    // if (form.value.tel === '15160315110' && form.value.password === '123456') {
    //   localStorage.setItem('token', 'mock-token')
    //   router.push('/home')
    // } else {
    //   ElMessage.error('用户名或密码错误')
    // }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f7fa;
}

.login-card {
    width: 500px;
    padding-top: 20px;
    padding-bottom: 50px;
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
