import axios from 'axios'
import { getCookie,delCookie} from '../utils/cookie'
import { MessageBox} from 'element-ui'
import router from '../router'
const service = axios.create({
  timeout: 9000,
  baseURL: process.env.VUE_APP_BASE_URL
})

 
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
service.interceptors.request.use(
  config => {
    const token = getCookie('token'); //获取Cookie
    // console.log(token)
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json;charset=utf-8' //设置跨域头部
    };
    if (token) {
      config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
  // 响应的拦截器
  service.interceptors.response.use(
    function(response) {
      // 对响应数据做点什么
      return response;
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
// 响应的拦截器
// service.interceptors.response.use(
//   response => {
//       console.log(response.data);
//       if (response.data.status == 505) {
//         delCookie();
//           MessageBox.alert('尚未登录、重复登录或是登录已过期，请重新登录！', '系统提示', {
//               confirmButtonText: '确定',
//               callback: action => {
//                   router.push({path: "/login"});
//               },
//           });
//       }
//       return response;
//   },
//   error => {
//       // console.log('err' + error)// for debug
//       // Message({
//       //     message: error.message,
//       //     type: 'error',
//       //     duration: 5 * 1000
//       // })
//       return Promise.reject(error)
//   })

export default service;