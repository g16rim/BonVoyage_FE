<script setup>
import { useSidebarStore } from '@/stores/sidebar';
import { computed, onMounted } from 'vue';
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from "pinia"
const authStore = useMemberStore()
const { isLogin, userInfo } = storeToRefs(authStore)
onMounted(() => {
    authStore.getUserInfo(sessionStorage.getItem("accessToken"))
})
console.log("로그인 상태: ", isLogin.value)

const sidebarStore = useSidebarStore();

const isUserLoggedIn = computed(() => authStore.isLogin)
</script>

<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #e2caa7; height: 500px;">
        <div class="container" style="background-color: #e2caa7;">
            <a href="/" class="navbar-brand" style="height: 500px; display: flex; align-items: center;">
                <img class="logo1" src="/src/assets/logo/logo1.png" style="height: 500px;">
                <span class="luckiest-guy-regular" style="font-size: 100px;">BUBBLE<br>TRIP</span>
            </a>
            <div class="image-container" style="position: relative; display: inline-block;">
                <img src="/src/assets/logo/bubble.png" alt="my-menu" style="width: 150px; height: 150px" />
                <!-- userInfo가 있을 때만 버튼을 표시합니다. -->
                <button v-if="userInfo" @click="sidebarStore.toggle"
                    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg> {{ userInfo.username }} 님
                </button>
                <button v-else style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <router-link :to="{ name: 'login' }" class="nav-link" style="display: flex; align-items: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6" style="vertical-align: middle;">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                        </svg>
                        <span class="luckiest-guy-regular" style="margin-left: 8px;">Go!</span>
                    </router-link>

                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>