<template>
    <div class="search" :class="[store.isSrhOpen ? 'open' : '']">
      <div class="search-wrap">
        <div class="x-icon" @click="store.toggleSearchBar">
          <svg
            width="15px"
            height="15px"
          >
          </svg>
        </div>
        <div class="search-bar">
          <form>
            <input type="text" placeholder="검색어를 입력하세요" @input="getSearchList" />
          </form>
        </div>
        <div class="search-list">
         <div class="product">
          <h5 v-if="searchResults.length > 10">인기 검색어</h5>
          <h5 v-else>연관 제품</h5>
          <template v-for="(item, index) in searchResults" :key="index">
            <span v-if="index < 4">
            {{ item.name }}
          </span>
          </template>
         </div>
         <ul class="img-product">
          <template v-for="(item, index) in searchResults" :key="index">
            <li v-if="index < 4">
          <span><img :src="item.imgUrl" /></span>
          <span>{{  item.name }}</span>
        </li>
          </template>
         </ul>
        </div>
      </div>
      <div class="bg"></div>
    </div>
  </template>
    <script setup>
  import { ref } from 'vue'
  import { useShopStore } from '@/stores/shop.js'
  
  const store = useShopStore()
  const searchValue = ref('')
  const searchResults = ref(store.allList)
  
  const getSearchList = (e) => {
    searchValue.value = e.target.value;
    searchResults.value = store.allList.filter((item) => {
    return item.name.includes(searchValue.value);
  });
  };
  
  </script>
    <style lang="scss">
  .search {
    z-index: -99;
    position: fixed;
    width: 100%;
  
    .bg {
      display: none;
      z-index: -1;
    }
  
    .search-wrap {
      visibility: hidden;
      position: relative;
      z-index: 999;
      width: 100%;
  
      .search-list {
          width: 580px;
          margin: 30px auto 50px auto;
          display: flex;
  
          .product{
  
              h5{
                  font-size:14px;
                  color:#acacac;
                  margin:0 0 20px 0;
              }
              width:200px;
              display: flex;
              gap:10px;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              font-size:13px;
          }
  
          .img-product{
              flex:1;
              display: grid;
              grid-template-columns: repeat(4,1fr);
              gap:10px;
  
              span{
                  font-size:13px;
                  display: block;
  
                  &:last-child{
                      margin:10px 0 0 0;
                  }
              }
          }
      }
  
      .search-bar {
        width: 580px;
        margin: 0 auto;
        height: 80px;
        position: relative;
  
        form {
          width: 181px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
  
          input {
            width: 100%;
            border: 1px solid #000;
            border-radius: 18px;
            height: 36px;
            padding: 2px 15px 0 15px;
          }
        }
      }
  
      .x-icon {
        position: absolute;
        right: 20px;
        top: 40px;
        transform: translate(0, -50%);
        background: #000;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
  
        svg {
          color: #fff;
        }
      }
    }
  
    &.open {
      z-index: 10;
  
      .bg {
        display: block;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 99;
      }
  
      .search-wrap {
        visibility: visible;
        position: fixed;
        background: #fff;
        left: 0;
        top: 0;
  
        .search-bar {
          form {
            width: 100%;
            transition: 0.3s ease-in;
          }
  
          input {
            width: 100%;
          }
        }
      }
    }
  }
  </style>