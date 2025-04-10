<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {ElMessage, FormInstance, FormRules} from 'element-plus'
import {getTeacherData, updateTeacherData} from "@/api/api.js";
import {Edit} from "@element-plus/icons-vue";


const teacherName = ref("");
const teacherPassword = ref("");
const teacherPhoneNumber = ref("");
const teacherAddress = ref("");

onMounted(async () => {

    try {
        const res = await getTeacherData(sessionStorage.getItem("number"));
        teacherName.value = res.data[0].teacher_name
        teacherPassword.value = res.data[0].password
        teacherPhoneNumber.value = res.data[0].phone_number
        teacherAddress.value = res.data[0].teacher_address
    } catch (error) {
        ElMessage.error(`服务器获取教师数据失败:${error}`)
        console.log("服务器获取教师数据失败:", error);
    }
});

// 表单实例
const ruleFormRef = ref<FormInstance>()

// 第一次密码检查
const validatePass = (rule: any, value: any, callback: any) => {
    if (disableItems.password) {
        callback()
    }
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}
// 第二次密码检查
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (disableItems.password) {
        callback()
    }
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入的密码不匹配"))
    } else {
        callback()
    }
}

const validatePhoneNumber = (rule: any, value: any, callback: any) => {
    if (disableItems.phone) {
        callback()
    }
    if (value === '') {
        callback(new Error('请输入电话'));
    } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的 11 位手机号码'));
    } else {
        callback();
    }
}

const validateAddress = (rule: any, value: any, callback: any) => {
    if (disableItems.address) {
        callback()
    }
    if (value === '') {
        callback(new Error('请输入地址'))
    } else {
        callback();
    }
}

// 表单数据项
const ruleForm = reactive({
    pass: '',
    checkPass: '',
    phone: '',
    address: '',
})

// 修改的数据项
const disableItems = reactive({
    password: true,
    phone: true,
    address: true,
})

// 表单验证规则
const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{validator: validatePass, trigger: 'blur'}],
    checkPass: [{validator: validatePass2, trigger: 'blur'}],
    phone: [{validator: validatePhoneNumber, message: '请输入电话', trigger: 'blur'},],
    address: [{validator: validateAddress, message: '请输入新地址', trigger: 'blur'}],
})

// 点击提交后的函数
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            let updatePass = null;
            let updatePhone = null;
            let updateAddress = null;
            let ifUpdate = false;

            if (disableItems.password) {
                updatePass = teacherPassword.value;
            } else {
                updatePass = ruleForm.pass;
                ifUpdate = true;
            }
            if (disableItems.phone) {
                updatePhone = teacherPhoneNumber.value;
            } else {
                updatePhone = ruleForm.pass;
                ifUpdate = true;
            }
            if (disableItems.address) {
                updateAddress = teacherAddress.value;
            } else {
                updateAddress = ruleForm.address;
                ifUpdate = true;
            }

            if (ifUpdate) {
                try {
                    updateTeacherData(updatePass, updatePhone, updateAddress, sessionStorage.getItem("number"));
                    ElMessage.success('更新成功！')
                    disableItems.password = true;
                    disableItems.phone = true;
                    disableItems.address = true;
                } catch (error) {
                    ElMessage.error(`服务器更新教师数据失败:${error}`)
                    console.log("服务器更新教师数据失败:", error);
                }
            }
        } else {
            console.log('error submit!')
        }
    })
}
// 点击重置后的函数
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// 点击对应属性编辑按钮让其可以修改
const enablePass = () => {
    disableItems.password = !disableItems.password
}

const enablePhone = () => {
    disableItems.phone = !disableItems.phone
}

const enableAddress = () => {
    disableItems.address = !disableItems.address
}

</script>


<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
             hide-required-asterisk>

        <el-form-item label="姓名">
            <el-input disabled :placeholder="teacherName"/>
        </el-form-item>

        <el-form-item label="新密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password
                      :disabled="disableItems.password">
                <template #append>
                    <el-button :icon="Edit" @click="enablePass"/>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password
                      :disabled="disableItems.password"/>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" :placeholder="teacherPhoneNumber" :disabled="disableItems.phone">
                <template #append>
                    <el-button :icon="Edit" @click="enablePhone"/>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address" :placeholder="teacherAddress" :disabled="disableItems.address">
                <template #append>
                    <el-button :icon="Edit" @click="enableAddress"/>
                </template>
            </el-input>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
        
    </el-form>

</template>


