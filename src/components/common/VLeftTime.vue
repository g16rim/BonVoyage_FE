<script setup>
</script>

<template>
  <div class="wrap">
    <div class="timer">
      <span>D - {{diffDay}}일 {{diffHour}}시 {{ diffMin}}분 {{ diffSec }}초</span> 
    </div>
  </div>
</template>


<script>
export default {
  name: "HelloWorld",
  data: () => ({
    diffDay: "00",
    diffHour: "00",
    diffMin: "00",
    diffSec: "00",
  }),
  mounted() {
    setInterval(() => {
      this.timeRemaining();
    }, 1000);
  },
  methods: {
    timeRemaining() {
      let today = new Date();
      let gap = new Date("2024-5-24 00:00:00").getTime() - today;

      this.diffDay = String(Math.floor(gap / (1000 * 60 * 60 * 24)));
      this.diffHour = String(Math.floor((gap / (1000 * 60 * 60)) % 24));
      this.diffMin = String(Math.floor((gap / (1000 * 60)) % 60));
      this.diffSec = String(Math.floor((gap / 1000) % 60));

      this.diffDay = this.diffDay >= 10 ? this.diffDay : "0" + this.diffDay;
      this.diffHour = this.diffHour >= 10 ? this.diffHour : "0" + this.diffHour;
      this.diffMin = this.diffMin >= 10 ? this.diffMin : "0" + this.diffMin;
      this.diffSec = this.diffSec >= 10 ? this.diffSec : "0" + this.diffSec;
    },
  },
};
</script>