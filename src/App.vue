<script setup>
import { RouterView, useRoute } from 'vue-router'
import TheHeadingNavbar from '@/components/layout/TheHeadingNavbar.vue'
import TheHeadingOtherNav from "@/components/layout/TheHeadingOtherNav.vue"
import Sidebar from "@/components/layout/SideBar.vue";

import { useSidebarStore } from '@/stores/sidebar';
import { ref, watch } from 'vue';

const sidebarStore = useSidebarStore();
const route = useRoute()
const isHomeRoute = ref(route.path === '/')

// watch(sidebarStore.visible, (newValue, oldValue) => {
//     if (newValue) {

//     }
// });


watch(() => sidebarStore.visible, (isVisible) => {
  // console.log('Sidebar visibility changed:', isVisible);
  // 여기에서 사이드바 상태에 따라 필요한 동작을 수행
});

// 현재 경로가 변경될 때마다 isHomeRoute 값을 업데이트 
watch(() => route.path, (newPath) => {
  isHomeRoute.value = (newPath === '/')
})
</script>

<template>
  <div id="app">
    <component :is="isHomeRoute ? TheHeadingNavbar : TheHeadingOtherNav" />
    <RouterView />

    <div class="side" v-show="sidebarStore.visible">
      <Sidebar />
    </div>
  </div>
</template>

<style scoped>
.side {
  position: fixed;
  z-index: 999;
  top: 0px;
  /* 원하는 높이 값으로 조정 */
  right: 0px;
  /* 원하는 오른쪽 여백 값으로 조정 */
  width: 250px;
}
</style>
