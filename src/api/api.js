import api from ".";
import {ElMessage} from "element-plus";

export const getStudentData = async (number) => {
    try {
        return await api.get(`/studentData?number=${number}`);
    } catch (error) {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            ElMessage.error(`服务器内部错误:${error.response.status}`);
        } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            console.log(error.request);
            ElMessage.error(`服务器错误响应:${error.request}`);
        } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
            ElMessage.error(`服务器请求失败:${error.message}`);
        }
        console.log(error.config);
    }
}

export const getTeacherData = async (number) => {
    try {
        return await api.get(`/teacherData?number=${number}`);
    } catch (error) {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            ElMessage.error(`服务器内部错误:${error.response.status}`);
        } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            console.log(error.request);
            ElMessage.error(`服务器错误响应:${error.request}`);
        } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
            ElMessage.error(`服务器请求失败:${error.message}`);
        }
        console.log(error.config);
    }
}

export const updateStudentData = async (password, phone, address, number) => {
    try {
        const response = await api.put('/updateStudent', {
            password: password,
            phone: phone,
            address: address,
            number: number,
        });
    } catch (error) {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            ElMessage.error(`服务器内部错误:${error.response.status}`);
        } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            console.log(error.request);
            ElMessage.error(`服务器错误响应:${error.request}`);
        } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
            ElMessage.error(`服务器请求失败:${error.message}`);
        }
        console.log(error.config);
    }
};

export const updateTeacherData = async (password, phone, address, number) => {
    try {
        const response = await api.put('/updateTeacher', {
            password: password,
            phone: phone,
            address: address,
            number: number,
        });
    } catch (error) {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            ElMessage.error(`服务器内部错误:${error.response.status}`);
        } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            console.log(error.request);
            ElMessage.error(`服务器错误响应:${error.request}`);
        } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
            ElMessage.error(`服务器请求失败:${error.message}`);
        }
        console.log(error.config);
    }
};

export const getCourseData = async (params = {}) => {
    try {
        const query = new URLSearchParams(params).toString();
        return await api.get(`/courseData?${query}`);

    } catch (error) {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            ElMessage.error(`服务器内部错误:${error.response.status}`);
        } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            console.log(error.request);
            ElMessage.error(`服务器错误响应:${error.request}`);
        } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
            ElMessage.error(`服务器请求失败:${error.message}`);
        }
        console.log(error.config);
    }
};

