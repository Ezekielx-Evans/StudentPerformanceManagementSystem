<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";

const status = ref(sessionStorage.getItem("status"))

const router = useRouter()
const logout = async () => {
    sessionStorage.clear();
    await router.push('/login');
}

</script>

<template>
    <el-row class="header">

        <el-col :span="12" class="header-left">
            <img alt="error" src="@/assets/images/roundHead.jpg" style="height: 90%">
            <p style="margin-left: 1rem;font-size: 1.8rem;color: #282828;font-family: LXGWWenKaiMonoLite-Regular,fangsong">
                学生成绩管理系统</p>
        </el-col>

        <el-col :span="12" class="header-right">

            <p v-if="status === '1'"
               style="color: #282828;font-family: LXGWWenKaiMonoLite-Regular,fangsong;margin-right: 2rem">
                同学，你好！
            </p>
            <p v-else-if="status === '2'"
               style="color: #282828;font-family: LXGWWenKaiMonoLite-Regular,fangsong;margin-right: 2rem">
                老师，你好！
            </p>
            <el-button type="primary" @click="logout">
                退出登录
                <el-icon class="el-icon--right">
                    <Upload/>
                </el-icon>
            </el-button>
        </el-col>

    </el-row>
</template>

<style scoped>
@font-face {
    font-family: "LXGWWenKaiMonoLite-Regular";
    src: url("@/assets/font/LXGWWenKaiMonoLite-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

.header {
    height: 100%;

}


.header-left {
    display: flex;
    height: 100%;
    align-items: center;
}

.header-right {
    display: flex;
    align-items: center;
    justify-content: right;
}
</style>