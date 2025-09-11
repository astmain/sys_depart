<template>
  <div>我是Home页面</div>
  <div>{{ BUS.user.name }}</div>
  <el-button @click="met1()">met1</el-button>

  <div className=" text-green-700 bg-green-700  text-[#0f8]">111</div>
  <div className="aaaa text-green-700 bg-green-700  text-[#0f8]">222</div>
  <main className="bg-green-500 text-slate-300 text-center w-[100px] h-[100px]">333</main>
  <div className="w-120 h-30 bg-blue-500 text-4xl">333</div>
  <div className="flex-between">
    <div className="red">444</div>
    <div className="red btn-primary">444</div>
  </div>


</template>

<script setup>
function met1() {
  console.log('met1');
  BUS.count++;
}
</script>
