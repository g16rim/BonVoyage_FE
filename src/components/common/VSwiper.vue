<template>
  <div class="top-banner">
    <div class="wrap">
      <swiper
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        :navigation="true"
        :modules="modules" 
        class="mySwiper"
        :autoplay="{
          delay: 1500,
          disableOnInteraction: false
        }"
      >
      <hanokImage/>
       
        <swiper-slide>안녕하세요</swiper-slide>
        <swiper-slide>반갑습니다</swiper-slide>
        <swiper-slide>좋은하루되세요</swiper-slide>
      </swiper>
    </div>
  </div>
</template>
  
<script>
  import {ref} from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import { Autoplay, Navigation } from 'swiper/modules';
  // import hanokImage from '@/assets/place/hanok.png';
  // import BusanImage from '@/assets/place/busan.png';
  // import GarImage from '@/assets/place/ganenung.png';

  // const images = ref([
  //     { url: hanokImage },
  //     { url: BusanImage },
  //     { url: GarImage },
  //     // 원하는 이미지들을 추가
  // ]);
  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    setup() {
      return {
        modules: [Navigation, Autoplay]
      }
    }
  }
</script>
  
 <style lang="scss">
.top-banner {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;

  .wrap {
    width: 60%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .swiper {
      .swiper-slide {
        font-size: 13px;
        text-align: center;
        text-decoration: underline;
        width:70%;
      
      }

      .swiper-button-next {
        position: absolute;
        z-index: 999;
        background: url('data:image 어쩌구')
          no-repeat;
        background-size: 50% auto;
        background-position: center;

        &::after {
          display: none;
        }
      }

      .swiper-button-prev {
        position: absolute;
        right: 0;
        background: url('')
          no-repeat;
        background-size: 50% auto;
        background-position: center;

        &::after {
          display: none;
        }
      }
    }
  }
}
</style>