<template>
    <div>
      <hr/>
      <input type="text" v-model="localGroupConcept" @input="updateGroupConcept" placeholder="그룹 컨셉을 입력하세요" />
    </div>
</template>
  
  <script setup>
   import {ref, watch} from "vue"
  const props = defineProps({
    groupConcept: String
  });
  const emits = defineEmits(['update:groupConcept']);
  
  const localGroupConcept = ref(props.groupConcept);
  
  watch(() => props.groupConcept, (newVal) => {
    localGroupConcept.value = newVal;
  });
  
  const updateGroupConcept = () => {
    emits('update:groupConcept', localGroupConcept.value);
  };
  </script>
  