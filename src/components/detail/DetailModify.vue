<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deletePlan, modifyOrder } from '@/api/plan.js'
import { listDetailPlan } from '@/api/site.js'
import DetailView from '@/components/detail/DetailView.vue'
import draggable from 'vuedraggable'

const route = useRoute()
const router = useRouter()

const { planId } = route.params
const plans = ref([])

onMounted(() => {
    getDetailPlans()
})

function moveList() {
    router.push({ name: "plan-list" })
}

const onModifyPlan = () => {
    const newPlans = plans.value.map((plan, index) => ({
        planOrder: index + 1,
        siteId: plan.siteId,
        planId: plan.id,
        day: plan.day
    }))
    modifyOrder(
        planId,
        newPlans,
        ({ data }) => {
            console.log(data)
            router.push({ name: 'plan-view', params: planId })
        },
        (error) => {
            console.error(error)
        }
    )
    console.log(newPlans)
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
            console.log(plans.value)
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
                    <div class="relative h-64 w-full flex-none sm:h-80 lg:h-auto lg:w-2/3 xl:w-3/5">
                        <!-- 지도 -->
                        <DetailView />
                    </div>
                    <div class="w-full">
                        <div class="p-8">
                            <!-- tabs -->
                            <div class="relative">
                                <header class="flex items-end text-sm">
                                    <button
                                        class="rounded-tr-md border border-b-0 px-3 py-1 focus:outline-none luckiest-guy-regular"
                                        :class="activeTab === 1 ? 'active-tab' : ''" @click="activeTab = 1">map</button>
                                </header>
                                <div class="h-80 w-full overflow-y-auto rounded-b-xl rounded-tr-xl border p-2"
                                    id="tabs-contents">
                                    <div v-if="activeTab === 1">
                                        <draggable v-model="plans" class="list-group" :key="plans.address"
                                            item-key="id">
                                            <template #item="{ element: plan, index }">
                                                <li class="list-group-item p-2 flex items-center">
                                                    <div class="ml-4">
                                                        <div class="font-bold text-lg">{{ index + 1 }} {{ plan.title }}
                                                        </div>
                                                        <div class="text-sm text-gray-500">{{ plan.address }}</div>
                                                    </div>
                                                </li>
                                            </template>
                                        </draggable>
                                    </div>
                                </div>

                            </div>
                            <!-- action buttons -->
                            <div class="mt-8 flex items-center justify-end gap-4 text-sm font-bold">
                                <button @click="moveList"
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">목록</button>
                                <button @click="onModifyPlan"
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

<style scoped></style>