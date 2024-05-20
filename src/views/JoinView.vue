<template>
  <div id="signupForm">
    <section class="vh-100" style="background-color: hsl(0, 0%, 96%);">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">
                <div class="signupHeader">회원 가입</div>
                <br>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="text" v-model="signupUser.name" id="typeName" class="form-control form-control-lg" placeholder="이름을 입력해주세요"/>
                </div>
                <div class="input-group mb-4">
                  <input type="email" v-model="signupUser.email" id="typeEmail" class="form-control form-control-lg" placeholder="Email을 입력해주세요"/>
                  <button @click="checkDuplicateEmail" class="btn btn-outline-primary" type="button">중복확인</button>
                </div>
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" v-model="signupUser.password" id="typePassword" class="form-control form-control-lg" placeholder="Password를 입력해주세요"/>
                </div>
                <div class="mb-4">
                  <label for="profileImage" class="form-label">프로필 이미지 업로드</label>
                  <input type="file" id="profileImage" @change="handleProfileImageUpload" accept="image/*">
                </div>
                <button @click="signup" type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block"  style="background-color: gray;">회원 가입</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"

const authStore = useMemberStore()
const router = useRouter()

// 회원 가입 정보를 저장할 객체
const signupUser = ref({
  name: "",
  email: "",
  password: "",
  profileImage: null // 프로필 이미지 파일 객체
})

// 중복 이메일 확인 함수
const checkDuplicateEmail = () => {
  // 이메일 중복 확인 로직을 구현해야 합니다.
}

// 프로필 이미지 업로드 핸들러
const handleProfileImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    signupUser.value.profileImage = file;
  }
}

// 회원 가입 함수
const signup = async () => {
  // 이 부분에서 회원 가입 로직을 구현해야 합니다. 
  // 이메일, 비밀번호, 이름 등을 서버로 전송하고 회원 가입 처리를 해야 합니다.
}

</script>

<style scoped>
.signupHeader {
  font-size: x-large;
}

input, label {
  font-size: small;
}

/* 버튼의 너비를 80%로 설정합니다. */
.btn {
  font-size: small;
  width: 80%;
  color : rgb(56, 56, 56);
  border-color: rgb(179, 176, 176);
}
.btn:hover {
  color: black;
}
</style>
