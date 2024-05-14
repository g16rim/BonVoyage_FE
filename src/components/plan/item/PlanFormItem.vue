<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Datepicker from 'vue3-datepicker' // Vue3 date picker 라이브러리 사용
import { getPlan, createPlan, updatePlan } from "@/api/plan.js"

const router = useRouter()
const route = useRoute()

const props = defineProps({
    type: String // 'create' or 'update'
})

const plan = ref({
  startDate: null,
  endDate: null,
  budget: 0,
  planTitle: ''
});

const customFormatter = date => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

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

function onSubmit() {
    props.type === "create" ? registPlan() : modifyPlan()
}

function registPlan() {
    createPlan(
        1, // groupId
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
    // router.push({ name: "plan-list" })
}

</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="plan-title" class="form-label">계획 제목 : </label>
      <input type="text" class="form-control" v-model="plan.planTitle" placeholder="계획 제목..." />
    </div>
    <div class="mb-3">
      <label for="startDate" class="form-label">시작 날짜 : </label>
      <Datepicker v-model="plan.startDate" :inline="true" :format="customFormatter" />
    </div>
    <div class="mb-3">
      <label for="endDate" class="form-label">종료 날짜 : </label>
      <Datepicker v-model="plan.endDate" :inline="true" :format="customFormatter" />
    </div>
    <div class="mb-3">
      <label for="budget" class="form-label">예산 : </label>
      <input type="number" class="form-control" v-model="plan.budget" placeholder="예산..." />
    </div>
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'create'">
        계획 작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>계획 수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로 이동...
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>