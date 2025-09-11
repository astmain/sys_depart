<template>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>
</template>
<script>

//自定义

export default {
    data() {
        return {

        }
    },
    methods: {
        met1() {
            console.log("met1",this.$route.name)
        }
    },////

    async mounted() {


    },////

}
</script>

<style scoped></style>