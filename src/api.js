// we first import the axios library

import { GET_newServerBasePath } from './store/consts'




import  router  from './router/index'
import axios from 'axios'
// we get the base url from the environment variables
// import {apiBaseUrl} from "@/environment";
import { serverBasePath } from "./store/consts"






// we also import the auth service from the modules.
// import {AuthService} from "@/modules/auth";
/**
 * Axios basic configuration
 */




 //SET_newServerBasePath(newServerBasePath),
//console.log('newServerBasePath', GET_newServerBasePath())

//const fff =  GET_newServerBasePath() ;
const config = {
  baseURL: serverBasePath + 'api'
 // baseURL :conf.state.newServerBasePath + 'api'

}

/**
 * Creating the instance of Axios
 * It is because in large-scale application, we may need
 * to consume APIs from more than a single server,
 */
const client = axios.create(config)

/**
 * Auth interceptors
 * @description Add auth tokens to every outgoing request.
 * @param {*} config
 */
const authInterceptor = config => {
//   config.headers.Authorization =localStorage.getItem("KEY")
//   config.headers.USER_CODE=localStorage.getItem("USER_CODE")
//   config.headers.VERSION=VERSION
//   config.headers.common.Accept = 'Application/json'
 config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}

/**
 * Logger interceptors
 * @description Log app requests.
 * @param {*} config
 */
const loggerInterceptor = config =>
/** Add logging here */
  config

/** Adding the request interceptors */
client.interceptors.request.use(authInterceptor)
client.interceptors.request.use(loggerInterceptor)

/** Adding the response interceptors */
client.interceptors.response.use(
  
  response => Promise.resolve(response),
  error => {
    // Event.$emit('error', 500, error.response.data.message)
      if (error.response.status === 401){ 
        alert("لقد تم الدخول بهذا المستخدم على جهاز اخر")
        console.error(error)
        router.push('/')
      
      }
        else if (error.response.status === 501){ 
          alert("ctrl+f5 لقد تم التحديث برجاء الضغط على ")
          console.error(error)
          router.push('/')}
           else if (error.response.status === 301){ 
             
             alert("لقد تم اعادة تشغيل الخادم الرئيسى برجاء الدخول مجددا")
             console.error(error)
             router.push('/')
           }
    // const errorMessage = error.response.data.message
    // error.response.data.message = errorMessage.length > 200
    //   ? JSON.parse(errorMessage.split('code :').pop()).error.message.split(':')[0]
    //   : errorMessage
    
    
    throw error
    // Promise.reject(error)
  }
)

export default client