import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/shop',
      name:'shop',
      meta:{userLogin:true},
      component:resolve => require(['../pages/shop/shop'],resolve),
      children:[
        {
          path:'main',
          name:'main',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/mainShop/mainShop'],resolve),
        },
        {
          path:'detail',
          name:'detail',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/good/goodDetail'],resolve),
        },
        {
          path:'pay',
          name:'pay',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/pay/pay'],resolve),
        },
        {
          path:'balance',
          name:'balance',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/order/balance'],resolve),
        },
        {
          path:'order',
          name:'order',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/order/order'],resolve),
        },
        {
          path:'orderDetail',
          name:'orderDetailUser',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/order/orderDetail'],resolve),
        },
        {
          path:'cart',
          name:'cart',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/cart/cart'],resolve),
        },
        {
          path:'account',
          name:'account',
          meta:{userLogin:true},
          component:resolve => require(['../pages/shop/account/account'],resolve),
          children:[
            {
              path:'safe',
              name:'safe',
              meta:{userLogin:true},
              component:resolve => require(['../components/account/safe'],resolve),
            },
            {
              path:'info',
              name:'info',
              meta:{userLogin:true},
              component:resolve => require(['../components/account/info'],resolve),
            },
            {
              path:'addition',
              name:'addition',
              meta:{userLogin:true},
              component:resolve => require(['../components/account/addition'],resolve),
            },
            {
              path:'',
              redirect:to =>{
                return 'info'
              }
            },
          ]
        },
        {
          path:'/',
          redirect:to =>{
            return 'main'
          }
        },
      ]
    },
    {
      path:'/manage',
      name:'manage',
      meta:{requireManage:true},
      component:resolve =>require(['../pages/manage/home/home'],resolve),
      children:[
        {
          path: 'type',
          name:'mType',
          meta:{requireManage:true},
          component:resolve =>require(['../pages/manage/home/type/type'],resolve),
        },
        {
          path: 'good',
          name:'mGood',
          meta:{requireManage:true},
          component:resolve =>require(['../pages/manage/home/good/good'],resolve),
          children:[
            {
              path:'goodList',
              name:'goodList',
              meta:{requireManage:true},
              component:resolve => require(['../pages/manage/home/good/goodList'],resolve),
            },
            {
              path:'goodDetail',
              name:'goodDetail',
              meta:{requireManage:true},
              component:resolve => require(['../pages/manage/home/good/goodDetail'],resolve),
            },
            {
              path:'uploadGood',
              name:'uploadGood',
              meta:{requireManage:true},
              component:resolve => require(['../pages/manage/home/good/uploadGood'],resolve),
            },
            {
              path:'updateGood',
              name:'updateGood',
              meta:{requireManage:true},
              component:resolve => require(['../pages/manage/home/good/updateGood'],resolve),
            },
            {
              path:'/',
              redirect:to => {
                return 'goodList'
              }
            },
            {
              path:'',
              redirect:to => {
                return 'goodList'
              }
            },
          ]
        },
        {
          path: 'order',
          name:'mOrder',
          meta:{requireManage:true},
          component:resolve =>require(['../pages/manage/home/order/order'],resolve),
          children:[
            {
              path:'orderList',
              name:'orderList',
              meta:{requireManage:true},
              component:resolve => require(['../pages/manage/home/order/orderList'],resolve),
            },
            {
              path:'orderDetail',
              name:'orderDetail',
              meta:{requireManage:true},
              component:resolve => require(['../pages/manage/home/order/orderDetail'],resolve),
            },
            {
              path:'/',
              redirect:to => {
                return 'orderList'
              }
            },
            {
              path:'',
              redirect:to => {
                return 'goodList'
              }
            },
          ]
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['../pages/login/login'],resolve),
    },
    {
      path:'/forget',
      name:'forget',
      component:resolve => require(['../pages/forget/forget'],resolve),
    },
    {
      path:'/register',
      name:'register',
      component:resolve => require(['../pages/register/register'],resolve),
    },
    {
      path:'/error',
      name:'error',
      component:resolve => require(['../pages/error/error'],resolve),
    },
    {
      path:'/',
      redirect:to => {
        return 'login'
      }
    },
    {
      path:'*',
      redirect:to => {
        return '/error'
      }
    },
  ]
})
