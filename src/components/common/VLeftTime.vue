<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  dday: {
    type: String,
    required: true
  }
})

const displayText = ref('D-');

const updateDisplayText = () => {
  const ddayDate = new Date(props.dday);
  const today = new Date();

  const gap = ddayDate.getTime() - today.getTime(); // 날짜 차이 계산

  const days = String(Math.floor(gap / (1000 * 60 * 60 * 24)));
  const hours = String(Math.floor((gap / (1000 * 60 * 60)) % 24));
  const minutes = String(Math.floor((gap / (1000 * 60)) % 60));
  const seconds = String(Math.floor((gap / 1000) % 60));

  if (isNaN(ddayDate.getTime())) {
    console.error('dday must be a valid date string.');
    return;
  }

  if (ddayDate.getFullYear === today.getFullYear && ddayDate.getMonth === today.getMonth && ddayDate.getDay === today.getDay) {
    displayText.value = "D-Day";
  } else if (gap < 0) {  // 이미 지난 경우
    displayText.value = `D+${Math.abs(days) - 1}`;
  } else {  // 아직 남아 있는 경우
    displayText.value = `D-${Math.abs(days) + 1} ${hours >= 10 ? hours : "0" + hours}:${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
  }
}

onMounted(() => {
  updateDisplayText();
  setInterval(() => {
    updateDisplayText();
  }, 1000);
})
</script>

<template>
  <div class="timer">
    <span>{{ displayText }}</span>
  </div>
</template>
