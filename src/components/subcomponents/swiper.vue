<template>
    <div>
        <mt-swipe :auto="4000">
            <!--在组件中使用v-for一定要使用key-->
            <!--将来,谁要使用轮播图组件是传递lunbotuList-->
            <!--此时lunbotuList是父组件给子组件传值　-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>

        <!--分析 商品详情页面和首页轮播图的区别-->
        <!--1.在首页的轮播图图片中,图片的宽和高设置为了100%-->
        <!--2.在商品详情页面中,轮播图的图片,如果也使用宽高为100%,页面不好看-->
        <!--3.商品详情页面中的轮播图,期望高度是100%,宽度为自适应-->
        <!--4.经过分析得到问题的原因,首页中的轮播图和商品详情也的区别为宽度不同-->
        <!--解决方案:既然两个轮播图其他方面都没有区别,只是宽度不同,那么我们可以定义一个属性
            让不同调用者手动指定宽度-->
    </div>
</template>

<script>
    export default {
        props:["lunbotuList","isfull"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        text-align: center;

        .mint-swipe-item {
            img {
                height: 100%;
            }
        }
    }

    .full {
        width: 100%;
    }
</style>