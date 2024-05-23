<template>
  <div>
    <hr/>
    <textarea v-model="localGroupDescription" @input="updateGroupDescription" placeholder="여행 소감을 입력해보세요!"></textarea>
  </div>
</template>

<script setup>
 import {ref, watch} from "vue"
const props = defineProps({
  groupDescription: String
});
const emits = defineEmits(['update:comment']);

const localGroupDescription = ref(props.groupDescription);

watch(() => props.groupDescription, (newVal) => {
  localGroupDescription.value = newVal;
});

const updateGroupDescription = () => {
  emits('update:comment', localGroupDescription.value);
  console.log("comment ", localGroupDescription.value)
};
</script>
