//入口文件
import Vue from 'vue'
//导入app根组件
import app from './App.vue'
//导入vue-router路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter);

//安装vuex
import Vuex from 'vuex'
Vue.use(Vuex);

// 由于没有对数据进行持久化存储,所以在每次进入页面时数据会被清空
//可以使用本地数据存储,在每次进入网页时先从本地存储中读取数据显示

var car = JSON.stringify(localStorage.getItem('car')||'[]');

localStorage.getItem('car',);

var store = new Vuex.Store({
    state:{//this.$store.state.**
        car:[]//将购物车中的商品数据,用一个数组存储起来,在car数组中存储一些商品对象
                //例：{id:商品的id,count:购买的数量,price:商品的价格,select:false}
    },
    mutations:{//this.$store.commit('方法的名称','按需传递的唯一的参数')
        addToCar(state,goodsinfo){
            //点击加入购物车,把商品信息保存到state中的car上
            /*分析
            * 1.如果购物车中之前已经有这个商品对应的信息,那么只需要更新数量
            * 2.如果没有则直接吧商品数据push到car中即可*/

            //默认在购物出是没有找到对应的商品
            var flag = false;

            state.car.some(item=>{
                if (item.id === goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true
                }
            });

            //如果循环完毕得到的flag还是false,则把商品数据直接push到购物车中　
            if (flag === true) {
                state.push(goodsinfo)
            }

            //当更新car中的数据之后把数据存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品的数量值
            /*分析
            * 1.*/
            state.car.some(item=>{
                if (item.id === goodsinfo.id){
                    item.count = parseInt(goodsinfo.id);
                    return true
                }
            });
            //每次商品数量被修改后,把最新的数量存储在本地中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        removeFromCar(state,id){
            //根据id,删除购物车中对应的商品信息
            state.car.some((item,i)=>{
                if (item.id === id){
                    state.car.splice(i,1);
                    return true
                }
            });
            //同步最新数据到本地存储
            localStorage.setItem('car',JSON.stringify(state.car));

        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if (item.id === info.id){
                    item.selected = info.selected;
                }
            });
            //同步最新商品的状态
            localStorage.setItem('car',JSON.stringify(state.car));
        }

    },
    getters:{//this.$store.getters.**
        //相当于计算属性,也相当于过滤器
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count;
            });
            return c
        },
        getGoodsCount(state){
            var o = [];
            state.car.forEach(item=>{
                o[item.id]=item.count;
            });
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id] =item.selected;
            });
            return 0;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,//勾选的数量
                amount:0 //勾选的总价
            };
            state.car.forEach(item=>{
                if (item.selected){
                    o.count += item.count;
                    o.amount += item.price * item.count;  
                }
            });
            return o;
        }
    }
});

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
/*import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//按需导入mint-ui中的组件
import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);*/
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi);

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);


//导入路由模块
import router from './router.js'


var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router,//挂载路由对象
    store //挂载store
});