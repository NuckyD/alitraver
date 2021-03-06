import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入vux
import store from './store/store.js'
Vue.prototype.$store = store

// 引入tab切换的loading
import loader from './element/loading.vue'
Vue.component('load-list',loader)

// 引入没有数据的提示
import nonedata from './element/none.vue'
Vue.component('none-data',nonedata)

// 进入页面的loading加载
import homeload from './element/homeload.vue'
Vue.component('home-load',homeload)

// 引入css3动画插件
import animate from 'animate.css'
Vue.use(animate)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
