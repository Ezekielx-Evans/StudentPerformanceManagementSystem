<script lang="ts" setup>
import {reactive, ref} from 'vue'

import {ElMessage, FormInstance, FormRules} from 'element-plus'
import {getStudentData, getTeacherData} from '@/api/api'
import {useRouter} from "vue-router";

// 定义表单字段的类型
interface RuleForm {
    number: string
    password: string
    status: string
}

// 表单字段的值
const ruleForm = reactive<RuleForm>({
    number: '',
    password: '',
    status: null
})

// 定义表单实例为 ruleFormRef
const ruleFormRef = ref<FormInstance>()

// 表单框匹配规则
const rules = reactive<FormRules<RuleForm>>({
    number: [
        {required: true, message: '学号不能为空', trigger: 'blur'},
        {min: 11, max: 11, message: '学号长度必须是 11 位', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
    ],
    status: [
        {required: true, message: '请选择您的身份', trigger: 'blur'},
    ],
})

// 点击提交后的操作
const router = useRouter();
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            console.log('submit!')

            let userQuire = null;

            if (ruleForm.status === "1") {
                userQuire = await getStudentData(ruleForm.number);
            } else if (ruleForm.status === "2") {
                userQuire = await getTeacherData(ruleForm.number);
            }

            if (userQuire === null) {
                ElMessage.error('服务器连接失败！')
            } else if (userQuire.length === 0) {
                ElMessage.error('没有找到用户，请检查学号是否正确！')
            }else if(userQuire.data[0].password !== ruleForm.password) {
                ElMessage.error('密码错误，请重试！')
            } else if(userQuire.data[0].password === ruleForm.password) {
                sessionStorage.setItem("status",ruleForm.status);
                sessionStorage.setItem("number",ruleForm.number);
                if(ruleForm.status === "1") {
                    await router.push('/student/information');
                }else{
                    await router.push('/teacher/information');
                }
                ElMessage.success('登录成功')
            }else{
                ElMessage.error('未知错误')
            }

        } else {
            console.log('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>


<template>
    <div class="login">

        <img src="@/assets/images/roundHead.jpg" alt="error" style="width: 150px;margin-bottom: 80px">

        <el-form :model="ruleForm" label-width="auto" style="width: 350px;" :rules="rules"
                 :hide-required-asterisk="true"
                 size="large" ref="ruleFormRef">

            <el-form-item label="学号" prop="number">
                <el-input v-model="ruleForm.number"/>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" show-password v-model="ruleForm.password"/>
            </el-form-item>

            <el-form-item label="身份" prop="status">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio value="1">学生</el-radio>
                    <el-radio value="2">老师</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button @click="resetForm(ruleFormRef)">清空</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>


<style scoped>
.login {
    flex-direction: column;
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}

</style>