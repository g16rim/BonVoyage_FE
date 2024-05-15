<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listPlan } from '@/api/plan.js'

import PlanListItem from '@/components/plan/item/PlanListItem.vue'

const router = useRouter()

const plans = ref([])

onMounted(() => {
    getPlanList()
})

const getPlanList = () => {
    listPlan(
        ({ data }) => {
            plans.value = data
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
          <!-- <div class="col-md-5 offset-5">
            <form class="d-flex">
              <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model="param.word"
                  placeholder="검색어..."
                />
                <button class="btn btn-dark" type="button" @click="getArticleList">검색</button>
              </div>
            </form>
          </div> -->
        </div>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">계획 번호</th>
              <th scope="col">제목</th>
              <th scope="col">시작일</th>
              <th scope="col">종료일</th>
              <th scope="col">예산</th>
            </tr>
          </thead>
          <tbody>
            <PlanListItem
              v-for="plan in plans"
              :key="plan.planId"
              :plan="plan"
            ></PlanListItem>
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

<style scoped>

</style>