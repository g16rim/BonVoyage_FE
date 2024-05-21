import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import SearchBar from "@/components/common/Vsearch.vue"
import MenuBar from "@/components/plan/MenuSlide.vue"
import ListFriendView from "@/components/group/ListGroup.vue"
import MyPageView from "@/views/MyPageView.vue"
import RecommendView from "@/components/call/Recommend.vue"
import YoutubeView from "@/components/call/Youtube.vue"
import MyGroupView from "@/views/MyGroupView.vue"
import RecordView from "@/views/RecordView.vue"
import JoinView from "@/views/JoinView.vue"


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
      path: '/record',
      name: 'record',
      component: RecordView
    },
    {
      path: '/music',
      name: 'music',
      component: RecommendView
    },
    {
      path: '/youtube',
      name: 'youtube',
      component: YoutubeView
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView
    },
    {
      path: '/group',
      name: 'group',
      component: MyGroupView
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import("@/views/PlanView.vue"),
      children: [
        {
          path: "create/:groupId",
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
        },
        {
          path: "view/:planId",
          name: "detail-view",
          component: () => import("@/components/detail/DetailView.vue")
        }
      ]
    }
  ]
})

export default router