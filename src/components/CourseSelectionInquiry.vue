<script setup>

import {onMounted, ref} from "vue";
import {deleteGradeData, getCourseTermData, getStudentGradeData} from "@/api/api.js";
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
const subjectId = ref('');
const subjectName = ref('');
const teacherName = ref('');
const subjectTerm = ref('');
const subjectWeek = ref('');
const subjectDay = ref('');

const termOption = ref([])
const weekOptions = ref([
    { label: "星期一", value: 1 },
    { label: "星期二", value: 2 },
    { label: "星期三", value: 3 },
    { label: "星期四", value: 4 },
    { label: "星期五", value: 5 },
    { label: "星期六", value: 6 },
    { label: "星期日", value: 7 }
])
const dayOptions = ref([
    { label: "第1节", value: 1 },
    { label: "第2节", value: 2 },
    { label: "第3节", value: 3 },
    { label: "第4节", value: 4 },
    { label: "第5节", value: 5 }
])

// 课程数据查询函数
const searchCourse = async () => {
    try {
        const res = await getStudentGradeData({
            studentId: studentId,
            limit: pageSize.value,
            offset: (currentPage.value - 1) * pageSize.value,
            subjectNumber: subjectId.value,
            subjectName: subjectName.value,
            teacherName: teacherName.value,
            subjectTerm: subjectTerm.value,
            subjectWeek: subjectWeek.value,
            subjectDay: subjectDay.value,
        });
        total.value = res.data.total;
        courseData.value = res.data.data;
    } catch (error) {
        ElMessage.error(`服务器获取课程数据失败: ${error}`);
        console.error("服务器获取课程数据失败:", error);
    }
};

const deleteGrade = async (subjectId) => {
    try{
        await deleteGradeData(studentId, subjectId);
        await searchCourse();
        ElMessage.success('删除选课成功')
    }catch (error) {
        ElMessage.error(`服务器删除选课信息失败: ${error}`);
        console.error("服务器删除选课信息失败:", error);
    }
}

// 课程学期获取函数
const getTermOptions = async () => {
    try {
        const res = await getCourseTermData();
        // 后端直接返回 rows 数组，转换成 el-option 所需格式
        termOption.value = res.data.map(item => ({
            label: item.subject_term,
            value: item.subject_term
        }));
    } catch (error) {
        ElMessage.error(`获取学期选项失败: ${error}`);
        console.error("获取学期选项失败:", error);
    }
};

onMounted(async () => {
    await searchCourse()
    await getTermOptions()
})

</script>

<template>
    <div class="course-selection-container">
        <el-row style="margin-bottom:20px;">
            <el-col :span="8">
                <span class="subjectItems">课程号&emsp;&emsp;</span>
                <el-input v-model="subjectId" style="width: 240px" placeholder="请输入查询课程号"
                          @change="searchCourse"/>
            </el-col>
            <el-col :span="8">
                <span class="subjectItems">课程名&emsp;&emsp;</span>
                <el-input v-model="subjectName" style="width: 240px" placeholder="请输入查询课程名"
                          @change="searchCourse"/>
            </el-col>
            <el-col :span="8">
                <span class="subjectItems">授课教师&emsp;</span>
                <el-input v-model="teacherName" style="width: 240px" placeholder="请输入查询课程教师"
                          @change="searchCourse"/>
            </el-col>
        </el-row>
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
            <el-col :span="8">
                <span class="subjectItems">开课周次&emsp;</span>
                <el-select v-model="subjectWeek" placeholder="请选择开课周次" style="width: 240px"
                           @change="searchCourse" clearable :value-on-clear="''">
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
                <el-select v-model="subjectDay" placeholder="请选择开课节次" style="width: 240px" @change="searchCourse"
                           clearable :value-on-clear="''">
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
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="deleteGrade(scope.row.subject_id)">
                        退课
                    </el-button>
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