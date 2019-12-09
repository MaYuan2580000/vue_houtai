import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from '../utils/cookie'
import { MessageBox } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    //main为登录以后显示主页面
    {
      path: '/main',
      component: () => import('@/view/main'),
      meta: {
        requireAuth: true,
        title: "工作平台",
        index: '1'
      },
     
      //主页的右侧展示数据
      children: [{
        path: '',
        component: () => import('@/view/home')
      },
      {
        path: '/user',
        component: () => import('@/view/user'),
        meta: {
          title: '用户列表',
          index: '2-1'
        }
      },
      {
        path: '/dome',
        component: () => import('@/view/dome'),
        meta: {
          title: '用户列表',
          index: '2-2'
        }
      }
      ]
    },
    //重定向为login页面 /代表login
    {
      path: '/',
      redirect: '/login'
    },
    //login登录界面
    {
      path: '/login',
      component: () => import('@/view/login'),
      meta: {
        title: '登录',

      }
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(getCookie('token'))
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (getCookie('token')) {
//       next()
//     } else if (!getCookie('token')) {
//       setTimeout(() => {
//         MessageBox.alert('尚未登录、重复登录或是登录已过期，请重新登录！', '系统提示', {
//           confirmButtonText: '确定',
//           callback: action => {
//             router.push({ path: "/login" });
//           },
//         });
//       }, 500);
//     }
//   }
//   else {
//     next()
//   }

// });
export default router