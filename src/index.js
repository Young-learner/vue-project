//入口文件
import Vue from 'vue'
//导入app根组件
import app from './App.vue'
//导入vue-router路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter);

//导入vue-resource
import VueResurce from 'vue-resource'
//安装vue-resource
Vue.use(VueResurce);
//设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//设置全局post时候表单数据格式
Vue.http.options.emulateJSON = true;

//定义全局的过滤器
//导入过滤器组件
import moment from 'moment'
Vue.filter('dateFormat',function (dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
});


//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//按需导入mint-ui中的组件
import { Header, Swipe, SwipeItem,Button } from 'mint-ui'

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//导入路由模块
import router from './router.js'


var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router //挂载路由对象
});