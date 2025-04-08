<script lang="ts" setup xmlns="http://www.w3.org/1999/html">


import {ref} from 'vue'
import type {CollapseModelValue} from 'element-plus'

const activeNames = ref(['1','4'])
const handleChange = (val: CollapseModelValue) => {
    console.log(val)
}

const number = ref(sessionStorage.getItem("number"))
const status = ref(sessionStorage.getItem("status"))

</script>

<template>
    <div class="sidebar">
        <el-collapse v-model="activeNames" @change="handleChange">

            <el-collapse-item name="1" v-if="status === '1'">
                <template #title>
                    <el-icon size="30px">
                        <svg t="1743405872560" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="18658" width="200" height="200">
                            <path
                                d="M666.7 281.9v-40.7c0-6.4-5.4-11.6-12-11.6h-386c-6.6 0-12 5.2-12 11.6v40.7c0 6.4 5.4 11.6 12 11.6h386c6.6 0 12-5.2 12-11.6zM447.7 410.5h-180c-6.6 0-12 5.2-12 11.6v40.7c0 6.4 5.4 11.6 12 11.6h180c6.6 0 12-5.2 12-11.6v-40.7c0-6.4-5.4-11.6-12-11.6z"
                                p-id="18659" fill="#606266"></path>
                            <path
                                d="M404.7 888H182.2V136h560v298.4c0 8.8 7.2 16 16 16h40c8.8 0 16-7.2 16-16V96c0-17.6-14.4-32-32-32h-640c-17.6 0-32 14.4-32 32v832c0 17.6 14.4 32 32 32h262.5c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16z"
                                p-id="18660" fill="#606266"></path>
                            <path
                                d="M899.6 862.9c-9.8-21.3-24.5-39.9-43.5-55.1-12.9-10.3-27.6-19-44-25.9 3.5-3.2 6.8-6.7 10-10.3 23-26.9 34.7-63.9 34.7-110 0-87.1-70.9-158-158-158s-158 70.9-158 158c0 46.1 19.8 87.6 51.4 116.5-19.8 7.4-38.2 17.1-54.5 28.9-21.1 15.2-37.8 33.2-49.6 53.3-12.8 21.8-19.2 45.1-19.2 69.3 0 16.6 13.4 30 30 30s30-13.4 30-30c0-27.2 15.6-53.5 43.9-74 31.3-22.6 73.4-35 118.6-35 55.4 0 99.4 11.8 127.4 34.2 23.3 18.6 35.1 43.8 35.1 74.8 0 16.6 13.4 30 30 30s30-13.4 30-30c-0.1-24-4.9-46.4-14.3-66.7zM698.8 563.5c54 0 98 44 98 98 0 31.4-6.8 55.3-20.3 71-15.3 17.9-41.5 27-77.7 27-54 0-98-44-98-98s43.9-98 98-98z"
                                p-id="18661" fill="#606266"></path>
                        </svg>
                    </el-icon>
                    <p class="items">学生中心</p>
                </template>
                <div class="item">
                    <RouterLink :to="{
                        path:'/student/information',
                        query:{
                            number:number
                        }
                    }">
                        学生信息
                    </RouterLink>
                </div>
                <div class="item">
                    <RouterLink :to="{
                        path:'/student/change',
                        query:{
                            number:number
                        }
                    }">
                        信息修改
                    </RouterLink>
                </div>
            </el-collapse-item>

            <el-collapse-item name="2" v-if="status === '1'">
                <template #title>
                    <el-icon size="30px">
                        <svg t="1743405814039" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="17467" width="200" height="200">
                            <path
                                d="M512 755.44a29.984 29.984 0 0 1-14.032-2.96l-285.184-119.696a36.8 36.8 0 0 1-22.912-34.048v-481.6a37.536 37.536 0 0 1 16.256-31.024 36.416 36.416 0 0 1 34.72-2.96l156.624 65.76a36.8 36.8 0 0 1-28.08 67.968l-105.6-44.336v401.184l211.296 88.656v-425.6a36.8 36.8 0 0 1 22.896-33.984l285.184-119.696a38.528 38.528 0 0 1 34.72 2.96 36.592 36.592 0 0 1 16.256 31.024v481.648a36.8 36.8 0 0 1-22.896 33.984l-155.888 65.024a36.8 36.8 0 0 1-28.08-67.968l132.992-56.144v-401.12l-211.328 88.624v456.592a37.536 37.536 0 0 1-16.256 31.024 34.56 34.56 0 0 1-20.688 6.688z"
                                fill="#606266" p-id="17468"></path>
                            <path
                                d="M512 944a40 40 0 0 1-12.896-2.176L54.928 769.696A36.384 36.384 0 0 1 32 735.552V304.128a35.824 35.824 0 1 1 71.648 0v406L512 868.528l408.352-158.4v-376.96a35.824 35.824 0 1 1 71.648 0v402.368a37.136 37.136 0 0 1-22.928 34.144L524.896 941.808A34.272 34.272 0 0 1 512 944z"
                                fill="#606266" p-id="17469"></path>
                        </svg>
                    </el-icon>
                    <p class="items">我的学业</p>
                </template>
                <div class="item">
                    <RouterLink :to="{
                        path:'/study/system',
                        query:{
                            number:number
                        }
                    }">
                        选课系统
                    </RouterLink>
                </div>
                <div class="item">
                    <RouterLink :to="{
                        path:'/study/inquiry',
                        query:{
                            number:number
                        }
                    }">
                        选课查询
                    </RouterLink>
                </div>

            </el-collapse-item>
            <el-collapse-item name="3" v-if="status === '1'">
                <template #title>
                    <el-icon size="30px">
                        <svg t="1743405621668" class="icon" viewBox="0 0 1026 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="11170" width="200" height="200">
                            <path
                                d="M512.072321 64.049197L64.09528 238.44026 512.072321 412.831322l450.088933-174.391062L512.008325 64.049197z m23.03882-59.644943l450.152929 174.391063a63.99672 63.99672 0 0 1 0 119.353883L535.111141 472.540262a63.99672 63.99672 0 0 1-46.333626 0L40.864471 298.021206a63.99672 63.99672 0 0 1 0-119.289886l447.977041-174.391062a63.99672 63.99672 0 0 1 46.269629 0z"
                                fill="#606266" p-id="11171"></path>
                            <path
                                d="M760.763576 663.890456h63.99672v73.724221c-106.106562 83.771707-212.533108 94.267169-319.343634 94.267169-106.874523 0-213.749045-10.495462-320.623568-94.267169V345.570769l63.996721 30.462439v329.071135c70.844369 47.741553 143.672637 62.716786 256.626847 62.716786 112.634227 0 185.142511-14.911236 255.346914-62.588792v-41.341881z m-255.346914 103.99467c112.634227 0 185.142511-14.975233 255.346914-62.652789v-41.341881h63.99672v73.724221c-106.106562 83.771707-212.533108 94.267169-319.343634 94.267169-106.874523 0-213.749045-10.495462-320.623568-94.267169V346.466724l63.996721 29.438491v329.199128c70.844369 47.741553 143.672637 62.716786 256.626847 62.716786zM532.999249 291.941518a31.99836 31.99836 0 0 1 22.142865-60.028924L832.055922 333.923366V455.709125a31.99836 31.99836 0 1 1-63.99672 0V378.52908L532.999249 291.877521z"
                                fill="#606266" p-id="11172"></path>
                            <path
                                d="M792.441952 723.215415h15.23122l0.57597-4.351777a38.526026 38.526026 0 0 1-8.19158-5.759705 38.526026 38.526026 0 0 1-8.19158 5.759705l0.639967 4.351777z m-15.99918 233.396039h47.293577l-23.678787-176.630948-23.678786 176.630948z m-2.367878-297.392759h51.965336a25.598688 25.598688 0 0 1 25.406698 22.206862l41.533872 310.192103a25.598688 25.598688 0 0 1-25.406698 28.990514h-135.03308a25.598688 25.598688 0 0 1-25.406698-28.990514l41.597869-310.192103a25.598688 25.598688 0 0 1 25.342701-22.206862z"
                                fill="#606266" p-id="11173"></path>
                            <path
                                d="M800.057562 694.608881c-58.237015 0-101.754785-56.317114-101.754785-122.361729s43.51777-122.361729 101.754785-122.361729 101.754785 56.317114 101.754785 122.361729-43.51777 122.361729-101.754785 122.361729z m0-63.99672c18.815036 0 37.758065-24.574741 37.758065-58.365009 0-33.726272-18.943029-58.365009-37.758065-58.365008s-37.758065 24.638737-37.758065 58.365008c0 33.790268 18.943029 58.365009 37.758065 58.365009z"
                                fill="#606266" p-id="11174"></path>
                        </svg>
                    </el-icon>
                    <p class="items">我的课程</p>
                </template>
                <div class="item">
                    <RouterLink :to="{
                        path:'/course/schedule',
                        query:{
                            number:number
                        }
                    }">
                        课表查询
                    </RouterLink>
                </div>
                <div class="item">
                    <RouterLink :to="{
                        path:'/course/credit',
                        query:{
                            number:number
                        }
                    }">
                        学分统计
                    </RouterLink>
                </div>
            </el-collapse-item>
            <el-collapse-item name="4" v-if="status === '2'">
                <template #title>
                    <el-icon size="30px">
                        <svg t="1743404251594" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="9932" width="200" height="200">
                            <path
                                d="M311.6 592.8c-80.4 0-145.7-65.4-145.7-145.7s65.4-145.7 145.7-145.7S457.3 366.7 457.3 447s-65.4 145.8-145.7 145.8z m0-243.6c-53.9 0-97.8 43.9-97.8 97.8s43.9 97.8 97.8 97.8 97.8-43.9 97.8-97.8-43.9-97.8-97.8-97.8zM556.5 902.6h-47.9V758.3c0-56.4-45.9-102.3-102.3-102.3H216.8c-56.4 0-102.3 45.9-102.3 102.3v144.3H66.6V758.3C66.6 675.4 134 608 216.8 608h189.4c82.8 0 150.2 67.4 150.2 150.2v144.4z"
                                fill="#606266" p-id="9933"></path>
                            <path d="M957.4 798.7H657.8v-47.9h251.7V159.5H272.4v107.9h-47.9V111.6h732.9z" fill="#606266"
                                  p-id="9934"></path>
                            <path d="M510.715 892.736l184.668-411.903 43.709 19.596-184.668 411.903z" fill="#606266"
                                  p-id="9935"></path>
                        </svg>
                    </el-icon>
                    <p class="items">教师中心</p>
                </template>
                <div class="item">
                    <RouterLink :to="{
                        path:'/teacher/information',
                        query:{
                            number:number
                        }
                    }">
                        教师信息
                    </RouterLink>
                </div>
                <div class="item">
                    <RouterLink :to="{
                        path:'/teacher/change',
                        query:{
                            number:number
                        }
                    }">
                        信息修改
                    </RouterLink>
                </div>
                <div class="item">
                    <RouterLink :to="{
                        path:'/teacher/student',
                        query:{
                            number:number
                        }
                    }">
                        学生录入
                    </RouterLink>
                </div>
                <div class="item">
                    <RouterLink :to="{
                        path:'/teacher/score',
                        query:{
                            number:number
                        }
                    }">
                        成绩录入
                    </RouterLink>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style scoped>


.sidebar {
    padding-left: 20px;
}

.items {
    font-size: 20px;
    font-family: 微软雅黑, fangsong;
    color: #606266;
    margin-left: 5px;
}

.item {
    font-size: 18px;
    font-family: 微软雅黑, fangsong;

}

.item a {
    text-decoration: none;
    color: #606266;
    display: flex;
    margin-left: 10px;
    margin-right: 40px;
    padding-left: 5px;
    border-radius: 4px;
}

.router-link-active {
    background-color: #409EFF;
    color: white !important;
    font-weight: bold;

}


</style>