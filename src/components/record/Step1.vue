<template>
  <div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="team in teams" :key="team.id" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="team.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ team.name }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ team.description }}</p>
            <button @click="selectGroup(team.id)"
              class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              그룹 선택
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <span v-if="selectedGroupId === team.id" class="text-green-800 font-bold">✔</span>
        </div>
      </li>
    </ul>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  teams: Array
});

const teams = ref([]);

const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

const fetchMembers = async () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axios.get('http://localhost:8080/api/teams/members', {
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
const selectedGroupId = ref(null);

const updateGroupName = () => {
  if (!selectedGroupId.value) {
    errorMessage.value = '그룹 선택은 필수입니다';
    emits('validation', false);
  } else {
    errorMessage.value = '';
    emits('update:travelGroupId', selectedGroupId.value);
    emits('validation', true);
  }
};

onMounted(() => {
  fetchMembers();
});

const emits = defineEmits(['update:travelGroupId']);

const selectGroup = (id) => {
  selectedGroupId.value = id;
  emits('update:travelGroupId', id);
};
</script>

<style>
.error {
  color: red;
}
</style>
