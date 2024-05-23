<template>
  <div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="team in teams" :key="team.id" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4 relative">
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ team.planTitle }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ team.startDate }} ~ {{ team.endDate }}</p>
            <button @click="selectPlan(team.planId)"
              class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              여행 기록 선택
            </button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <span v-if="selectedPlanId === team.id" class="text-green-800 font-bold">✔</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  teams: Array
});

const teams = ref([]);
const selectedPlanId = ref(null);

const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

const fetchMembers = async () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axios.get('http://localhost:8080/api/plan/list', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      teams.value = response.data;
    } catch (error) {
      console.error('Error fetching members:', error);
    } 
  } else {
    console.error('No accessToken found in sessionStorage');
  }
};

const errorMessage = ref('');
const localPlanName = ref(props.groupName);

onMounted(() => {
  fetchMembers();
});

const emits = defineEmits(['update:travelPlanId']);

const selectPlan = (id) => {

  selectedPlanId.value = id;
  emits('update:travelPlanId', id);

};
</script>

<style>
.error {
  color: red;
}
</style>
