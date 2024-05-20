<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, deletePlan } from '@/api/plan.js'
import VLeftTime from '@/components/common/VLeftTime.vue'

const route = useRoute()
const router = useRouter()

const { planId } = route.params

const plan = ref({})

onMounted(() => {
  showPlan()
})

const showPlan = () => {
  getPlan(
    planId,
    ({ data }) => {
      plan.value = data
      console.log(plan.value)
    },
    (error) => {
      console.log(error)
    }
  )
}

function moveDetail() {
  router.push({ name: "detail-create", params: { planId } })
}

function moveList() {
  router.push({ name: "plan-list" })
}

function moveModify() {
  router.push({ name: "plan-modify", params: { planId } })
}

function onDeletePlan() {
  deletePlan(
    planId,
    (response) => {
      if (response.status === 200) moveList()
    },
    (error) => {
      console.error(error)
    }
  )
}

</script>

<template>
  <div class="container">
    <div class="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:max-w-4xl xl:max-w-6xl">
      <div class="flex justify-between items-center p-8"> <!-- 여기에 flex와 items-center를 추가 -->
        <!-- planTitle을 별도의 행으로 추가하고 크기를 조정 -->
        <div class="text-xl font-bold">{{ plan.planTitle }}</div> <!-- text-xl과 font-bold로 변경 -->
        <!-- VLeftTime 컴포넌트를 크고 초록색으로 표시하고 크기를 조정 -->
        <div class="text-xl font-bold" style="color: #32a852;"> <!-- text-xl과 font-bold로 변경 -->
          <VLeftTime :dday="plan.startDate" />
        </div>
      </div>
      <div class="p-8 flex justify-between">
        <div>
          <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black">여행 기간: {{ plan.startDate }} - {{
            plan.endDate }}</a>
          <p class="mt-2 text-gray-500">예산: {{ plan.budget }}원</p>
        </div>
        <!-- 이미지 추가 -->
        <img src="/src/assets/loading.gif" alt="설명" class="w-24 h-24 object-cover rounded-full">
      </div>
      <!-- 버튼 추가 -->
      <div class="mt-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">지도</button>
        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">수정</button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">삭제</button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">목록</button>
      </div>
    </div>

    <div class="row mt-5">
      <VLeftTime :dday="plan.startDate" />
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5>{{ plan.planTitle }}</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <img src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" alt="User" width="50"
                  height="50" class="me-2" />
                <p>
                  <span class="fw-bold">plan id: {{ planId }}</span> <br />
                  <span class="text-secondary fw-light">
                    {{ plan.startDate }} ~ {{ plan.endDate }} <br />
                    예산: {{ plan.budget }}원
                  </span>
                </p>
              </div>
              <div class="col-md-4 align-self-center text-end">
                그룹 ID: {{ plan.groupId }}
              </div>
            </div>
            <div class="divider mb-3"></div>
            <div class="text-secondary">
              {{ plan.content }}
            </div>
            <div class="divider mt-3 mb-3"></div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-outline-primary mb-3" @click="moveDetail">
                상세 계획
              </button>
              <button type="button" class="btn btn-outline-primary mb-3 ms-1" @click="moveList">
                계획 목록
              </button>
              <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
                계획 수정
              </button>
              <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeletePlan">
                계획 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>