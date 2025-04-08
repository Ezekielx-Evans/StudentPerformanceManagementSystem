<script setup>
import { ref, onMounted } from "vue";
import { getStudentData } from "@/api/api.js";

const studentData = ref([]);
const studentName = ref("");
const studentNumber = ref("");
const studentPhoneNumber = ref("");
const studentGender = ref("");
const studentAddress = ref("");

onMounted(async () => {
    try {
        const res = await getStudentData(sessionStorage.getItem("number"));
        studentData.value = res.data
        studentName.value = res.data[0].student_name
        studentNumber.value = res.data[0].student_number
        studentPhoneNumber.value = res.data[0].phone_number
        studentGender.value = res.data[0].student_gender
        studentAddress.value = res.data[0].student_address
    } catch (error) {
        console.error("获取学生数据失败:", error);
    }
});
</script>

<template>
    <div class="student-information">
        <el-descriptions border direction="vertical">
            <el-descriptions-item :rowspan="2" :width="140" label="Photo" align="center">
                <el-image style="width: 100px; height: 100px" src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/413150/5aa283c2c2880fd1992cdc7944cf10c108cc6283.png"/>
            </el-descriptions-item>
            <el-descriptions-item label="姓名">{{ studentName }}</el-descriptions-item>
            <el-descriptions-item label="学号">{{ studentNumber }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ studentPhoneNumber }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ studentGender }}</el-descriptions-item>
            <el-descriptions-item label="身份" align="center">
                <el-tag size="small">学生</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="地址">
                {{ studentAddress }}
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
