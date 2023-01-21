import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;


interface Config extends RequestInit {
  endpoint:string,
  token?: string,
  data?: object
}

export const http = async ({endpoint, data, token, headers, ...customConfig}: Config) => {
  const config = {
    method: 'GET', // default value of method is 'GET' but could be overwritten by method parameter in customConfig 
    headers: {
      Authorization: token ? `Bearer ${token}`: '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig
  }
  /*
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `\/${qs.stringify(data)}`
  } else if (config.method.toUpperCase) {
    config.body = JSON.stringify(data || {})
  }
  */
  if (config.method.toUpperCase() === "POST") {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload() // refresh the current page 
      return Promise.reject({message: "Please login again!"})
    }

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      // fetch api does not throw errors when not 200s code, since 400s and 500s are also normal states 
      // it throws error in conditions such abnormal network traffics  
      // axios is different from fetch, axios could throw error when response is 400s or 500s 
      return Promise.reject(data)
    }
  }) 

}

export const useHttp = () => {
  const {user} = useAuth()
  // TS Utility type, eg. Parameter 
  return (config:Config) => http({...config, token:user?.accessToken})
} 
