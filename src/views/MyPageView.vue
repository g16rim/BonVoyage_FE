<script setup>

</script>

<template>
    <div class="bg-white">
        <div class="pt-6">
            <nav aria-label="Breadcrumb">
                <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <li>
                        <div class="flex items-center">
                            <a href="#" class="mr-2 text-sm font-medium text-gray-900">MyPage</a>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                class="h-5 w-4 text-gray-300">
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>


                    <!-- <li class="text-sm">
                <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">Basic Tee 6-Pack</a>
                </li> -->
                </ol>
            </nav>

            <!-- Image gallery -->
            <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img src="/src/assets/login/roopy.jpg" alt="Two each of gray, white, and black shirts laying flat."
                        class="h-full w-full object-cover object-center">
                </div>
                <!-- Product info -->
                <div
                    class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl  lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">


                    <!-- Options -->
                    <div class="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 class="sr-only">Product information</h2>
                        <p class="text-3xl tracking-tight text-gray-900">루피</p>

                        <!-- Reviews -->
                        <div class="mt-6">
                            <h3 class="sr-only">Reviews</h3>
                            <div class="flex items-center">
                                <div class="flex items-center">

                                </div>
                                <p>중급 여행가</p>

                                <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">내가 쓴
                                    글: 117 writings</a>
                            </div>
                        </div>

                        <form class="mt-10">

                            <div>
                                <div class="mt-4">
                                    <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                                        <li class="text-gray-400"><span class="text-gray-600">생년월일 : 2000. 07. 31</span>
                                        </li>
                                        <li class="text-gray-400"><span class="text-gray-600">전화번호 :
                                                010-0000-0000</span></li>
                                        <li class="text-gray-400"><span class="text-gray-600">이메일 : ssafy@ssafy.com
                                            </span></li>

                                    </ul>
                                </div>

                            </div>

                            <button type="submit"
                                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">내
                                정보 수정하기</button>
                        </form>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>

<style scoped></style>