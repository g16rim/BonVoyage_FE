<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Youtube from '@/components/ai/Youtube.vue';
import { getPlan, getPlanGroupInfo } from '@/api/plan.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const { planId } = route.params;
const { VITE_GOOGLE_SERVICE_KEY } = import.meta.env;
const searchText = ref('');
const songs = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  await getSearchText();
  await fetchSongs();
});

const getSearchText = () => {
  return new Promise((resolve, reject) => {
    getPlan(
      planId,
      ({ data }) => {
        const { budget, endDate, planTitle, startDate } = data;
        searchText.value += `예산: ${budget}, 종료일: ${endDate}, 여행 제목: ${planTitle}, 시작일: ${startDate}, `;
        resolve();
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  }).then(() => {
    return new Promise((resolve, reject) => {
      getPlanGroupInfo(
        planId,
        ({ data }) => {
          const { count, description, groupName, preference } = data;
          searchText.value += `${count}인 여행, 팀명: ${groupName}, 컨셉: ${description}, ${preference}`;
          searchText.value += ' 이런 여행을 위한 추천 노래 10곡 공식 음원으로만 알려줘';
          resolve();
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  });
};

const fetchSongs = async () => {
  loading.value = true;
  error.value = null;
  songs.value = [];

  let serviceKey = VITE_GOOGLE_SERVICE_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${serviceKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: searchText.value }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('API 응답:', response.data);
    const text = response.data.candidates[0].content.parts[0].text;
    const songList = text.split('\n').filter(line => line.trim() !== '').map(line => line.replace(/\*\*|\*/g, '').trim());
    songs.value = songList;
  } catch (err) {
    console.error('API 요청 중 오류가 발생했습니다:', err);
    error.value = 'API 요청 중 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div id="recommend">
    <h1>추천 플레이리스트<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
      </svg>
    </h1>
    <div v-if="loading">검색 중...
      <img src="/src/assets/loading-bubble.gif" alt="">
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="songs.length > 0">
      <Youtube :songs="songs" />
    </div>
  </div>
</template>

<style scoped></style>
