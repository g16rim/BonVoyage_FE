<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlan, deletePlan } from '@/api/plan.js'
import { listDetailPlan } from '@/api/site.js'
import VLeftTime from '@/components/common/VLeftTime.vue'
import DetailView from '@/components/detail/DetailView.vue'
import DetailListItem from "@/components/detail/item/DetailListItem.vue"
import VTag from '@/components/common/VTag.vue'

const route = useRoute()
const router = useRouter()

const { planId } = route.params

const plan = ref({})
const plans = ref([])

onMounted(() => {
  showPlan()
  getDetailPlans()
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

// 목록 가져오기
const getDetailPlans = async () => {
  await listDetailPlan(
    planId,
    ({ data }) => {
      plans.value = data
    },
    (error) => {
      console.error(error)
    }
  )
}

const activeTab = ref(1)
</script>

<template>
  <div class="container">
    <!-- VLeftTime 컴포넌트를 크고 초록색으로 표시하고 크기를 조정 -->
    <div class="flex items-center justify-center w-full">
      <div class="w-full max-w-full overflow-hidden rounded-2xl p-0 shadow-lg md:mx-auto">
        <div class="flex flex-col lg:flex-row">
          <div class="relative h-64 w-full flex-none sm:h-80 lg:h-auto lg:w-1/3 xl:w-2/5">
            <!-- 지도 -->
            <DetailView />
          </div>
          <div class="w-full">
            <div class="p-8">
              <span
                class="absolute inset-x-0 bottom-0 block h-16 w-full bg-gradient-to-t from-white to-transparent lg:inset-y-0 lg:right-auto lg:hidden lg:h-full lg:w-16 lg:bg-gradient-to-r"></span>
              <!-- d-day -->
              <div class="relative m-4 flex flex-wrap justify-end text-xl font-bold text-white lg:justify-start">
                <div class="rounded bg-green-500 px-4 py-1">
                  <VLeftTime :dday="plan.startDate" />
                </div>
              </div>
              <!-- title -->
              <div class="flex items-start justify-between">
                <h3 class="mb-8 text-xl font-bold" onClick="test"><!-- 몇 박 며칠 계산 및 표시 -->
                  {{ ((new Date(plan.endDate) - new Date(plan.startDate)) / (1000 * 60 * 60 * 24)) }}박 {{ ((new
                    Date(plan.endDate) - new Date(plan.startDate)) / (1000 * 60 * 60 * 24)) + 1 }}일
                </h3>
              </div>
              <!-- tabs -->
              <div class="relative">
                <header class="flex items-end text-sm">
                  <button
                    class="rounded-tl-md border border-b-0 px-3 py-1 text-sm focus:outline-none luckiest-guy-regular"
                    :class="activeTab === 1 ? 'active-tab' : ''" @click="activeTab = 1">plan</button>
                  <button class="rounded-tr-md border border-b-0 px-3 py-1 focus:outline-none luckiest-guy-regular"
                    :class="activeTab === 2 ? 'active-tab' : ''" @click="activeTab = 2">map</button>
                </header>
                <div class="h-80 w-full overflow-y-auto rounded-b-xl rounded-tr-xl border p-2" id="tabs-contents">
                  <div v-if="activeTab === 1" class="text-left pl-4">
                    <p class="block mt-5 text-3xl leading-tight font-medium text-black">
                      <!-- 몇 박 며칠 계산 및 표시 -->
                      {{ plan.planTitle }}
                    </p>

                    <p class="mt-4">
                      <!-- 시작일 - 종료일 표시 -->
                      {{ plan.startDate }} ~ {{ plan.endDate }}
                    </p>
                    <p class="mt-4">{{ plan.budget ? plan.budget.toLocaleString() : '알 수 없음' }}원</p>
                    <VTag class="mt-12" />
                  </div>
                  <div v-if="activeTab === 2">
                    <DetailListItem :plans="plans" />
                  </div>
                </div>
              </div>
              <!-- action buttons -->
              <div class="mt-8 flex items-center justify-end gap-4 text-sm font-bold">
                <button @click="moveList"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">목록</button>
                <button @click="moveModify"
                  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">수정</button>
                <button @click="onDeletePlan"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  font-weight: bold;
}
</style>