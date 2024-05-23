<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const { planId } = route.params

const submit = () => {
    router.push({ name: 'plan-view', params: planId })
}
</script>

<template>
    <div class="container text-center mt-5 mb-2">
        <nav aria-label="Breadcrumb">
            <div
                class="mx-auto flex justify-between max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-900">Music</span>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor"
                        class="ml-2 h-5 w-4 text-gray-300" style="transform: scale(-1, 1); transform-origin: center;">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                </div>

                <!-- Vue Router를 사용한 뒤로가기 버튼 -->
                <button @click="submit" class="inline-flex items-center px-3 py-1 rounded bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    Back
                </button>
            </div>
        </nav>
        <router-view></router-view>
    </div>

</template>

<style scoped>
router-link {
    color: black;
    /* 글씨 색상을 검정색으로 변경 */
    text-decoration: none;
    /* 밑줄 제거 */
}
</style>