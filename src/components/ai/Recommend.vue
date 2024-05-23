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
    <h1>추천 플레이리스트
    </h1>

    <div v-if="loading" class="mx-auto mt-5 luckiest-guy-regular">Loading...
      <img src="/src/assets/loading.gif" class="mx-auto">
    </div>
    <div class="mt-5" v-if="error">{{ error }}</div>
    <div v-if="songs.length > 0">
      <Youtube :songs="songs" />
    </div>
  </div>
</template>

<style scoped></style>
