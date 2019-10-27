export const state = () => {
  return {
    taxRate: 0.1
  }
}

export const mutations = {
  LOGIN_SUCCESS(state, payload) {
    state.userinfo = {
      ...state.userinfo,
      ...payload
    }
    window.sessionStorage['session'] = JSON.stringify(state.userinfo)
  },
  LOGOUT_SUCCESS(state) {
    state.userinfo = null
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
