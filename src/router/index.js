import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import LeftTime from "@/components/common/VLeftTime.vue"
import SearchBar from "@/components/common/Vsearch.vue"
import MenuBar from "@/components/plan/MenuSlide.vue"
import ListFriendView from "@/components/group/ListFriend.vue"
import MyPageView from "@/views/MyPageView.vue"

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
      path: '/mypage',
      name: 'mypage',
      component: MyPageView
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import("@/views/PlanView.vue"),
      children: [
        {
          path: "create",
          name: "plan-create",
          component: () => import("@/components/plan/PlanCreate.vue"),
        },
        {
          path: "view/:planId",
          name: "plan-view",
          component: () => import("@/components/plan/PlanDetail.vue"),
        },
        {
          path: "modify/:planId",
          name: "plan-modify",
          component: () => import("@/components/plan/PlanModify.vue"),
        },
        {
          path: "list",
          name: "plan-list",
          component: () => import("@/components/plan/PlanList.vue"),
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import("@/views/DetailView.vue"),
      children: [
        {
          path: "create/:planId",
          name: "detail-create",
          component: () => import("@/components/detail/DetailCreate.vue")
        }
      ]
    }
  ]
})

export default router