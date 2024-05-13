<script setup>
import { ref } from 'vue'
import axios from 'axios'
import VCard from "@/components/common/VCard.vue"
import VMap from "@/components/map/VMap.vue"

const { VITE_OPEN_API_SERVICE_KEY, VITE_SEARCH_SITE_URL } = import.meta.env

const params = ref({
    serviceKey: VITE_OPEN_API_SERVICE_KEY,
    numOfRows: 10,
    pageNo: 1,
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
    keyword: ""
})

const sites = ref([])

const searchSite = () => {
    axios
        .get(VITE_SEARCH_SITE_URL, { params: params.value })
        .then(({ data }) => {
            sites.value = data.response.body.items.item
        })
}

</script>

<template>
    <div>
        <!-- <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select> -->
        <form class="d-flex mx-auto mb-2 mb-lg-0" role="search">
            <input class="form-control me-2" type="search" placeholder="떠나요" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">ok</button>
        </form>
        <div class="container-fluid">
            <div class="alert alert-primary text-center fw-bold display-6" role="alert">
                관광지 목록
            </div>
            <div class="row g-3 align-items-center justify-content-center mb-3">
                <div class="col-auto">
                    <label for="siteName" class="col-form-label">관광지명</label>
                </div>
                <div class="col-auto">
                    <input type="text" v-model="params.keyword" id="siteName" class="form-control">
                </div>
                <div class="col-auto">
                    <span class="form-text">
                        <button type="button" @click="searchSite" class="btn btn-secondary">검색</button>
                    </span>
                </div>
            </div>
            <div class="row">
                <VCard v-for="site in sites" :key="site.contentId" :site=site />
            </div>
        </div>
        <VMap />
    </div>
</template>

<style scoped></style>