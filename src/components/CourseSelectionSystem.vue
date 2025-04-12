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

const handleCurrentChange = (async () => {
    try {
        const res = await getCourseData({
            limit: pageSize.value,
            offset: (currentPage.value - 1) * pageSize.value
        });
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

const weekMap = {
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
    7: '星期日'
}

const subjectId = ref('');
const subjectName = ref('');
const teacherName = ref('');
const subjectTerm = ref('');
const subjectWeek = ref('');
const subjectDay = ref('');

const subjectIdChange = async (subjectId) => {
    try {
        const res = await getCourseData({
            limit: pageSize.value,
            offset: (currentPage.value - 1) * pageSize.value,
            subjectId: subjectId
        });
        console.log(res)
        total.value = res.data.total;
        courseData.value = res.data.data;
    } catch (error) {
        ElMessage.error(`服务器获取课程数据失败:${error}`)
        console.log("服务器获取课程数据失败:", error);
    }
}


</script>

<template>
    <div class="course-selection-container">
        <el-row style="margin-bottom:20px;">
            <el-col :span="8">
                <span class="subjectItems">课程号&emsp;&emsp;</span>
                <el-input v-model="subjectId" style="width: 240px" placeholder="Please input"
                          @change="subjectIdChange"/>
            </el-col>
            <el-col :span="8">
                <span class="subjectItems">课程名&emsp;&emsp;</span>
                <el-input v-model="subjectName" style="width: 240px" placeholder="Please input"
                          @change="subjectNameChange"/>
            </el-col>
            <el-col :span="8">
                <span class="subjectItems">授课教师&emsp;</span>
                <el-input v-model="teacherName" style="width: 240px" placeholder="Please input"
                          @change="teacherNameChange"/>
            </el-col>
        </el-row>
        <el-row style="margin-bottom:20px;">
            <el-col :span="8">
                <span class="subjectItems">开设学期&emsp;</span>
                <el-select v-model="subjectTerm" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in termOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                    />
                </el-select>
            </el-col>
            <el-col :span="8">
                <span class="subjectItems">开课周次&emsp;</span>
                <el-select v-model="subjectWeek" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in weekOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                    />
                </el-select>
            </el-col>
            <el-col :span="8">
                <span class="subjectItems">开课节次&emsp;</span>
                <el-select v-model="subjectDay" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in dayOptions"
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
            <el-table-column label="上课时间">
                <template #default="scope">
                    <span>{{ weekMap[scope.row.subject_week] }}&nbsp;第{{ scope.row.subject_day }}节</span>
                </template>
            </el-table-column>
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

.subjectItems {
    color: #606266;
    font-weight: bold;
}

</style>