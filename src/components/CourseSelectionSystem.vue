<script setup>


import {onMounted, ref} from "vue";
import {getCourseData} from "@/api/api.js";
import {ElMessage} from "element-plus";

// 表格数据
let courseData = ref([])

// 每页显示条数
const pageSize = ref(10)

// 当前页数
const currentPage = ref(1)

// 总条目数
const total = ref(0)

onMounted(async () => {
    try {
        courseData = await getCourseData(pageSize,(currentPage - 1)*pageSize);
        console.log("============",courseData);
    } catch (error) {
        ElMessage.error(`服务器获取课程数据失败:${error}`)
        console.log("服务器获取课程数据失败:", error);
    }
})

</script>

<template>
    <div class="course-selection-container">
        <el-table :data="courseData" border style="width: 100%">
            <el-table-column label="课程号" prop="subjectNumber"/>
            <el-table-column label="课程名" prop="subjectName"/>
            <el-table-column label="授课教师" prop="teacherName"/>
            <el-table-column label="开设学期" prop="subjectTerm"/>
            <el-table-column label="上课时间" prop="subjectTerm"/>
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">
                        Detail
                    </el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="1000"
            @current-change="handleCurrentChange"
            style="margin-top: 20px"
        />
    </div>
</template>

<style scoped>

.course-selection-container {
    margin: 20px;
}

</style>