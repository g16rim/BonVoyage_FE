<template>
    <div>
      <hr/>
      <input type="text" v-model="localGroupName" @input="updateGroupName" placeholder="그룹 이름을 입력하세요" />
    </div>
  </template>
  
  <script setup>
  import {ref, watch} from "vue"
  const props = defineProps({
    groupName: String
  });
  const emits = defineEmits(['update:groupName']);
  
  const localGroupName = ref(props.groupName);
  
  watch(() => props.groupName, (newVal) => {
    localGroupName.value = newVal;
  });
  
  const updateGroupName = () => {
    emits('update:groupName', localGroupName.value);
  };
  </script>
  