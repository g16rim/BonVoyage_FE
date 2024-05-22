<script setup>
// groupName, preference, description, 인원 수, 팀장
import { getPlanGroupInfo } from '@/api/plan.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { planId } = route.params

const info = ref({
    groupName: '',
    preference: '',
    description: '',
    count: 0,
    leader: '',
})

onMounted(() => {
    getPlanGroupInfo(
        planId,
        ({ data }) => {
            info.value = data
            console.log("vtag" + info.value)
        },
        (error) => {
            console.log(error)
        }
    )
})
</script>

<template>
    <div class="flex flew-wrap justify-start items-end">
        <!-- sm -- red -->
        <div>
            <div class="inline-block relative py-1 text-sm mr-1">
                <div class="absolute inset-0 text-red-200 flex">
                    <svg height="100%" viewBox="0 0 50 100">
                        <path
                            d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                            fill="currentColor" />
                    </svg>
                    <div class="flex-grow h-full -ml-px bg-red-200 rounded-md rounded-l-none"></div>
                </div>
                <span class="relative text-red-500 uppercase font-semibold pr-px">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ info.groupName }}<span>&nbsp;</span>
                </span>
            </div>
        </div>
        <!-- sm -- yellow -->
        <div>
            <div class="inline-block relative py-1 text-sm mr-1">
                <div class="absolute inset-0 text-yellow-200 flex">
                    <svg height="100%" viewBox="0 0 50 100">
                        <path
                            d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                            fill="currentColor" />
                    </svg>
                    <div class="flex-grow h-full -ml-px bg-yellow-200 rounded-md rounded-l-none"></div>
                </div>
                <span class="relative text-yellow-500 uppercase font-semibold pr-px">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ info.preference }}<span>&nbsp;</span>
                </span>
            </div>
        </div>
        <!-- sm -- green -->
        <div>
            <div class="inline-block relative py-1 text-sm mr-1">
                <div class="absolute inset-0 text-green-200 flex">
                    <svg height="100%" viewBox="0 0 50 100">
                        <path
                            d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                            fill="currentColor" />
                    </svg>
                    <div class="flex-grow h-full -ml-px bg-green-200 rounded-md rounded-l-none"></div>
                </div>
                <span class="relative text-green-500 uppercase font-semibold pr-px">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ info.description }}<span>&nbsp;</span>
                </span>
            </div>
        </div>
        <!-- sm -- blue -->
        <div>
            <div class="inline-block relative py-1 text-sm mr-1">
                <div class="absolute inset-0 text-blue-200 flex">
                    <svg height="100%" viewBox="0 0 50 100">
                        <path
                            d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                            fill="currentColor" />
                    </svg>
                    <div class="flex-grow h-full -ml-px bg-blue-200 rounded-md rounded-l-none"></div>
                </div>
                <span class="relative text-blue-500 uppercase font-semibold pr-px">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ info.count }}인여행<span>&nbsp;</span>
                </span>
            </div>
        </div>
        <!-- sm -- indigo -->
        <div>
            <div class="inline-block relative py-1 text-sm">
                <div class="absolute inset-0 text-indigo-200 flex">
                    <svg height="100%" viewBox="0 0 50 100">
                        <path
                            d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                            fill="currentColor" />
                    </svg>
                    <div class="flex-grow h-full -ml-px bg-indigo-200 rounded-md rounded-l-none"></div>
                </div>
                <span class="relative text-indigo-500 uppercase font-semibold pr-px">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ info.leader }}<span>&nbsp;</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>