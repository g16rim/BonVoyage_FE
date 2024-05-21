<script setup>
import { KakaoMap, KakaoMapMarkerPolyline } from 'vue3-kakao-maps'
import { listDetailPlan } from '@/api/site.js'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { planId } = route.params
const plans = ref([])
const markerList = ref([])

const map = ref(null)
let bounds

// 지도 로딩 완료 핸들러
const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef
    // 지도 범위 재설정 로직을 여기에서 호출하지 않고, 마커 리스트가 업데이트 되는 시점으로 이동
}

// 지도 범위 재설정 로직을 별도의 함수로 분리
const resetMapBounds = () => {
    if (map.value && markerList.value.length) {
        bounds = new kakao.maps.LatLngBounds()
        markerList.value.forEach((marker) => {
            const point = new kakao.maps.LatLng(marker.lat, marker.lng)
            bounds.extend(point)
        })
        map.value.setBounds(bounds)
    }
}

onMounted(() => {
    getDetailPlans()
})

onUnmounted(() => {
})

// 목록 가져오기
const getDetailPlans = async () => {
    await listDetailPlan(
        planId,
        ({ data }) => {
            plans.value = data
            console.log(plans)
            getMarkerList()
        },
        (error) => {
            console.error(error)
        }
    )
}

// 마커 리스트 만들기
const getMarkerList = () => {
    let index = 1
    markerList.value = plans.value.map(plan => ({
        lat: plan.latitude,
        lng: plan.longitude,
        order: index++,
        image: {
            imageSrc: `/src/assets/marker/${plan.type}.png`,
            imageWidth: 48,
            imageHeight: 48
        }
    }))
    // 마커 리스트가 업데이트 된 후 지도 범위 재설정
    resetMapBounds()
}

// plans가 변경될 때마다 getMarkerList를 호출하여 markerList를 업데이트하는 watcher 추가
watch(plans, (newPlans) => {
    if (newPlans.length) {
        getMarkerList()
    }
}, { deep: true })
</script>

<template>
    <!-- <div id="container">
        <div class="row">
            <div class="col-md-6"> -->
    <KakaoMap :lat="37.5030960206" :lng="127.038175715" @onLoadKakaoMap="onLoadKakaoMap"
        style="width: 100%; height: 100%;">
        <KakaoMapMarkerPolyline :markerList="markerList" :showMarkerOrder="true" />
    </KakaoMap>
    <!-- </div>
            <div class="col-md-6">
                <div class="card" style="height: 30rem; width: 40rem; overflow-y: scroll;">
                    <div v-for="plan in plans" :key="plan.planOrder" class="row g-0">
                        <div class="col-md-4">
                            <img v-if="plan.image" :src="plan.image" class="img-fluid rounded-start" alt="...">
                            <img v-else src="/src/assets/no-image.png" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ plan.planOrder }} {{ plan.title }}</h5>
                                <p class="card-text"><small class="text-muted">{{ plan.address }}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>

<style scoped></style>
