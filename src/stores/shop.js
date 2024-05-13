import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShopStore = defineStore('shop', () => {
  const amount = ref(0)

  const formattedAmount = computed(() => {
    return amount.value.toLocaleString('ko-KR'); 
  })

  const setAmount = (newAmount) => {
    amount.value = newAmount;
  }

  return { amount, formattedAmount, setAmount }
})