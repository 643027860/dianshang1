import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

//图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './assets/imgs/loading/loading.png'
Vue.use(VueLazyload, {
  loading
})

//引入video插件及css
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
//引入 hls,视频直播(m3u8)必须引入的
import 'videojs-contrib-hls'
//播放rtmp视频
import 'videojs-flash'
//如果你需要自定义播放器的样式，自己新建一个css
require('./assets/css/video_css/myvideo.css')
Vue.use(VideoPlayer)

//ueditor
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store
})

router.beforeEach((to,from,next)=>{
  if(to.meta.requireManage == true){ // 判断是否需要登录的路由
    if(sessionStorage.getItem('haichuang_user_manage') != 'null'){
      return next();
    }else{
      next({
        path: '/login'
      })
    }
  }else if(to.meta.userLogin == true){
    if(sessionStorage.getItem('haichuang_user') != 'null'){
      return next();
    }else{
      next({
        path: '/login'
      })
    }
  }else{                           // 不需要权限的路由直接进行跳转
    return next();
  }
})
