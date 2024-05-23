<template>
  <div>
    <hr />
    <div class="centered">
      <div class="image-selection">
        <h3>직접 찍은 사진들을 기록해보세요.</h3>
        <div class="custom-image">
          <h5>직접 파일 선택</h5>
          <input type="file" id="file-input" @change="handleFileChange" />
        </div>
      </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['update:file']);

const selectedImage = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  emits('update:file', file);
  selectedImage.value = null; // Reset selected predefined image
};

const selectPredefinedImage = (image) => {
  selectedImage.value = image;
  emits('update:file', image);
};
</script>

<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-selection {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.assets-images, .custom-image {
  margin-bottom: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.image-grid img {
  width: 100%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.image-grid img.selected {
  border-color: blue;
}
</style>
