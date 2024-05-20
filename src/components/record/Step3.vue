<template>
  <div>
    <hr/>
    <div class="preferences">
      <button v-for="option in preferences" :key="option" :class="{ selected: option === localGroupConcept }" @click="selectGroupConcept(option)">
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  groupConcept: String
});
const emits = defineEmits(['update:groupConcept']);

const preferences = [
  '자연', '도시', '문화체험', '휴양', '음식탐방', '하이킹', '자전거타기', 
  '쇼핑', '캠핑', '럭셔리', '가성비', '커플여행', '혼자여행', '친구와여행', '가족여행'
];

const localGroupConcept = ref(props.groupConcept);

watch(() => props.groupConcept, (newVal) => {
  localGroupConcept.value = newVal;
});

const selectGroupConcept = (option) => {
  localGroupConcept.value = option;
  emits('update:groupConcept', localGroupConcept.value);
};
</script>

<style scoped>
.preferences {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

button {
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
}

button.selected {
  background-color: lightblue;
  border-color: blue;
}
</style>
