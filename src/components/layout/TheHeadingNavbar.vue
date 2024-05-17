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
console.log("로그인 상태2222", isLogin.value)
console.log("유저상태33333", userInfo)
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
    <nav class="navbar navbar-expand-lg" style="background-color: #e2caa7;">
        <div class="container-fluid" style="background-color: #e2caa7;">

            <img class="logo1" src="/src/assets/logo/logo1.png" alt="" srcset="">
            <a class="navbar-brand luckiest-guy-regular" href="#" style="padding-left: 50px;">BUBBLE <br>TRIP</a>


            <div class="bubble-container">
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
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {

    width: 100%;

    .logo1 {
        height: 500px;
    }

    height: 500px;

    a {
        font-size: 100px;
    }

}

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
    position: absolute;
    top: 35%;
    /* 부모 요소 높이의 25% 위치에 배치 */
    right: 5%;
    /* 부모 요소 오른쪽에서 5% 위치에 배치 */
    transform: translate(-50%, -50%);
}

.bubble-container img {
    width: 150px;
    height: 150px;
    vertical-align: middle;
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

.bubble:hover .pop {
    opacity: 1;
    /* bubble에 hover시 pop! 텍스트가 나타나도록 설정 */
}
</style>