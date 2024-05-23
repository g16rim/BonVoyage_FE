<script setup>
import { userInfo } from '@/api/user/user.js'
import { ref, onMounted } from 'vue'

// 날짜 형식을 변환하는 함수
function formatDate(dateString) {
    if (dateString.length !== 8) {
        throw new Error("날짜 문자열의 형식이 잘못되었습니다. 'YYYYMMDD' 형식이어야 합니다.");
    }
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
}

// 전화번호 형식을 변환하는 함수
function formatPhone(phoneString) {
    if (phoneString.length !== 11) {
        throw new Error("전화번호 문자열의 형식이 잘못되었습니다. '01012345678' 형식이어야 합니다.");
    }
    const part1 = phoneString.substring(0, 3);
    const part2 = phoneString.substring(3, 7);
    const part3 = phoneString.substring(7, 11);
    return `${part1}-${part2}-${part3}`;
}

const info = ref({
    username: '',
    email: '',
    grade: '',
    birth: '',
    phone: '',
    imageUrl: ''
})

onMounted(() => {
    userInfo(
        ({ data }) => {
            console.log(data.information)
            info.value = data.information
            // 생년월일과 전화번호 형식 변환
            const formattedBirth = formatDate(info.value.birth);
            const formattedPhone = formatPhone(info.value.phone);
            info.value = {
                username: info.value.username,
                email: info.value.email,
                grade: info.value.grade,
                birth: formattedBirth,
                phone: formattedPhone,
                imageUrl: info.value.imageUrl
            };
        },
        (error) => {
            console.error(error)
        }
    )
})
</script>

<template>
    <div class="container mt-5 mb-3 mx-auto flex justify-center">
        <!-- Image and User Info Section -->
        <div class="mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:flex lg:items-start lg:space-x-8">
            <!-- Image Section -->
            <div class="flex-shrink-0">
                <img :src="info.imageUrl" alt="userImage" class="h-48 w-48 object-cover rounded-lg">
            </div>

            <!-- User Info Section -->
            <div class="mt-6 lg:mt-0">
                <div class="text-lg leading-6 font-medium space-y-1">
                    <h3 class="text-3xl tracking-tight text-gray-900">{{ info.username }}</h3>
                    <p class="text-indigo-600">초급 여행가</p>
                </div>
                <ul role="list" class="mt-2 list-disc space-y-2 pl-4 text-sm">
                    <li class="text-gray-400"><span class="text-gray-600">생년월일: {{ info.birth }}</span></li>
                    <li class="text-gray-400"><span class="text-gray-600">전화번호: {{ info.phone }}</span></li>
                    <li class="text-gray-400"><span class="text-gray-600">이메일: {{ info.email }}</span></li>
                </ul>
                <button type="submit"
                    class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">내
                    정보 수정하기</button>
            </div>
        </div>
    </div>
</template>


<style scoped></style>