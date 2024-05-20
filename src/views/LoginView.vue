<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"

    const authStore = useMemberStore()
    const router = useRouter()

        // 로그인 상태 확인
    const { isLogin, isLoginError } = storeToRefs(authStore)
    const { userLogin, getUserInfo } = authStore
    console.log("로그인 상태", isLogin.value)

        
    const loginUser = ref({
        userId: "",
        userPwd: "",
    })

    const login = async () => {
        await userLogin(loginUser.value)

        let token = sessionStorage.getItem("accessToken")

        if (isLogin.value) {
            getUserInfo(token)
            router.replace("/")
        }
    }
</script>

<template>

    <div id ="loginForm">
        <section class="vh-100" style="background-color: hsl(0, 0%, 96%);">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">

                                <div class="loginHeader">로그인</div>
                                <br>
                                <div data-mdb-input-init class="form-outline mb-4">
                                <input type="email" v-model="loginUser.userId" id="typeEmailX-2" class="form-control form-control-lg" placeholder="Email을 입력해주세요"/>
                                <!-- <label class="form-label" for="typeEmailX-2"></label> -->
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                <input type="password" v-model="loginUser.userPwd" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Password를 입력해주세요"/>
                                <!-- <label class="form-label" for="typePasswordX-2"></label> -->
                                </div>

                                <!-- Checkbox -->
                                <div class="form-check d-flex justify-content-start mb-4">
                                <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
                                <label class="form-check-label" for="form1Example3"> Email 기억하기 </label>
                                </div>

                                <button @click="login" type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block"  style="background-color: gray;">Login</button>

                                <hr class="my-4">

                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block btn-primary" style="background-color: white;" type="submit">
                                    <img src="../assets/login/google_icon.png" style="width: 25px;">Sign in with google
                                </button>
                                <br/>
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block btn-primary mb-2" style="background-color: white;" type="submit">
                                    <img src="../assets/login/naver_logo.png" style="width: 20px;padding-right: 5px;">Sign in with naver
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </template>
  

<style scoped>

.loginHeader {
    font-size: x-large;
}

input, label{
    font-size: small;
}

/* 버튼의 너비를 80%로 설정합니다. */
.btn {
    font-size: small;
    width: 80%;
    color : rgb(56, 56, 56);
    border-color: rgb(179, 176, 176);
}
.btn:hover{
    color: black;
}

</style>