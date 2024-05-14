import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import TripView from "@/views/TripView.vue"
import LeftTime from "@/components/common/VLeftTime.vue"
import SearchBar from "@/components/common/Vsearch.vue"
import MapView from "@/views/MapView.vue"
import MenuBar from "@/components/plan/MenuSlide.vue"
import ListFriendView from "@/components/group/ListFriend.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/trip',
      name: 'trip',
      component: TripView
    },
    {
      path: '/left',
      name: 'left',
      component: LeftTime
    },
    {
      path: '/search',
      name: 'search',
      component: SearchBar
    }, {
      path: '/menu',
      name: 'menu',
      component: MenuBar
    },
    {
      path: '/list',
      name: 'list',
      component: ListFriendView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    }
  ]
})

export default router
