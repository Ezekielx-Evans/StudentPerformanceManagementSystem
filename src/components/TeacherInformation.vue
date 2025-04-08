<script setup>
import { ref, onMounted } from "vue";
import {getTeacherData} from "@/api/api.js";

const teacherData = ref([]);
const teacherName = ref("");
const teacherNumber = ref("");
const teacherPhoneNumber = ref("");
const teacherGender = ref("");
const teacherAddress = ref("");

onMounted(async () => {
    try {
        const res = await getTeacherData(sessionStorage.getItem("number"));
        teacherData.value = res.data
        teacherName.value = res.data[0].teacher_name
        teacherNumber.value = res.data[0].teacher_number
        teacherPhoneNumber.value = res.data[0].phone_number
        teacherGender.value = res.data[0].teacher_gender
        teacherAddress.value = res.data[0].teacher_address
    } catch (error) {
        console.error("获取教师数据失败:", error);
    }
});
</script>

<template>
    <div class="student-information">
        <el-descriptions border direction="vertical">
            <el-descriptions-item :rowspan="2" :width="140" label="Photo" align="center">
                <el-image style="width: 100px; height: 100px" src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/413150/5aa283c2c2880fd1992cdc7944cf10c108cc6283.png"/>
            </el-descriptions-item>
            <el-descriptions-item label="姓名">{{ teacherName }}</el-descriptions-item>
            <el-descriptions-item label="学号">{{ teacherNumber }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ teacherPhoneNumber }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ teacherGender }}</el-descriptions-item>
            <el-descriptions-item label="身份" align="center">
                <el-tag size="small">教师</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="地址">
                {{ teacherAddress }}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<style scoped>
.student-information {
    width: 70%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
}
</style>
