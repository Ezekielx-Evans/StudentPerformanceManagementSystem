<script lang="ts" setup>


import {onMounted, ref} from "vue";
import {getCourseTermData, getClassWeekData} from "@/api/api.js";
import {ElMessage} from "element-plus";

const tableData = ref([
    {
        week1: null,
        week2: null,
        week3: null,
        week4: null,
        week5: null,
        week6: null,
        week7: null,
    },
    {
        week1: null,
        week2: null,
        week3: null,
        week4: null,
        week5: null,
        week6: null,
        week7: null,
    },
    {
        week1: null,
        week2: null,
        week3: null,
        week4: null,
        week5: null,
        week6: null,
        week7: null,
    },
    {
        week1: null,
        week2: null,
        week3: null,
        week4: null,
        week5: null,
        week6: null,
        week7: null,
    },
    {
        week1: null,
        week2: null,
        week3: null,
        week4: null,
        week5: null,
        week6: null,
        week7: null,
    }
])

const resetTableData = () => {
    tableData.value.forEach(row => {
        for (let key in row) {
            row[key] = null;
        }
    });
};

const indexMethod = (index: number) => {
    if (index === 0) {
        return `第 ${index + 1} 节课  7:40-9:20`;
    }
    if (index === 1) {
        return `第 ${index + 1} 节课  9:45-11:25`;
    }
    if (index === 2) {
        return `第 ${index + 1} 节课  14:30-16:10`;
    }
    if (index === 3) {
        return `第 ${index + 1} 节课  16:35-18:15`;
    }
    if (index === 4) {
        return `第 ${index + 1} 节课  19:20-21:00`;
    }
}


const subjectTerm = ref('');
const termOption = ref([])
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

const getTableData = async () => {
    resetTableData(); // 清空
    for (let i = 1; i <= 5; i++) {
        const res = await getClassWeekData(sessionStorage.getItem('number'), String(i), subjectTerm.value);
        // 遍历返回的 subject_week，标记到表格里
        res.data.forEach(item => {
            const weekKey = `week${item.subject_week}`;
            tableData.value[i - 1][weekKey] = item.subject_name;
        });
    }
}


onMounted(async () => {
    await getTermOptions()
    await getTableData()
})

</script>

<template>
    <div class="course-schedule-container">
        <el-row style="margin-bottom:20px;">
            <el-col :span="8">
                <span class="subjectItems">学期&emsp;</span>
                <el-select v-model="subjectTerm" placeholder="请选择学期" style="width: 240px"
                           @change="getTableData">
                    <el-option
                        v-for="item in termOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" size="large">
            <el-table-column type="index" :index="indexMethod" width="200"/>
            <el-table-column prop="week1" label="星期一"/>
            <el-table-column prop="week2" label="星期二"/>
            <el-table-column prop="week3" label="星期三"/>
            <el-table-column prop="week4" label="星期四"/>
            <el-table-column prop="week5" label="星期五"/>
            <el-table-column prop="week6" label="星期六"/>
            <el-table-column prop="week7" label="星期天"/>
        </el-table>
    </div>
</template>

<style scoped>
.course-schedule-container {
    margin: 20px;
}

.subjectItems {
    color: #606266;
    font-weight: bold;
}

::v-deep(.el-table__row) {
    height: 100px;
}
</style>

