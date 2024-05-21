<script setup>
import 'tailwindcss/tailwind.css';
import { useSidebarStore } from '@/stores/sidebar.js';
import { useMemberStore } from '@/stores/member.js'

const sidebarStore = useSidebarStore();
const memberStore = useMemberStore()

const toggleSidebar = () => {
    sidebarStore.toggle();
};

const logout = () => {
    console.log("로그아웃")
    memberStore.userLogout()
}
</script>


<template>

    <!-- 사이드바 내용 -->
    <div class="sidebar-content">
        <div class="flex flex-col sm:flex-row sm:justify-end">
            <div class="w-64 h-screen bg-blue-300" style="background-color: #9cd7ff;width: 500px;">
                <div class="flex justify-end p-2">
                    <button @click="toggleSidebar" class="text-black font-bold text-xl">&times;</button>
                </div>
                <div class="flex items-center justify-center mt-10">
                    <img class="h-6" src="/src/assets/logo/logo2.png" style="width: 150px;height: auto;">
                </div>

                <router-link
                    class="flex items-center mt-5 py-2 px-8 text-gray-600 border-trasnparent hover:bg-gray-200 hover:text-xl hover:border-gray-700"
                    :to="{ name: 'mypage' }" @click="toggleSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span class="mx-4 font-medium">My Page</span>
                </router-link>

                <router-link
                    class="flex items-center mt-5 py-2 px-8 text-gray-600 border-trasnparent hover:bg-gray-200 hover:text-xl hover:border-gray-700"
                    :to="{ name: 'group' }" @click="toggleSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <span class="mx-4 font-medium">Group</span>
                </router-link>

                <router-link
                    class="flex items-center mt-5 py-2 px-8 text-gray-600 border-trasnparent hover:bg-gray-200 hover:text-xl hover:border-gray-700"
                    :to="{ name: 'plan-list' }" @click="toggleSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                    </svg>
                    <span class="mx-4 font-medium">Plan</span>
                </router-link>

                <router-link
                    class="flex items-center mt-5 py-2 px-8 text-gray-600 border-trasnparent hover:bg-gray-200 hover:text-xl hover:border-gray-700"
                    :to="{ name: 'record' }" @click="toggleSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span class="mx-4 font-medium">Record</span>
                </router-link>

                <!-- <a class="flex items-center mt-5 py-2 px-8 text-gray-600 border-r-4 border-white hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700"
                    href="#">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span class="mx-4 font-medium">Settings</span>
                </a> -->

                <div class="absolute bottom-0 my-10">
                    <button class="flex items-center justify-end py-2 px-8 text-gray-500 hover:text-xl" @click="logout">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        <span class="mx-4 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>



<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: -300px;
    /* 사이드바는 처음에 화면 왼쪽에 가려져 있음 */
    width: 250px;
    height: 100%;
    background-color: #f0f0f0;
    transition: left 0.3s ease;
}

.sidebar.show {
    left: 0;
    /* visible 값이 true일 때 사이드바를 화면에 보여줌 */
}

/* .sidebar-content {
padding: 20px;
} */
</style>