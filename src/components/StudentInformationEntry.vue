<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {ElMessage, FormInstance, FormRules} from 'element-plus'
import {insertStudentData} from "@/api/api.js";

// 表单实例
const ruleFormRef = ref<FormInstance>()


// 表单数据项
const ruleForm = reactive({
    name: '',
    number: '',
    gender: '',
})

// 表单验证规则
const rules = reactive<FormRules<typeof ruleForm>>({
    name: [{required: true, message: '姓名不能为空', trigger: 'blur'},],
    number: [
        {required: true, message: '学号不能为空', trigger: 'blur'},
        {min: 11, max: 11, message: '学号长度必须是 11 位', trigger: 'blur'},
    ],
    gender: [
        {required: true, message: '性别不能为空', trigger: 'blur'},
    ],
})

// 点击提交后的函数
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
            if (valid) {
                console.log('submit!')
                try {
                    await insertStudentData(ruleForm.name,ruleForm.number,ruleForm.gender);
                    ElMessage.success('添加成功！')
                } catch (error) {
                    ElMessage.error(`服务器更新教师数据失败:${error}`)
                    console.log("服务器更新教师数据失败:", error);
                }
            } else {
                console.log('error submit!')

            }
        }
    )
}

// 点击重置后的函数
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>


<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
             hide-required-asterisk>

        <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入学生姓名" v-model="ruleForm.name"/>
        </el-form-item>

        <el-form-item label="学号" prop="number">
            <el-input placeholder="请输入学生学号" v-model="ruleForm.number"/>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">添加</el-button>
            <el-button @click="resetForm(ruleFormRef)">清空</el-button>
        </el-form-item>

    </el-form>

</template>