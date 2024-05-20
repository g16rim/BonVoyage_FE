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
    <div class="row justify-content-center mt-5">
      <div class="col-lg-10">
        <!-- <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <button type="button" @click="moveCreate"
              class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              New
            </button>
          </div>
        </div> -->
        <table class="table table-hover mt-4">
          <thead>
            <tr class="text-center">
              <th scope="col">그룹</th>
              <th scope="col">제목</th>
              <th scope="col">시작일</th>
              <th scope="col">종료일</th>
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
      <div class="mt-8">
        <div class="flex">
          <a href="#" class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 font-medium rounded-md cursor-not-allowed">
            Previous
          </a>

          <a href="#"
            class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 font-medium hover:bg-blue-500 hover:text-gray-200 rounded-md">
            1
          </a>

          <a href="#"
            class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 font-medium hover:bg-blue-500 hover:text-gray-200 rounded-md">
            2
          </a>

          <a href="#"
            class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 font-medium hover:bg-blue-500 hover:text-gray-200 rounded-md">
            3
          </a>

          <a href="#"
            class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 font-medium hover:bg-blue-500 hover:text-gray-200 rounded-md">
            Next
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>