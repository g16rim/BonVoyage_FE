<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps'

// 목록 가지고 오기


</script>

<template>
    <KakaoMap :lat="33.450705" :lng="126.570667">
        <KakaoMapMarker :lat="33.450705" :lng="126.570667" />
    </KakaoMap>
</template>

<style scoped></style>