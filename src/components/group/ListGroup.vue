<template>
  <div id="groupList">
    <h1>내 그룹 목록</h1>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="team in teams" :key="team.id" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="team.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ team.name }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ team.description }}</p>
            <button @click="openModal(team.id)"
              class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              멤버 추가
            </button>
            <button type="button" @click="moveCreate"
              class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              여행 계획 추가
            </button>
            <button @click="openInfoModal(team)"
              class="px-8 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              그룹 정보
            </button>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">{{ team.preference }}</p>
          <p v-if="team.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time :datetime="team.lastSeenDateTime">{{ team.lastSeen }}</time>
          </p>
          <div v-else class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p class="text-xs leading-5 text-gray-500">Online</p>
          </div>
        </div>
      </li>
    </ul>

    <!-- 모달 창 -->
    <div v-if="modalOpen" class="modal-overlay fixed inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50" @click="closeModal">
      <div class="modal-content flex justify-center items-center min-h-screen w-full" @click.stop>
        <div class="bg-white w-1/2 p-8 rounded-lg shadow-lg">
          <h2 class="text-lg font-bold mb-4">새 멤버 추가</h2>
          <div class="mb-4">
            <label for="newMemberEmail" class="block text-sm font-medium text-gray-700">이메일</label>
            <input type="email" v-model="newMemberEmail" id="newMemberEmail" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div class="flex justify-end">
            <button @click="closeModal" type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              닫기
            </button>
            <button @click="addMember" type="button" class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              추가
            </button>
          </div>
          <!-- 성공 및 오류 메시지 -->
          <p v-if="successMessage" class="mt-4 text-sm text-green-500">{{ successMessage }}</p>
          <p v-if="errorMessage" class="mt-4 text-sm text-red-500">{{ errorMessage }}</p>
        </div>
      </div>
    </div>

    <div v-if="infoModalOpen" class="modal-overlay fixed inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50" @click="closeInfoModal">
      <div class="modal-content flex justify-center items-center min-h-screen w-full" @click.stop>
        <div class="bg-white w-1/2 p-8 rounded-lg shadow-lg">
          {{ selectedTeam?.groupProfileImage }}
          <h2 class="text-lg font-bold mb-4">{{ selectedTeam?.name }}</h2>
          <div class="mb-4">
            <p><strong>설명:</strong> {{ selectedTeam?.description }}</p>
            <p><strong>컨셉:</strong> {{ selectedTeam?.preference }}</p>
            <p><strong>방장:</strong> {{ selectedTeam?.owner }}</p>
            <p><strong>멤버:</strong> {{ selectedTeam?.owner }}</p>
          </div>
          <div class="flex justify-end">
            <button @click="closeInfoModal" type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

// Function to get accessToken from sessionStorage
const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

const teams = ref([]);

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

const addMember = async () => {
  const accessToken = getAccessToken();
  if (accessToken && newMemberEmail.value) {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/teams/${currentTeamId.value}/join`,
        { email: newMemberEmail.value },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      successMessage.value = '그룹원 추가에 성공했습니다.';
      errorMessage.value = '';
      fetchMembers(); // Refresh the list of members
      teams.value = [...teams.value];
      closeModal(); // Close the modal after successful addition
    } catch (error) {
      successMessage.value = '';
      errorMessage.value = '해당 이메일은 존재하지 않습니다.';
      console.error('Error adding member:', error);
    }
  } else {
    errorMessage.value = '이메일을 입력하세요.';
  }
};

onMounted(() => {
  fetchMembers();

  // ESC 키로 모달 닫기
  window.addEventListener('keydown', handleEscapeKey);
});

// 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscapeKey);
});

const newMemberEmail = ref('');
const modalOpen = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const currentTeamId = ref(null);
const infoModalOpen = ref(false);
const selectedTeam = ref(null);

const openModal = (teamId) => {
  currentTeamId.value = teamId;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  successMessage.value = '';
  errorMessage.value = '';
};

const openInfoModal = (team) => {
  selectedTeam.value = team;
  infoModalOpen.value = true;
};

const closeInfoModal = () => {
  infoModalOpen.value = false;
};

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeModal();
    closeInfoModal();
  }
};
</script>



<style scoped>
/* 디자인 관련 스타일 */
</style>
