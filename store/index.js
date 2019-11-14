export const state = () => {
  return {
    taxRate: 0.05,
    isLogin: false
  }
}

export const mutations = {
  LOGIN_SUCCESS(state, payload) {
    state.userinfo = payload
    state.isLogin = true
    window.sessionStorage['session'] = JSON.stringify(state.userinfo)
  },
  LOGOUT_SUCCESS(state) {
    state.userinfo = null
    state.isLogin = false
    window.sessionStorage.removeItem('session')
  },
  MODIFY_SUCCESS(state, payload) {
    state.userinfo = {
      ...state.userinfo,
      ...payload
    }
    window.sessionStorage['session'] = JSON.stringify(state.userinfo)
  }
}
