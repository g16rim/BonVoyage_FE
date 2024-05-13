<script setup>
import { computed } from 'vue'

const props = defineProps({
    site: Object
})

const image = computed(() => {
    return props.site.firstimage ? props.site.firstimage : "/src/assets/no-image.png"
})
</script>

<template>
    <div class="card" style="width: 18rem;">
        <img :src="image" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ site.title }}</h5>
            <p class="card-text">주소 : {{ site.addr1 }} {{ site.addr2 }}</p>
            <p class="card-text">유형 : {{ site.contenttypeid }}</p>
            <p class="card-text">위도 : {{ site.mapy }}</p>
            <p class="card-text">경도 : {{ site.mapx }}</p>
            <a href="#" class="btn btn-primary">Go Home</a>
        </div>
    </div>
</template>

<style scoped></style>