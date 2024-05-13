<template>
    <div class="header">
      <ul>
        <span
          :style="{ left: positionToMove, width: sliderWidth }"
        ></span>
        <li
          v-for="menu in menuList"
          :key="menu.name"
          @click="menuMove(menu.name)"
          :ref="menu.name"
          :class="{'active':selectedIndex === menu.name}"
        >
          {{ menu.name }}
        </li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    name: "Menu",
    data() {
      return {
        sliderPosition: 15,
        selectedElementWidth: 78,
        selectedIndex: "Home",
        menuList: [
          { name: "그룹" },
          { name: "날짜" },
          { name: "예산" },
          { name: "상세" },
        ],
      };
    },
    methods: {
      menuMove(name) {
        let el = this.$refs[`${name}`][0];
        this.sliderPosition = el.offsetLeft;
        this.selectedElementWidth = el.offsetWidth;
        this.selectedIndex = name;
      },
    },
    computed: {
      positionToMove() {
        return this.sliderPosition + "px";
      },
      sliderWidth() {
        return this.selectedElementWidth + "px";
      },
    },
  };
  </script>
  <style>

  .header {
    background-color: gray;
    width: 400px;
    position: fixed;
    top: 350px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  
  .header ul {
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: center;
    gap: 20px;
    border-radius: 20px;
    padding: 10px 15px;
  }
  
  .header ul li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    border-radius: 15px;
    padding: 10px 0;
    font-size: 0.8rem;
    position: relative;
    z-index: 1;
    cursor: pointer;
  }
  
  .header ul .active {
    color:#fff;
    transition:all 1.0s ease;
  }
  
  .header ul span {
    background: #4577f6;
    height: 30px;
    display: inline-block;
    position: absolute;
    z-index: 0;
    border-radius: 15px;
    cursor: pointer;
    transition:all 0.3s ease-in;
  }
  </style>