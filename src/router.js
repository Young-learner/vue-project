import VueRouter from 'vue-router'
//导入路由组件
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MembereContainer.vue'
import ShopcarContainer from './components/tabber/ShopcarContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'
import NewsList from './components/news/newlist.vue'
import NewsInfo from './components/news/newsinfo.vue'
import PhotoList from './components/photos/Photolist.vue'
import PhotoInfo from './components/photos/Photoinfo.vue'

//创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/PhoteList',component:PhotoList},
        {path:'/home/PhotoInfo/:id',component:PhotoInfo},
    ],
    linkActiveClass:'mui-active'//覆盖默认路由高亮的类
});

//把路有对象暴露出去
export default router