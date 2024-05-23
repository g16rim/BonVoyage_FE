<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { signup } from '@/api/user/user.js'

const authStore = useMemberStore()
const router = useRouter()

// 회원 가입 정보를 저장할 객체
const signupUser = ref({
  name: "",
  email: "",
  password: "",
  birth: "",
  phone: ""
})
const selectedFile = ref(null)

// 유효성 검사 메시지 저장 객체
const validationMessages = ref({
  name: "",
  email: "",
  password: "",
  birth: "",
  phone: "",
  profileImage: ""
})

// 중복 이메일 확인 함수
const checkDuplicateEmail = async () => {
  // 이메일 중복 확인 로직을 구현해야 합니다.
  // 예시로, 중복 확인 결과를 true로 설정합니다.
  // const isDuplicate = false; // 중복 확인 결과
  // if (isDuplicate) {
  //   validationMessages.value.email = "이미 사용 중인 이메일입니다.";
  // } else {
  //   validationMessages.value.email = "사용 가능한 이메일입니다.";
  // }
  validationMessages.value.email = "사용 가능한 이메일입니다.";
}

// 프로필 이미지 업로드 핸들러
const handleProfileImageUpload = (event) => {
  // const file = event.target.files[0];
  // if (file) {
  //   signupUser.value.profileImage = file;
  // }
  selectedFile.value = event.target.files[0]
}

// 입력값 검증 함수
const validateInput = () => {
  let isValid = true;

  if (!signupUser.value.name) {
    validationMessages.value.name = "이름을 입력해주세요.";
    isValid = false;
  } else {
    validationMessages.value.name = "";
  }

  if (!signupUser.value.email) {
    validationMessages.value.email = "이메일을 입력해주세요.";
    isValid = false;
  }
  // else if (validationMessages.value.email !== "사용 가능한 이메일입니다.") {
  //   validationMessages.value.email = "이미 가입된 이메일입니다.";
  //   isValid = false;
  // }
  else {
    validationMessages.value.email = "사용 가능한 이메일입니다.";
  }

  if (!signupUser.value.password || signupUser.value.password.length < 8) {
    validationMessages.value.password = "비밀번호는 8자 이상이어야 합니다.";
    isValid = false;
  } else {
    validationMessages.value.password = "";
  }

  if (!/^\d{8}$/.test(signupUser.value.birth)) {
    validationMessages.value.birth = "생년월일은 8자리 숫자여야 합니다.";
    isValid = false;
  } else {
    validationMessages.value.birth = "";
  }

  if (!/^\d+$/.test(signupUser.value.phone)) {
    validationMessages.value.phone = "휴대폰 번호는 숫자만 입력해야 합니다.";
    isValid = false;
  } else {
    validationMessages.value.phone = "";
  }

  return isValid;
}

// 회원가입 함수
const moveSignup = async () => {
  if (!validateInput()) {
    return;
  }
  // 이 부분에서 회원 가입 로직을 구현해야 합니다.
  // 이메일, 비밀번호, 이름 등을 서버로 전송하고 회원 가입 처리를 해야 합니다.
  const formData = new FormData()
  formData.append('signUpRequest', new Blob([JSON.stringify(signupUser.value)], { type: 'application/json' }))
  if (selectedFile.value) {
    formData.append('file', selectedFile.value)
  }

  await signup(
    formData,
    (response) => {
      console.log("회원가입 성공", response)
      router.push({ name: 'login' })
    },
    (error) => console.error(error)
  )
}
</script>

<template>
  <div id="signupForm">
    <div class="container py-5 h-100 my-auto">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <div class="signupHeader">회원가입</div>
              <br>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" v-model="signupUser.name" id="typeName" class="form-control form-control-lg"
                  placeholder="이름을 입력해주세요" />
                <div v-show="validationMessages.name" class="text-danger text-sm">{{ validationMessages.name }}</div>
              </div>
              <div class="input-group mb-4">
                <input type="email" v-model="signupUser.email" id="typeEmail" class="form-control form-control-lg"
                  placeholder="Email을 입력해주세요" />
                <button @click="checkDuplicateEmail" class="btn btn-outline-primary" type="button">중복확인</button>
              </div>
              <div v-show="validationMessages.email" class="mb-4 text-danger text-sm">{{ validationMessages.email }}
              </div>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="password" v-model="signupUser.password" id="typePassword"
                  class="form-control form-control-lg" placeholder="Password를 입력해주세요" />
                <div v-show="validationMessages.password" class="text-danger text-sm">{{ validationMessages.password }}
                </div>
              </div>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" v-model="signupUser.birth" id="typeBirth" class="form-control form-control-lg"
                  placeholder="생년월일을 입력해주세요" />
                <div v-show="validationMessages.birth" class="text-danger text-sm">{{ validationMessages.birth }}</div>
              </div>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" v-model="signupUser.phone" id="typePhone" class="form-control form-control-lg"
                  placeholder="휴대폰 번호를 입력해주세요" />
                <div v-show="validationMessages.phone" class="text-danger text-sm">{{ validationMessages.phone }}</div>
              </div>
              <div class="mb-4">
                <label for="profileImage" class="form-label">프로필 이미지 업로드</label>
                <input type="file" id="profileImage" @change="handleProfileImageUpload" accept="image/*">
              </div>
              <button @click="moveSignup" type="submit" data-mdb-button-init data-mdb-ripple-init
                class="btn btn-primary btn-lg btn-block" style="background-color: #32a852;"
                id="signup-btn">회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.signupHeader {
  font-size: x-large;
}

input,
label {
  font-size: small;
}

/* 버튼의 너비를 80%로 설정합니다. */
#signup-btn {
  font-size: small;
  width: 80%;
  color: rgb(56, 56, 56);
  border-color: rgb(179, 176, 176);
}

#signup-btn:hover {
  color: black;
}

btn:hover {
  color: white;
}

.form-outline {
  position: relative;
}
</style>
