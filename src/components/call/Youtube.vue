<template>
  <div class="container">
    
    <div class="row justify-content-md-center">
      <div class="col-auto">
        <label for="query" class="visually-hidden">검색어</label>
        <input type="text" class="form-control" v-model="query" placeholder="검색 할 단어..." />
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-primary mb-3" @click="search">검색</button>
      </div>
    </div>
    <div id="videoView">
      <div v-for="(video, index) in videos" :key="index" class="row mb-3">
        <div class="col-auto justify-content-center p-3">
          <iframe :src="`https://www.youtube.com/embed/${video.id.videoId}`" width="550" height="350" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="col-lg-6 pt-5 ps-3">
          <h2 class="mb-3">{{ video.snippet.title }}</h2>
          <p class="text-break fs-5 p-3">{{ video.snippet.description }}</p>
          <div class="text-end"><small class="text-body-secondary">{{ video.snippet.publishTime }}</small></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { VITE_GOOGLE_SERVICE_KEY } = import.meta.env
const query = ref('');
const videos = ref([]);

const search = async () => {
  let serviceKey = VITE_GOOGLE_SERVICE_KEY;

  let baseUrl = "https://youtube.googleapis.com/youtube/v3/search";
  let queryString = `part=snippet&maxResults=1&q=${query.value}&type=video&key=${serviceKey}`;
  
  let url = baseUrl + "?" + queryString;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    videos.value = data.items;
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
  }
};
</script>

<style>
#videoView iframe {
  border: none;
}
</style>