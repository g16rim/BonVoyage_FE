<script setup>
import { ref, onMounted } from 'vue'
const { VITE_GOOGLE_SERVICE_KEY } = import.meta.env
const videos = ref([])

const props = defineProps({
  songs: Array
})

const searchSong = async (song) => {
  let serviceKey = VITE_GOOGLE_SERVICE_KEY

  let baseUrl = "https://youtube.googleapis.com/youtube/v3/search"
  let queryString = `part=snippet&maxResults=1&q=${encodeURIComponent(song)}&type=video&key=${serviceKey}`

  let url = baseUrl + "?" + queryString

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.items[0] // 검색 결과의 첫 번째 항목
  } catch (error) {
    console.error('검색 중 오류 발생:', error)
    return null // 오류 발생 시 null 반환
  }
}

onMounted(async () => {
  videos.value = [] // 검색 전 비디오 목록 초기화
  for (const song of props.songs) {
    const video = await searchSong(song)
    if (video) {
      videos.value.push(video)
    }
  }
})
</script>

<template>
  <div class="container">
    <div id="videoView">
      <div v-for="(video, index) in videos" :key="index" class="row mb-3">
        <div class="col-auto justify-content-center p-3">
          <iframe :src="`https://www.youtube.com/embed/${video.id.videoId}`" width="550" height="350" frameborder="0"
            allowfullscreen></iframe>
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

<style scoped>
#videoView iframe {
  border: none;
}
</style>