<script setup>
defineProps({ plan: Object })
</script>

<template>
    <tr class="text-center">
        <th scope="row">{{ plan.groupName }}</th>
        <td class="text-start">
            <router-link :to="{ name: 'plan-view', params: { planId: plan.planId } }" class="article-title link-dark">
                {{ plan.planTitle }}
            </router-link>
        </td>
        <td>{{ plan.startDate }}</td>
        <td>{{ plan.endDate }}</td>
        <td>{{ plan.budget }}</td>
    </tr>
</template>

<style scoped></style>