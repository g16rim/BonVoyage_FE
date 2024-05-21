<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, createPlan, updatePlan } from "@/api/plan.js"

const router = useRouter()
const route = useRoute()

const props = defineProps({
  type: String // 'create' or 'update'
})

const plan = ref({
  startDate: '',
  endDate: '',
  budget: null,
  planTitle: ''
});

onMounted(() => {
  if (props.type === 'update') {
    let { planId } = route.params
    console.log(planId + " 수정")
    getPlan(
      planId,
      ({ data }) => {
        plan.value = data
      },
      (error) => {
        console.log(error)
      }
    )
  }
})

function onSubmit() {
  props.type === "create" ? registPlan() : modifyPlan()
}

function registPlan() {
  createPlan(
    route.params, // groupId
    plan.value,
    (response) => {
      let msg = "계획 등록 시 문제 발생했습니다."
      if (response.status == 201) msg = "계획 등록이 완료되었습니다."
      alert(msg)
      moveList()
    },
    (error) => console.log(error)
  )
}

function moveDetail() {
  router.push({ name: 'detail-create', params: { planId } })
}

function modifyPlan() {
  let { planId } = route.params
  updatePlan(
    planId,
    plan.value,
    (response) => {
      let msg = "계획 수정 시 문제 발생했습니다."
      if (response.status == 200) msg = "계획 수정이 완료되었습니다."
      alert(msg)
      moveList()
    },
    (error) => console.log(error)
  )
}

function moveList() {
  router.push({ name: "group" })
}

const dateError = computed(() => {
  console.log(plan.value.startDate && plan.value.endDate && plan.value.endDate < plan.value.startDate)
  return plan.value.startDate && plan.value.endDate && plan.value.endDate < plan.value.startDate
})

</script>

<template>
  <div class="flex items-center justify-center p-10">
    <div class="mx-auto w-full max-w-[550px]">
      <form @submit.prevent="onSubmit">
        <!-- 제목 입력란 -->
        <div class="mb-5">
          <label for="title" class="mb-3 block text-base font-medium text-[#07074D]">
            제목
          </label>
          <input type="text" placeholder="제목 입력" v-model="plan.planTitle" required
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>

        <!-- 시작일과 종료일 입력란을 한 행에 배치 -->
        <div class="flex space-x-4 mb-2">
          <!-- 시작일 입력란 -->
          <div class="flex-1">
            <label for="startDate" class="mb-3 block text-base font-medium text-[#07074D]">
              시작일
            </label>
            <input type="date" v-model="plan.startDate" required
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>

          <!-- 종료일 입력란 -->
          <div class="flex-1">
            <label for="endDate" class="mb-3 block text-base font-medium text-[#07074D]">
              종료일
            </label>
            <input type="date" v-model="plan.endDate" required
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
          </div>
        </div>

        <!-- 유효성 검사 메시지 -->
        <div v-if="dateError" class="mb-5 text-red-500 text-sm">
          종료일은 시작일보다 빠를 수 없습니다.
        </div>
        <!-- 유효성 검사 메시지 공간 확보용 div -->
        <div v-else class="mb-3">
          &nbsp; <!-- 공백 문자로 높이 확보 -->
        </div>

        <!-- 예산 입력란 -->
        <div class="mb-5">
          <label for="budget" class="mb-3 block text-base font-medium text-[#07074D]">
            예산
          </label>
          <input type="number" v-model="plan.budget" placeholder="예산 입력" min="0" required
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
        </div>

        <!-- 버튼들 -->
        <div class="flex justify-center space-x-4">
          <button type="submit"
            class="hover:shadow-form rounded-md bg-green-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            v-if="type === 'create'">
            생성
          </button>
          <button type="submit"
            class="hover:shadow-form rounded-md bg-green-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            v-else>
            수정
          </button>
          <button type="button"
            class="hover:shadow-form rounded-md bg-gray-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            @click="moveList">
            목록
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>