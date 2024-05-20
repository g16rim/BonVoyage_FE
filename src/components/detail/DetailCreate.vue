<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { KakaoMap } from 'vue3-kakao-maps';
import { searchPlaces, checkSitesExisting, registDetailPlan } from "@/api/site.js"
import draggable from 'vuedraggable'

const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env
const route = useRoute()

const map = ref()
const { planId } = route.params

const markerInfoList = ref([]) // 검색 결과 site 배열
const markers = ref([]) // 마커 배열
const selectedMarkers = ref([]) // 선택한 site 배열
const transformedMarkers = ref([])

const transformMarkers = () => {
    transformedMarkers.value = selectedMarkers.value.map(marker => ({
        id: parseInt(marker.contentid),
        title: marker.title,
        latitude: parseFloat(marker.mapy),
        longitude: parseFloat(marker.mapx),
        type: parseInt(marker.contenttypeid),
        address: `${marker.addr1} ${marker.addr2}`,
        image: marker.firstimage,
        areaCode: parseInt(marker.areacode),
        tel: marker.tel,
        dibCount: 0,
        reviewCount: 0,
        rating: 0.0
    }))
}

// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
let bounds;

const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef;
};

onMounted(() => {
    if (markerInfoList.value.length > 0) drawMarkers()
})

const markerObjects = ref([]); // 마커와 오버레이를 함께 저장할 배열

const drawMarkers = () => {
    bounds = new kakao.maps.LatLngBounds();
    let point;
    let marker;

    // 기존 마커와 오버레이 제거
    markerObjects.value.forEach(({ marker, overlay }) => {
        marker.setMap(null);
        overlay.setMap(null);
    });
    markerObjects.value = [];

    markerInfoList.value.forEach((markerInfo) => {
        point = new kakao.maps.LatLng(markerInfo.mapy, markerInfo.mapx);
        marker = new kakao.maps.Marker({ position: point });
        if (map.value !== undefined) {
            marker.setMap(map.value);
        }
        // 마커에 고유 ID 설정
        marker.id = markerInfo.contentid

        bounds.extend(point);

        const overlayContent = document.createElement('div');
        overlayContent.innerHTML = markerInfo.title;
        overlayContent.style.padding = '5px';
        overlayContent.style.backgroundColor = 'white';
        overlayContent.style.border = '1px solid black';
        overlayContent.style.borderRadius = '10px';

        const overlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            position: point,
            yAnchor: 2.1,
            // zIndex: 3,
            visible: false,
            map: null
        });

        // 마커와 info에 대한 참조를 함께 저장
        markerObjects.value.push({ marker, overlay, markerInfo });

        // 이벤트 리스너 등록을 위한 IIFE 사용
        (function (mkr, ovly, mkrInfo) {
            kakao.maps.event.addListener(mkr, 'mouseover', () => {
                ovly.setMap(map.value);
                ovly.setVisible(true);
            });
            kakao.maps.event.addListener(mkr, 'mouseout', () => {
                ovly.setVisible(false);
            });
            kakao.maps.event.addListener(mkr, 'click', () => {
                const existingIndex = selectedMarkers.value.findIndex(info => info.contentid === mkrInfo.contentid);
                if (existingIndex !== -1) {
                    // 만약 마커 정보가 이미 존재한다면, 해당 마커 정보를 제외한 새 배열을 생성
                    selectedMarkers.value = selectedMarkers.value.filter((_, index) => index !== existingIndex);
                } else {
                    // 마커 정보가 존재하지 않는다면, 배열에 추가
                    selectedMarkers.value.push(mkrInfo);
                }
            });
        })(marker, overlay, markerInfo); // 현재 marker와 overlay를 IIFE에 전달
    });

    if (map.value !== undefined) {
        map.value.setBounds(bounds);
    }
};

const param = ref({
    MobileOS: 'ETC',
    MobileApp: 'bonvoyage',
    _type: 'json',
    keyword: '',
    contentTypeId: '',
    areaCode: '',
    serviceKey: VITE_OPEN_API_SERVICE_KEY
})

const getPlaces = () => {
    searchPlaces(
        param.value,
        ({ data }) => {
            console.log(data['response']['body']['items']['item'])
            markerInfoList.value = data['response']['body']['items']['item']
            console.log(markers.value)
            drawMarkers()
        },
        (error) => {
            console.error(error)
        }
    )
}

const findAndSave = () => {
    transformMarkers()
    checkSitesExisting(
        transformedMarkers.value,
        ({ data }) => {
            console.log("성공" + data)
            const detailPlanList = transformedMarkers.value.map((item, index) => ({
                siteId: item.id,
                day: 1, // 'day'가 항상 1로 고정된다고 가정
                planOrder: index + 1, // 배열의 순서는 0부터 시작하므로 1을 더해줍니다
                planId: parseInt(planId)
            }));
            console.log(detailPlanList)

            // registDetailPlan 계획 상세 정보를 등록
            registDetailPlan(
                parseInt(planId),
                detailPlanList,
                (response) => {
                    console.log("계획 상세 정보 등록 성공:", response);
                },
                (error) => {
                    console.error("계획 상세 정보 등록 실패:", error);
                }
            );
        },
        (error) => {
            console.error(error)
        }
    )
}


</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <select v-model="param.areaCode">
                    <option disabled value="">지역</option>
                    <option value="1">서울</option>
                    <option value="2">인천</option>
                    <option value="3">대전</option>
                    <option value="4">대구</option>
                    <option value="5">광주</option>
                    <option value="6">부산</option>
                    <option value="7">울산</option>
                    <option value="8">세종특별자치시</option>
                    <option value="31">경기도</option>
                    <option value="32">강원특별자치도</option>
                    <option value="33">충청북도</option>
                    <option value="34">충청남도</option>
                    <option value="35">경상북도</option>
                    <option value="36">경상남도</option>
                    <option value="37">전북특별자치도</option>
                    <option value="38">전라남도</option>
                    <option value="39">제주도</option>
                    <option value="">선택 안 함</option>
                </select>
                <select v-model="param.contentTypeId">
                    <option disabled value="">여행지 유형</option>
                    <option value="12">관광지</option>
                    <option value="32">숙박</option>
                    <option value="39">음식점</option>
                    <option value="14">문화시설</option>
                    <option value="15">축제·공연·행사</option>
                    <option value="25">여행 코스</option>
                    <option value="28">레포츠</option>
                    <option value="38">쇼핑</option>
                    <option value="">선택 안 함</option>
                </select>
                <input v-model="param.keyword" @keyup.enter="getPlaces" placeholder="검색..." />
                <KakaoMap :lat="37.5012647456244" :lng="127.03958123605" style="height: 400px;" :clickable="true"
                    @onLoadKakaoMap="onLoadKakaoMap" />
            </div>
            <div class="col-md-4">
                <div class="selected-marker-info">
                    <button @click="findAndSave" type="submit" class="btn btn-outline-success mb-3">계획 저장</button>
                    <h3>선택한 위치 정보</h3>
                    <draggable v-model="selectedMarkers" class="list-group" :key="selectedMarkers.contentid"
                        item-key="contentid">
                        <template #item="{ element: markerInfo, index }">
                            <li class="list-group-item">
                                <div>여행 순서: <span>{{ index + 1 }}</span></div>
                                <div>아이디: <span>{{ markerInfo.contentid }}</span></div>
                                <div>제목: <span>{{ markerInfo.title }}</span></div>
                                <div>유형: <span>{{ markerInfo.contenttypeid }}</span></div>
                                <div>주소: <span>{{ markerInfo.addr1 }}</span></div>
                            </li>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>