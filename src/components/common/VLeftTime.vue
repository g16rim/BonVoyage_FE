<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  dday: {
    type: String,
    required: true
  }
})

const displayText = ref("");

const updateDisplayText = () => {
  const ddayDate = new Date(props.dday);
  const today = new Date();

  // 시간, 분, 초를 무시하고 날짜만 비교
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const ddayDateOnly = new Date(ddayDate.getFullYear(), ddayDate.getMonth(), ddayDate.getDate());

  const gap = ddayDateOnly - todayDateOnly;
  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((gap / (1000 * 60)) % 60);
  const seconds = Math.floor((gap / 1000) % 60);

  if (isNaN(ddayDate.getTime())) {
    console.error('dday must be a valid date string.');
    return;
  }

  if (days === 0) {
    displayText.value = "D-Day";
  } else if (gap < 0) {  // 이미 지난 경우
    displayText.value = `D+${Math.abs(days)}`;
  } else {  // 아직 남아 있는 경우
    displayText.value = `D-${days} days ${hours >= 10 ? hours : "0" + hours}:${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
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
