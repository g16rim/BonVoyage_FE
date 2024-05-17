<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, deletePlan } from '@/api/plan.js'

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
        },
        (error) => {
            console.log(error)
        }
    )
}

function moveList() {
    // TODO
    console.log("plan list 구현해라")
}

function moveModify() {
    router.push({ name: "plan-modify", params: { planId }})
}

function onDeletePlan() {
    deletePlan(
        planId,
        (response) => {
            if (response.status === 200) moveList()
        },
        (error) => {
            console.log(error)
        }
    )
}

</script>

<template>
    detail
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>{{ plan.planTitle }}</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <img
                    src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                    alt="User"
                    width="50"
                    height="50"
                    class="me-2"
                  />
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
                <button type="button" class="btn btn-outline-primary mb-3" @click="">
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

<style scoped>

</style>