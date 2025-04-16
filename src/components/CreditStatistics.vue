<script setup>

import {onMounted, ref} from "vue";
import {getCourseTermData, getStudentGradeData} from "@/api/api.js";
import {ElMessage} from "element-plus";

// 表格数据
let courseData = ref([])

// 每页显示条数
const pageSize = ref(10)

// 当前页数
const currentPage = ref(1)

// 总条目数
const total = ref(0)

const weekMap = {
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
    7: '星期日'
}

const studentId =sessionStorage.getItem('number');
const subjectTerm = ref('');


const termOption = ref([])

// 绩点计算函数
const calculateGPA = (grade) => {
    if (grade < 60) return 0.0;
    if (grade >= 90) return 4.0;
    return 1.0 + (grade - 60) * 0.1;
};

// 课程数据查询函数
const searchCourse = async () => {
    try {
        const res = await getStudentGradeData({
            studentId: studentId,
            limit: pageSize.value,
            offset: (currentPage.value - 1) * pageSize.value,
            subjectTerm: subjectTerm.value,
        });
        total.value = res.data.total;
        courseData.value = res.data.data;
        console.log(res.data.data)
    } catch (error) {
        ElMessage.error(`服务器获取课程数据失败: ${error}`);
        console.error("服务器获取课程数据失败:", error);
    }
};

// 课程学期获取函数
const getTermOptions = async () => {
    try {
        const res = await getCourseTermData();
        // 后端直接返回 rows 数组，转换成 el-option 所需格式
        termOption.value = res.data.map(item => ({
            label: item.subject_term,
            value: item.subject_term
        }));
        subjectTerm.value = termOption.value[0].value;
    } catch (error) {
        ElMessage.error(`获取学期选项失败: ${error}`);
        console.error("获取学期选项失败:", error);
    }
};

onMounted(async () => {
    await getTermOptions()
    await searchCourse()
})

</script>

<template>
    <div class="course-selection-container">
        <el-row style="margin-bottom:20px;">
            <el-col :span="8">
                <span class="subjectItems">开设学期&emsp;</span>
                <el-select v-model="subjectTerm" placeholder="请选择开课学期" style="width: 240px"
                           @change="searchCourse" clearable :value-on-clear="''">
                    <el-option
                        v-for="item in termOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                    />
                </el-select>
            </el-col>
        </el-row>
        <el-table :data="courseData" border style="width: 100%">
            <el-table-column label="课程号" prop="subject_id"/>
            <el-table-column label="课程名" prop="subject_name"/>
            <el-table-column label="授课教师" prop="teacher_name"/>
            <el-table-column label="开设学期" prop="subject_term"/>
            <el-table-column label="成绩" prop="grade"></el-table-column>
            <el-table-column fixed="right" label="绩点" min-width="120">
                <template #default="scope">
                    <span>{{ calculateGPA(scope.row.grade).toFixed(1) }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
            @current-change="searchCourse"
            style="margin-top: 20px"
        />
    </div>
</template>

<style scoped>

.course-selection-container {
    margin: 20px;
}

.subjectItems {
    color: #606266;
    font-weight: bold;
}

</style>