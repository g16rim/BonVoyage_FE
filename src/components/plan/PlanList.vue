<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listPlan } from '@/api/plan.js'

import PlanListItem from '@/components/plan/item/PlanListItem.vue'

const router = useRouter()

const plans = ref([])

onMounted(() => {
  console.log("hi")
  getPlanList()
})

const getPlanList = () => {
  console.log("hi2")
  listPlan(
    ({ data }) => {
      plans.value = data
      console.log(plans.value)
    },
    (error) => {
      console.log(error)
    }
  )
}

const moveCreate = () => {
  router.push({ name: "plan-create" })
}

</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">계획 목록</mark>
        </h2>
      </div>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="moveCreate">
              계획 생성
            </button>
          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">그룹</th>
              <th scope="col">제목</th>
              <th scope="col">시작일</th>
              <th scope="col">종료일</th>
              <th scope="col">예산</th>
            </tr>
          </thead>
          <tbody>
            <PlanListItem v-for="plan in plans" :key="plan.planId" :plan="plan"></PlanListItem>
          </tbody>
        </table>
      </div>
      <!-- <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation> -->
    </div>
  </div>
</template>

<style scoped></style>