<template>
  <el-header class="App_header1">
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
      <div style="font-size: 18px; font-weight: bold">管理系统</div>

      <el-dropdown placement="bottom">
        <div style="display: flex; gap: 10px; align-items: center">
          <!-- <el-avatar shape="circle" size="small" :src="BUS?.user?.avatar" /> -->
          <img :src="BUS?.user?.avatar" style="width: 40px" />
          <span style="color: #fff">{{ BUS?.user?.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { api } from '../api';

export default {
  name: 'App_header',
  data() {
    return {
      BUS: window.BUS,
    };
  },
  methods: {
    logout() {
      console.log('logout---退出');
      // localStorage.removeItem('token')
      // @ts-ignore
      window.BUS.token = '';
      window.BUS.user = { name: '无用户名' };
      this.$router.push('/login');
    },
  },
  async mounted() {
    console.log('App_header mounted');
  },
};
</script>

<style scoped>
.App_header1 {
  background-color: #24292e;
  color: #fff;
  display: flex;
  height: 60px;
  width: 100%;
}
</style>
