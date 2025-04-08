import {createRouter, createWebHistory} from 'vue-router'

import main from '@/components/Main.vue'
import login from "@/components/Login.vue"
import studentInformation from "@/components/StudentInformation.vue";
import studentInformationChange from "@/components/StudentInformationChange.vue"
import courseSelectionSystem from "@/components/CourseSelectionSystem.vue";
import courseSelectionInquiry from "@/components/CourseSelectionInquiry.vue";
import courseSchedule from "@/components/CourseSchedule.vue";
import creditStatistics from "@/components/CreditStatistics.vue";
import teacherInformation from "@/components/TeacherInformation.vue";
import teacherInformationChange from "@/components/TeacherInformationChange.vue";
import StudentInformationEntry from "@/components/StudentInformationEntry.vue";
import StudentScoreEntry from "@/components/StudentScoreEntry.vue";


const routes = [
    // 登录页面
    {path: '/login', component: login},

    // 主页面
    {
        path: "/", component: main, children: [
            {path: '/student/information', component: studentInformation},
            {path: '/student/change', component: studentInformationChange},
            {path: '/study/system', component: courseSelectionSystem},
            {path: '/study/inquiry', component: courseSelectionInquiry},
            {path: '/course/schedule', component: courseSchedule},
            {path: '/course/credit', component: creditStatistics},
            {path: '/teacher/information', component: teacherInformation},
            {path: '/teacher/change', component: teacherInformationChange},
            {path: '/teacher/student', component: StudentInformationEntry},
            {path: '/teacher/score', component: StudentScoreEntry},
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 路由守卫，在登录状态为 0 时自动跳转登录界面
router.beforeEach(async (to, from) => {
    if (sessionStorage.getItem("status") !== "1" && sessionStorage.getItem("status") !== "2" && to.path !== "/login") {
        return {path: "/login"}
    }
})

export default router;