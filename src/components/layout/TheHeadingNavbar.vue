<script setup>
import { useSidebarStore } from '@/stores/sidebar';
import { watch, onMounted } from 'vue';
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from "pinia"
const authStore = useMemberStore()
const { isLogin, userInfo } = storeToRefs(authStore)
onMounted(() => {
    authStore.getUserInfo(sessionStorage.getItem("accessToken"))
})
console.log("로그인 상태: ", isLogin.value)

const sidebarStore = useSidebarStore();
const { userLogout } = authStore;

watch(() => sidebarStore.visible, (isVisible) => {
    // console.log('Sidebar visibility changed:', isVisible);
    // 여기에서 사이드바 상태에 따라 필요한 동작을 수행
});

const logout = () => {
    userLogout();
};

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
                    버블버블 안녕하세요, {{ userInfo.username }} 님
                </button>
                <button v-else style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <router-link :to="{ name: 'login' }" class="nav-link">로그인</router-link>
                </button>
            </div>
            <div>
            </div>
            <!-- <div class="nav-item mr-12">
                <a href="" class="nav-link">
                    <button @click="sidebarStore.toggle">
                        <img class="" src="/src/assets/logo/bubble.png" alt="my-menu"
                            style="width: 150px; height: 150px" />
                            div.
                    </button>
                </a>
            </div> -->

            <!-- <div class="bubble-container">
                <button @click="sidebarStore.toggle">
                    <img class="bubble" src="/src/assets/logo/bubble.png" alt="" srcset="">
                    <div class="blink">
                        <p class="pop luckiest-guy-regular">POP!</p>
                    </div>
                </button>

                <div v-if="userInfo !== null">
                    <p id="hello" class="navbar-text luckiest-guy-regular" style="font-size: large;">{{ `버블버블 안녕하세요,` }}
                    </p>
                    <p class="luckiest-guy-regular">{{ ` ${userInfo.grade.grade} ${userInfo.username}님 ` }}</p>
                    <li class="nav-item">
                        <router-link id="login-button" :to="{ name: 'login' }" class="nav-link">로그아웃</router-link>
                    </li>
                </div>
                <div v-else>
                    <button class="nav-item">
                        <router-link id="login-button" :to="{ name: 'login' }" class="nav-link">로그인</router-link>
                    </button>
                </div>
            </div> -->
        </div>
    </nav>
</template>

<style scoped>
#login-button {
    font-size: larger;
    text-align: center;
}

@keyframes blink-effect {
    50% {
        opacity: 0;
    }
}

.blink {

    width: 200px;
    height: 50px;
    animation: blink-effect 1s step-end infinite;
    font-size: large;
}

.bubble-container {
    /* position: absolute; */
    /* top: 35%; */
    /* 부모 요소 높이의 25% 위치에 배치 */
    /* right: 5%; */
    /* 부모 요소 오른쪽에서 5% 위치에 배치 */
    transform: translate(-50%, -50%);
}

.bubble-container img {
    width: 150px;
    height: 150px;
    /* vertical-align: middle; */
}


.pop {
    position: absolute;
    top: 30%;
    left: 25%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
    font-size: large;
    /* 필요에 따라 원하는 크기로 조정 */
    opacity: 1;
    /* 초기에는 보이지 않도록 설정 */
}
</style>