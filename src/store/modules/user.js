import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let res = await login({ username: username.trim(), password: password });
    if (res.code == 20000 || res.code == 200) {
      commit('SET_TOKEN', res.data.token);
      setToken(res.data.token)
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    let res = await getInfo(state.token);
    if (res.code == 20000 || res.code == 200) {
      commit('SET_NAME', res.data.name)
      commit('SET_AVATAR', res.data.avatar)
      return 'ok';
    } else {
      return Promise.reject(new Error('Verification failed, please Login again.'));
    }
  },

  // user logout
  async logout({ commit, state }) {
    let res = await logout(state.token);
    if (res.code == 20000 || res.code == 200) {
      removeToken();
      commit('RESET_STATE');
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

