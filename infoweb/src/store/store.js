import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, logoutUser } from '@/api/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    status: '',
    // token: localStorage.getItem('token') || '',
    user: {},
    searchCode: null
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    // auth_success(state, token, user) {
    //   state.status = 'success';
    //   state.token = token;
    //   state.user = user;
    // },
    auth_success(state, user) {
      state.status = 'success';
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      //   state.token = '';
    },
    search(state, searchValue) {
      state.searchCode = searchValue
    }
  },
  actions: {
    search({ commit }, searchValue) {
      commit('search', searchValue)
    },
    Login({ commit }, user) {
      return new Promise((resolve, reject) => {
        const { userName, passWord } = user
        // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
        loginUser({ userName: userName.trim(), passWord: passWord })
          .then(res => {
            //   const token = resp.data.token
            localStorage.setItem('user', res.data.data.userName)
            //   localStorage.setItem('token', token)
            // 每次请求接口时，需要在headers添加对应的Token验证
            //   axios.defaults.headers.common['Authorization'] = token
            // 更新token
            //   commit('auth_success', token, user)
            commit('auth_success', res.data.data)
            resolve(res)
          })
          .catch(err => {
            commit('auth_error')
            //   localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logoutUser({ userName: localStorage.getItem('user')})
          .then(response => {
            localStorage.removeItem('user');
            commit('logout')
            // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
            // delete axios.defaults.headers.common['Authorization'];
            resolve(response)
          })
          .catch(error => {
            commit('auth_error')
            reject(error)
          })
      })
    }
  },
  getters: {
    // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false
    // isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});

export default store;