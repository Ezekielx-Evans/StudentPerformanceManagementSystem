<script setup>


import {onMounted, ref} from "vue";
import {getCourseData} from "@/api/api.js";
import {ElMessage} from "element-plus";

let res = null



// 表格数据
let courseData = ref([])

// 每页显示条数
const pageSize = ref(10)

// 当前页数
const currentPage = ref(1)

// 总条目数
const total = ref(0)

const handleCurrentChange = (async () => {
    try {
        const res = await getCourseData(pageSize.value,(currentPage.value - 1)*pageSize.value);
        console.log(res)
        total.value = res.data.total;
        courseData.value = res.data.data;
    } catch (error) {
        ElMessage.error(`服务器获取课程数据失败:${error}`)
        console.log("服务器获取课程数据失败:", error);
    }
})

onMounted(() => {
    handleCurrentChange()
})

</script>

<template>
    <div class="course-selection-container">
        <el-table :data="courseData" border style="width: 100%">
            <el-table-column label="课程号" prop="subject_id"/>
            <el-table-column label="课程名" prop="subject_name"/>
            <el-table-column label="授课教师" prop="teacher_name"/>
            <el-table-column label="开设学期" prop="subject_term"/>
            <el-table-column label="上课时间" prop="subject_time"/>
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">
                        选课
                    </el-button>
                    <el-button link type="primary" size="small">退课</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
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