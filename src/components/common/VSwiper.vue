<template>
    <div class="container mx-auto  flex-wrap justify-center" style="width: 100%;">
  <div class="top-banner" style="width: 100%;" >
    <div class="wrap">
      <swiper
        :slidesPerView="3"
        :spaceBetween="0"
        :loop="true"
        :navigation="true"
        :modules="modules" 
        class="mySwiper"
        :autoplay="{
          delay: 1500,
          disableOnInteraction: false
        }"
      >
 
        <swiper-slide>RECORD YOUR TRIP</swiper-slide>
        <!-- <swiper-slide><img src="https://www.visitbusan.net/uploadImgs/files/cntnts/20191229160530047_oen" alt=""></swiper-slide> -->
        <swiper-slide>PLAN YOUR TRIP</swiper-slide>
        <swiper-slide>RECORD YOUR TRIP</swiper-slide>
        <swiper-slide>PLAN YOUR TRIP</swiper-slide>
      </swiper>
    </div>
  </div>
</div>
</template>
  
<script>

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

import 'tailwindcss/tailwind.css';

</script>
  
 <style lang="scss">

.top-banner {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  background-color: #32a852;
  .wrap {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .swiper {
      
      .swiper-slide {
        font-size: 50px;
        text-align: center;
        text-decoration: underline;
        width:100%;
        img{
          width: 800px;
        }
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