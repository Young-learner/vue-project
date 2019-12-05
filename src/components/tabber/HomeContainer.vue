<template>
    <div>
        <!--轮播图信息-->
        <mt-swipe :auto="4000">
            <!--在组件中使用v-for一定要使用key-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!--九宫格到六宫格的改造-->

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">
                        新闻资讯
                    </div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
        <h3>homecontainer组件</h3>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
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
                this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(
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
        }
    }
</script>

<style scoped lang="scss">
    .mint-swipe{
        height: 200px;

        .mint-swipe-item{
            &:nth-child(1){
                background-color: red;
            }
            &:nth-child(2){
                background-color: blue;
            }
            &:nth-child(3){
                background-color: gold;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
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