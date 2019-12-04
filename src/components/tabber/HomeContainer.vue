<template>
    <div>
        <!--轮播图信息-->
        <mt-swipe :auto="4000">
            <!--在组件中使用v-for一定要使用key-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>

        </mt-swipe>
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
                            //console.log(result.body.meessage.url)
                            this.lunbotuList = result.body.message;
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
        height: 400px;

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
</style>