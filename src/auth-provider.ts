// this file is not required if using third-party authentification service like firebase 
import { User } from "screens/project-list/search-panel"

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__"

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.accessToken || "")
  return user
}

export const login = (data: {username: string, password:string}) => {
  return fetch(`${apiUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    }else {
      return Promise.reject(await response.json()) // similar to "throw a new error" 
    }
  })
} 


export const register = (data: {username: string, password:string, email:string}) => {
  return fetch(`${apiUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
} 

export const logout = async () => window.localStorage.removeItem(localStorageKey)