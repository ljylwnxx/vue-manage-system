import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'

import router from './router'
import store from './store'
import http  from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 为了防止页面刷新之后vuex丢失我们的token信息
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== "login") {
    next({ name: "login" })
  } else if (token && to.name === "login") {
    next({ name: "home" })
  }
  else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  //调用动态设置路由的方法 解决刷新白屏的问题
  created() {
    store.commit("addMenu", router)
  }
}).$mount('#app')