<script setup>
import SwiperComponent from "@/components/common/VSwiper.vue"
import BestReviewComponent from "@/components/layout/BestReview.vue"
import { useMemberStore } from '@/stores/member'
import { storeToRefs } from "pinia"

const authStore = useMemberStore()

// 로그인 상태 확인
const { isLogin, isLoginError } = storeToRefs(authStore)
const { userLogin, getUserInfo } = authStore

</script>

<template>
  <div id="main">
    <div class="luckiest-guy-regular" id="topMain">
      <SwiperComponent />
    </div>
    <div id="bottomMain">
      <BestReviewComponent />
    </div>

  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* 위에서 아래로 정렬 */
  align-items: stretch;
  /* 가로 너비에 맞게 확장 */
  height: 100%;
  /* 전체 높이로 설정 */
}

#topMain {
  flex: 1;
  /* 남은 공간을 모두 차지 */
  background-color: #32a852;
  width: 100%;
  font-size: 300px;
}

#bottomMain {
  flex: 0
}
</style>
