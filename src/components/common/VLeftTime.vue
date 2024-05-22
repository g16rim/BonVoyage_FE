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
  // console.log(props.dday)
  const ddayDate = new Date(props.dday)
  const today = new Date()

  // 날짜의 시간을 0으로 설정하여 날짜만 비교
  ddayDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const gap = today - ddayDate; // 날짜 차이 계산
  const days = Math.floor(gap / (1000 * 60 * 60 * 24));

  displayText.value = (gap === 0 ? 'D-Day' : gap > 0 ? `D+${days}` : `D${days}`)

  // if (ddayDate.getFullYear === today.getFullYear && ddayDate.getMonth === today.getMonth && ddayDate.getDay === today.getDay) {
  //   displayText.value = "D-Day";
  // } else if (gap < 0) {  // 이미 지난 경우
  //   displayText.value = `D+${Math.abs(days) - 1}`;
  // } else {  // 아직 남아 있는 경우
  //   displayText.value = `D-${Math.abs(days) + 1} ${hours >= 10 ? hours : "0" + hours}:${minutes >= 10 ? minutes : "0" + minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
  // }
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
