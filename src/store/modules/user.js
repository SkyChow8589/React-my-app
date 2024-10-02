// 和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { setToken as _setToken, getToken } from '@/utils'

const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    }
  }
})

// 解构出actionCreater
const { setToken, setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. 发送异步请求
    const res = await request.post('/authorizations', loginForm)
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

// 异步方法获取用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin, fetchUserInfo, setToken }

export default userReducer