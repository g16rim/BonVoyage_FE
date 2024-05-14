<template> 
    <section class="bg-white py-8">
        <div class="luckiest-guy-regular" id="small-title">
            <a class="bestReview" href="#">Best Review</a>
        </div>
        <div class="container mx-auto flex flex-wrap justify-center">
        
            <!-- 반복문을 통해 제품 이미지를 동적으로 생성 -->
            <!-- md:w-1/3 클래스로 각 이미지가 데스크톱 화면에서 1/3 크기로 나타남 -->
            <!-- 모바일 화면에서는 md:w-full를 적용하여 한 줄에 하나의 이미지만 표시 -->
            <div v-for="product in products" :key="product.id" class="w-full md:w-1/3 p-6 flex flex-col">
                <a href="#">
                    <img class="hover:grow hover:shadow-lg" :src="product.image" alt="Product Image">
                    <div class="pt-3 flex items-center justify-between">
                        <p class="">{{ product.name }}</p>
                    </div>
                    <p class="pt-1 text-gray-900">£{{ product.price }}</p>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import 'tailwindcss/tailwind.css';
// 간단한 상품 정보 배열
const products = [
    { id: 1, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 2, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1508423134147-addf71308178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 3, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 4, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 5, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1467949576168-6ce8e2df4e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 6, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 7, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1550837368-6594235de85c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 8, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80' },
    { id: 9, name: 'Product Name', price: '9.99', image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80' }
];
</script>

<style scoped>
.bestReview{

    font-size: 20px;
    font-weight: 550;
    color: black;
    text-decoration: none;
}
.work-sans {
    font-family: 'Work Sans', sans-serif;
}
.hover\:grow {
    transition: all 0.3s;
    transform: scale(1);
}
.hover\:grow:hover {
    transform: scale(1.02);
}

#small-title{
    display: block;
    margin: 20px;
    text-align: center;
}
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
