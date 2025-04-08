<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
    <div class="common-layout" style="height: 98vh;">
        <el-container style="height: 100%">

            <!-- 上方导航栏 -->
            <el-header style="box-shadow: var(--el-box-shadow-lighter)">
                <Header></Header>
            </el-header>

            <!-- 导航栏下方 -->
            <el-container style="margin-top: 10px">

                <!-- 左侧边栏 -->
                <el-aside width="200px" style="box-shadow: var(--el-box-shadow-lighter)">
                    <Sidebar></Sidebar>
                </el-aside>

                <!-- 主要内容 -->
                <el-main style="margin-left: 10px;box-shadow: var(--el-box-shadow-lighter)">
                    <RouterView></RouterView>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<style scoped>

</style>