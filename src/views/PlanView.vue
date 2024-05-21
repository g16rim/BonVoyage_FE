<script setup>

</script>

<template>
    <div class="container text-center mt-5">
        <nav aria-label="Breadcrumb">
            <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li>
                    <div class="flex items-center">
                        <span href="#" class="mr-2 text-sm font-medium text-gray-900">Plan</span>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                            class="h-5 w-4 text-gray-300" style="transform: scale(-1, 1); transform-origin: center;">
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                </li>
            </ol>
        </nav>
        <router-view></router-view>
    </div>
</template>

<style scoped>
* {
    font-family: 'GmarketSans';
}
</style>