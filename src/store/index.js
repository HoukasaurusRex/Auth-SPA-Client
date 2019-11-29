import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getCookie, deleteCookie } from '../utils/cookies'

Vue.use(Vuex)
const baseURL = process.env.VUE_APP_API_ORIGIN

export default new Vuex.Store({
  state: {
    baseURL,
    authPayload: getCookie('auth.payload'),
    service: axios.create({
      // Must include credentials in request¡
      // to allow cross origin response to set cookies
      withCredentials: true,
      baseURL,
      timeout: 5000,
      headers: {
        common: { Authorization: getCookie('auth.payload') }
      }
    }),
    status: ''
  },
  getters: {
    getAuthPayload: state => state.authPayload,
    isAuthenticated: state => !!state.authPayload,
    getStatus: state => state.status,
    baseURL: state => state.baseURL
  },
  mutations: {
    AUTH_LOADING: state => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: state => {
      state.status = 'success'
      state.authPayload = getCookie('auth.payload')
      state.service.defaults.headers.common['Authorization'] = state.authPayload
    },
    AUTH_ERROR: state => {
      state.status = 'error'
      deleteCookie('auth.payload')
    }
  },
  actions: {
    AUTH_LOGIN: async ({ commit, state }, user) => {
      try {
        commit('AUTH_LOADING')
        const res = await state.service.post('/auth/email', user)
        const { data } = res
        commit('AUTH_SUCCESS')
        return data
      } catch (error) {
        console.error(error.message)
        commit('AUTH_ERROR', error)
        return error
      }
    },
    AUTH_LOGOUT: ({ commit, dispatch }) => {
      commit('AUTH_LOADING')
      deleteCookie('auth.payload')
      commit('AUTH_SUCCESS')
      return 'logged out'
    },
    AUTH_VERIFY: async ({ commit, state }) => {
      try {
        commit('AUTH_LOADING')
        const res = await state.service.get('/auth/verify')
        const { data } = res
        commit('AUTH_SUCCESS')
        return data
      } catch (error) {
        console.error(error.message)
        commit('AUTH_ERROR', error)
        return error
      }
    },
    TEST_ROUTE: async ({ commit, state }, options) => {
      try {
        const res = await state.service.post(options.url, options.payload)
        const { data } = res
        return data
      } catch (error) {
        console.error(error.message)
        return error
      }
    }
  },
  modules: {}
})
