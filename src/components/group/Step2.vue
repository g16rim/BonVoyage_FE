<template>
    <div>
      <hr/>
      <textarea v-model="localGroupDescription" @input="updateGroupDescription" placeholder="그룹 설명을 입력하세요"></textarea>
    </div>
  </template>
  
  <script setup>
   import {ref, watch} from "vue"
  const props = defineProps({
    groupDescription: String
  });
  const emits = defineEmits(['update:groupDescription']);
  
  const localGroupDescription = ref(props.groupDescription);
  
  watch(() => props.groupDescription, (newVal) => {
    localGroupDescription.value = newVal;
  });
  
  const updateGroupDescription = () => {
    emits('update:groupDescription', localGroupDescription.value);
  };
  </script>
  