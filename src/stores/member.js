import { ref } from "vue"
import { useRouter } from "vue-router"
import { defineStore } from "pinia"
import { jwtDecode } from "jwt-decode"

import { userConfirm, findById, tokenRegeneration, logout } from "@/api/user/user"
import { httpStatusCode } from "@/util/http-status"

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter()
  const isLogin = ref(false)
  const isLoginError = ref(false)
  const userInfo = ref(null)
  const isValidToken = ref(false)

  const userLogin = async (loginUser) => {
    await userConfirm(
      loginUser,
      (response) => {
        console.log("status :", response.status)
        if (response.status === httpStatusCode.OK) {
          console.log("로그인 성공!!!!")
          let { data } = response
          let accessToken = data["accessToken"]
          let refreshToken = data["refreshToken"]
          isLogin.value = true
          isLoginError.value = false
          isValidToken.value = true
          sessionStorage.setItem("accessToken", accessToken)
          sessionStorage.setItem("refreshToken", refreshToken)
          console.log(sessionStorage.value)
        }
      },
      (error) => {
        console.log("로그인 실패!!!!")
        isLogin.value = false
        isLoginError.value = true
        isValidToken.value = false
        console.error(error)
      }
    )
  }

  const getUserInfo = async (token) => {
    let decodeToken = jwtDecode(token)
    console.log(decodeToken)

    userInfo.value = await findById(
      (response) => {
        if (response.status === httpStatusCode.OK) {
          console.log("response data" + response.data)
          userInfo.value = response.data.userInfo
          console.log("유저정보다임마" + userInfo.value)
        } else {
          console.log("유저 정보가 없습니다.")
        }
      },
      async (error) => {
        console.error(
          "g[토큰 만료되어 사용 불가능.] : ",
          error.response.status,
          error.response.statusText
        )
        isValidToken.value = false

        await tokenRegenerate()
      }
    )
    console.log("member.js 정보 : ", userInfo.value);

  }


  const tokenRegenerate = async () => {
    await tokenRegeneration(
      JSON.stringify(userInfo.value),
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          let accessToken = response.data["access-token"]
          sessionStorage.setItem("accessToken", accessToken)
          isValidToken.value = true
        }
      },
      async (error) => {
        // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
        if (error.response.status === httpStatusCode.UNAUTHORIZED) {
          // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
          await logout(
            userInfo.value.userid,
            (response) => {
              if (response.status === httpStatusCode.OK) {
                console.log("리프레시 토큰 제거 성공")
              } else {
                console.log("리프레시 토큰 제거 실패")
              }
              alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.")
              isLogin.value = false
              userInfo.value = null
              isValidToken.value = false
              router.push({ name: "user-login" })
            },
            (error) => {
              console.error(error)
              isLogin.value = false
              userInfo.value = null
            }
          )
        }
      }
    )
  }

  const userLogout = async () => {

    await logout(
      (response) => {

        if (response.status === httpStatusCode.OK) {
          isLogin.value = false
          userInfo.value = null
          isValidToken.value = false

          sessionStorage.removeItem("accessToken")
          sessionStorage.removeItem("refreshToken")
        } else {
          console.log("유저 정보가 없습니다.")
        }
      },
      async (error) => {
        console.error(
          "g[토큰 만료되어 사용 불가능.] : ",
          error.response.status,
          error.response.statusText
        )

      }
    )
  }

  const checkLoginStatus = () => {
    const accessToken = sessionStorage.getItem("accessToken")
    if (accessToken) {
      isLogin.value = true
      isValidToken.value = true
      // 필요하다면, 여기에서 accessToken을 사용하여 사용자 정보를 불러오는 로직을 추가할 수 있습니다.
    }
  }

  // 스토어 초기화 시 로그인 상태 확인
  checkLoginStatus()

  return {
    isLogin,
    isLoginError,
    userInfo,
    isValidToken,
    userLogin,
    getUserInfo,
    tokenRegenerate,
    userLogout,
  }
})