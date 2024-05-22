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

    </div>
  </div>
</template>

<style scoped></style>