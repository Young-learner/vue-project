<template>
    <div>
        <!--轮播图信息-->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

        <!--九宫格到六宫格的改造-->

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newlist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">
                        新闻资讯
                    </div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist ">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
        <h3>homecontainer组件</h3>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import swiper from '../subcomponents/swiper.vue'
    export default {
        data(){
            return {
                lunbotuList:[] //保存轮播图数组
            }
        },
        created(){
            this.getLunbotu();
        },
        methods:{
            getLunbotu(){//获取轮播图数据的方法
                this.$http.get("api/getlunbo").then(
                    result=>{
                        //console.log(result.body)
                        if(result.body.status === 0){
                            //获取数据成功
                            var message = result.body.message;
                            message.forEach(function (item) {
                                if(item["url"]){
                                    item["url"] = "http://www.itcast.cn/subject/webzly/index.shtml"
                                }else {
                                    console.log('获取数据失败')
                                }
                            });

                            this.lunbotuList = message;
                        }else {
                            //没有获取到数据
                            Toast('加载轮播图数据失败')

                        }
                    }
                )
            }
        },
        components:{
            swiper
        }
    }
</script>

<style scoped lang="scss">

    .mui-grid-view .mui-grid-9{
        background-color: #fff;
        border: 0;

        img{
            width: 60px;
            height: 60px;
        }
    }
    .mui-table-view-cell .mui-media{
        border: 0;
    }
</style>