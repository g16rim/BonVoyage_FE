<template>
  <div id="groupList">
    <h1>내 그룹 목록</h1>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>
            <button @click="openModal(person)"
              class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              멤버 추가
            </button>
            <button type="button" @click="moveCreate"
              class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              여행 계획 추가
            </button>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
          <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
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
    <div v-if="modalOpen" class="modal-overlay fixed inset-0 overflow-y-auto flex justify-center items-center" @click="closeModal">
      <div class="modal-content flex justify-center items-center min-h-screen w-full" @click.stop>
        <div class="bg-white w-1/2 p-8 rounded-lg shadow-lg">
          <h2 class="text-lg font-bold mb-4">새 멤버 추가</h2>
          <div class="mb-4">
            <label for="newMemberEmail" class="block text-sm font-medium text-gray-700">이메일</label>
            <input type="email" v-model="newMemberEmail" id="newMemberEmail" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <div class="flex justify-end">
            <button @click="closeModal" type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              취소
            </button>
            <button @click="addMember" type="button" class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modalOpen" class="fixed inset-0 bg-black opacity-25"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  // 나머지 people 데이터 생략
];


let newMemberEmail = '';

const modalOpen = ref(false);

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

// ESC 키로 모달 닫기
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  // ESC 키 이벤트 리스너 추가
  window.addEventListener('keydown', handleEscapeKey);
});

// 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscapeKey);
});

</script>

<style scoped>
/* 디자인 관련 스타일 */
</style>
