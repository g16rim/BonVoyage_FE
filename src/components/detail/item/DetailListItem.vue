<script setup>
defineProps({ plans: Array })
</script>

<template>
    <div class="card h-100 w-100" style="">
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
</template>

<style scoped></style>