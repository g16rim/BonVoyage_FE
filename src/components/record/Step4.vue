<template>
    <div>
      <hr/>
      <input type="file" id="file-input" @change="handleFileChange" />
      <p>그룹 대표 이미지를 선택하세요</p>
    </div>
  </template>
  
  <script setup>
  const emits = defineEmits(['update:file']);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    emits('update:file', file);
  };
  </script>
  