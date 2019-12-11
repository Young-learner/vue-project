<template>
    <!--问题:max值不知道在哪个生命周期拿到-->
    <!--我们可以使用watch属性来监听父组件传递过来的max值,不管watch会被触发几次,最后一次
    肯定可以得到合法的max值-->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1"
               @change="countChange" ref="numbox">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        mounted() {
            //初始化数字选择框组件
            mui('.mui-numbox').numbox()
        },
        methods:{
            countChange(){
                //每当文本框的数据发生改变,立即传递给父组件
                this.$emit('getcount',parseInt(this.$refs.numbox.value))

            }
        },
        props:["max"],
        watch:{
            'max':function (newVal,oldVal) {
                mui(".mui-numbox").numbox().setOption('max',newVal);
            }
        }
        /*子组件什么时候把数据传递给父组件*/
    }
</script>

<style lang="scss" scoped>

</style>