import VueRouter from 'vue-router'
//导入路由组件
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MembereContainer.vue'
import ShopcarContainer from './components/tabber/ShopcarContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'

//创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer}
    ],
    linkActiveClass:'mui-active'//覆盖默认路由高亮的类
});

//把路有对象暴露出去
export default router