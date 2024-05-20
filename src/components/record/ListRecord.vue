<script setup>
document.addEventListener('DOMContentLoaded', () => {
    const explodingDivs = document.querySelectorAll('.exploding-bg');

    explodingDivs.forEach(div => {
        div.addEventListener('click', () => {
            div.classList.add('clicked');

            setTimeout(() => {
                div.classList.remove('clicked');
            }, 500); // Match the duration of the CSS animation
        });
    });
});
</script>


<template>
    <div>
        <section class="bg-white dark:bg-gray-900">
            <div class="container px-6 py-10 mx-auto">
                <h1 class="text-center">Bubble Trip 살펴보기</h1>
                <p class="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
                    보고 싶은 버블들을 터뜨려보세요!
                </p>
                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>

                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>


                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>


                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>


                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>


                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>


                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>


                    <div class="exploding-bg flex flex-col items-center p-8 transition-all duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-full aspect-square">
                        <img class="object-cover w-40 h-40 rounded-full ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="">
                        <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">arthur melo</h1>
                        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">design director</p>
                    </div>
                    <!-- Repeat the above block for other items -->
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.exploding-bg {
    position: relative;
    overflow: hidden;
}

.exploding-bg::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: rgba(0, 0, 255, 0.5); /* Blue color with transparency */
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
    opacity: 0;
}

.exploding-bg.clicked::before {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
}

.exploding-bg.clicked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: rgba(0, 0, 255, 0.5); /* Blue color with transparency */
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
</style>
