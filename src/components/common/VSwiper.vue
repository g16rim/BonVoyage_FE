<template>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- 이미지 슬라이드 아이템들 -->
        <div class="swiper-slide" v-for="(image, index) in images" :key="index">
          <img :src="image.url" alt="Slide Image">
        </div>
        
      </div>
      <!-- 추가적인 Swiper 컨트롤을 위한 버튼들 -->
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </template>
  
  <script setup>
    import hanokImage from '@/assets/place/hanok.png';
    import BusanImage from '@/assets/place/busan.png';
    import GarImage from '@/assets/place/ganenung.png';
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import Swiper from 'swiper';
    import 'swiper/swiper-bundle.css';
  
    const images = ref([
        { url: hanokImage },
        { url: BusanImage },
        { url: GarImage },
        // 원하는 이미지들을 추가
    ]);
    
    let swiper = null;
    
  onMounted(() => {
    swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });
  
  onBeforeUnmount(() => {
    if (swiper) {
      swiper.destroy();
      swiper = null;
    }
  });
  </script>
  
  <style scoped>
  /* Swiper 컨테이너 스타일 */
  .swiper-container {
    width: 500px;
    height: 300px; /* 슬라이드 높이 설정 */
  }

  img{
    width: 800px;
  }
  
  /* 슬라이드 아이템 스타일 */
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
  }

  
  </style>
  