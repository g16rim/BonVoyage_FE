<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
import Step4 from './Step4.vue';
import Step5 from './Step5.vue';

const { VITE_BASE_URL } = import.meta.env;
const isModalOpen = ref(false);
const currentPage = ref(0);
const selectedFile = ref(null);

const groupName = ref('');
const groupDescription = ref('');
const groupConcept = ref('');

const pages = [
  { title: 'Step1. 그룹 이름 정하기', component: Step1 },
  { title: 'Step2. 그룹 설명 작성', component: Step2 },
  { title: 'Step3. 그룹 컨셉 정하기', component: Step3 },
  { title: 'Step4. 그룹 대표 이미지 정하기', component: Step4 },
  { title: 'Step5. 그룹 멤버 초대하기', component: Step5 }
];

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const nextPage = () => {
  if (currentPage.value < pages.length - 1) {
    if (currentPage.value === 0 && groupName.value === '') {
      alert('그룹 이름을 입력하세요.');
      return;
    }
    if (currentPage.value === 3 && selectedFile.value === null) {
      alert('그룹 대표 이미지를 선택하세요.');
      return;
    }
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

const handleFileChange = (file) => {
  selectedFile.value = file;
  console.log('Selected file:', selectedFile.value);
};

const submitGroup = async () => {
  const requestData = {
    name: groupName.value,
    description: groupDescription.value
  };
  console.log("그룹 이름",groupName.value)
  try {
    const response = await axios.post(VITE_BASE_URL + '/teams', requestData);
    if (response.status === 201) {
      alert('그룹이 성공적으로 생성되었습니다.');
      toggleModal();
    }
  } catch (error) {
    console.error('그룹 생성 중 오류 발생:', error);
    alert('그룹 생성에 실패했습니다.');
  }
};
</script>

<template>
  <h1>새 그룹 생성하기</h1>
  <div class="container">
    <div class="svg-wrapper" @click="toggleModal">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
        <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsa_44037_gr1" x1="32" x2="32" y1="5.75" y2="59.005" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient>
        <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsa_44037_gr1)" d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"></path>
        <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsb_44037_gr2" x1="32" x2="32" y1="5.75" y2="59.005" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient>
        <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsb_44037_gr2)" d="M32,52c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S43.028,52,32,52z M32,14 c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S41.925,14,32,14z"></path>
        <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsc_44037_gr3" x1="32" x2="32" y1="21.75" y2="42.538" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient>
        <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsc_44037_gr3)" d="M41,30h-7v-7c0-0.552-0.448-1-1-1h-2c-0.552,0-1,0.448-1,1v7h-7c-0.552,0-1,0.448-1,1v2 c0,0.552,0.448,1,1,1h7v7c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-7h7c0.552,0,1-0.448,1-1v-2C42,30.448,41.552,30,41,30z"></path>
      </svg>
    </div>
  </div>

  <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal">
    <div class="modal-content" @click.stop>
      <h2>{{ pages[currentPage].title }}</h2>
      <component :is="pages[currentPage].component"
        v-bind:groupName="groupName"
        v-bind:groupDescription="groupDescription"
        v-bind:groupConcept="groupConcept"
        @update:groupName="groupName = $event"
        @update:groupDescription="groupDescription = $event"
        @update:groupConcept="groupConcept = $event"
        @update:file="handleFileChange"
      />
      <div class="modal-navigation">
        <button v-if="currentPage > 0" class="prev-button" @click="prevPage">이전</button>
        <button v-if="currentPage < pages.length - 1" class="next-button" @click="nextPage">다음</button>
        <button v-if="currentPage === pages.length - 1" class="confirm-button" @click="submitGroup">완료</button>
      </div>
      <p class="page-info">{{ currentPage + 1 }} / {{ pages.length }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
  border: 1px solid black;
  margin-bottom: 7%;
}

.svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  height: 60vh;
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 60%;
  max-height: 90%;
  overflow: auto;
}

.modal-content input,
.modal-content textarea {
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.modal-navigation {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.prev-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.next-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.confirm-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.page-info {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
