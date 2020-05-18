import axios from 'axios'
import qs from 'qs'
import router from '../router'

// axios.interceptors.request.use(
//   config => {
//     const token = store.get('haichuang_ruanjian_jwt') ||{}
//     console.log(token)
//     if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.authorization = token  //请求头加上token
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })

export default function ajax (url, data={}, type='GET',json=false,save=false,token=false) {
  return new Promise(function (resolve, reject) {
    //console.log(data)
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else if(type === 'POST'){
      // 发送post请求
      if(json)
        promise = axios.post(url, qs.stringify(data))
      else{
        promise = axios.post(url, data)
      }

    }else if(type === 'PUT'){
      // 发送put请求
      if(json)
        promise = axios.put(url, qs.stringify(data))
      else
        promise = axios.put(url, data)
    }else if(type === 'DELETE'){
      // delete
      promise = axios.delete(url, {params:data})
    }
    promise.then(function (response) {
      // 成功了调用resolve()
     var result = response.data
      console.log(result.status)
     if(result.status == 10){
       alert('用户信息过期或用户未登录，请重新登录。')
       router.replace({name:'login'})
     }else{
       resolve(response.data)
     }
    }).catch(function (error) {
      // if(error.response.status==401){
      //   alert('授权过期，请重新登录')
      //   router.replace({path:'/login'})
      //   return
      // }
      resolve(error.response)
      //失败了调用reject()
      //reject(error)
    })
  })
}
