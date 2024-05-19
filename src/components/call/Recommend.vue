<template>
  <div id="recommend">
    <h1>노래 추천 검색</h1>
    <input type="text" v-model="searchText" placeholder="검색어를 입력하세요" />
    <button @click="fetchSongs">검색</button>
    <div v-if="loading">검색 중...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="songs.length > 0">
      <li v-for="(song, index) in songs" :key="index">{{ song }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const { VITE_GOOGLE_SERVICE_KEY } = import.meta.env
const searchText = ref('');
const songs = ref([]);
const loading = ref(false);
const error = ref(null);

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

<style>
#recommend {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  /* margin-top: 60px; */
}

input {
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  margin-left: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
</style>