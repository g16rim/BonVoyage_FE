<script setup>
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from "pinia"
const authStore = useMemberStore()
import { logout } from '@/api/user/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()

// 로그인 상태 확인
const { isLogin, isLoginError, userInfo } = storeToRefs(authStore)
console.log("other navbar 로그인 상태: ", isLogin.value)

const logoutBtn = () => {
    console.log("logout")
    logout(
        () => {
            router.push({ name: 'home' })
        },
        (error) => {
            console.error(error)
        }
    )
}

</script>

<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #e2caa7; height: 100px">
        <div class="container">
            <a class="navbar-brand" href="/" style="height: 100px; display: flex; align-items: center;">
                <img src="/src/assets/logo/logo1.png" alt="Logo" style="height: 80%;" />
                <span class="luckiest-guy-regular" style="margin-left: 10px; font-size: 50px;">BUBBLE TRIP</span>
            </a>
            <div class="login-ing" v-if="isLogin">
                <div class="nav-item dropdown">
                    <a class=" nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/src/assets/logo/bubble.png" alt="my-menu" style="width: 50px; height: 50px" />
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" style="font-size: 20px; background-color: #9cd7ff;">
                        <li class="dropdown-li text-center">
                            {{ userInfo.grade.grade }}, <br />{{ userInfo.username }} 님
                        </li>
                        <li class="dropdown-li">
                            <hr class="dropdown-divider" />
                        </li>
                        <li class="dropdown-li">
                            <router-link class="dropdown-item luckiest-guy-regular" :to="{ name: 'mypage' }">
                                My Page
                            </router-link>
                        </li>
                        <li class="dropdown-li">
                            <hr class="dropdown-divider" />
                        </li>
                        <li class="dropdown-li">
                            <router-link class="dropdown-item luckiest-guy-regular"
                                :to="{ name: 'group' }">Group</router-link>
                            <router-link class="dropdown-item luckiest-guy-regular"
                                :to="{ name: 'plan-list' }">Plan</router-link>
                            <router-link class="dropdown-item luckiest-guy-regular"
                                :to="{ name: 'record' }">Record</router-link>
                        </li>
                        <li class="dropdown-li">
                            <hr class="dropdown-divider" />
                        </li>
                        <li class="dropdown-li luckiest-guy-regular">
                            <button @click="logoutBtn" class="dropdown-item">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else style="display: flex; gap: 10px;">
                <a href="/login" class="nav-link">로그인</a>
                <a href="/join" class="nav-link">
                    회원가입
                </a>
            </div>

        </div>
    </nav>
</template>

<style scoped>
.luckiest-guy-regular {
    font-family: "Luckiest Guy", cursive;
    font-weight: 400;
    font-style: normal;
}

.dropdown-menu .dropdown-li {
    background-color: #9cd7ff;
}
</style>