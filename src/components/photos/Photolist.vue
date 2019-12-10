<template>
    <div>
        <!--顶部滑动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id== 0 ? 'mui-active':'']" v-for="item in cates" :key="item.id">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'



    export default {
        data(){
            return {
                cates:[],//所有分类的列表数据
            };
        },
        created(){
            this.getAllCategory();
        },
        mounted(){//当组件中的Dom结构被渲染并放到页面中,会执行这个钩子函数
            mui('.mui-scroll-wrapper').scroll({
                 deceleration: 0.0005
            });
        },
        methods:{
            getAllCategory(){
                //获取所有图片分类
                this.$http.get('api/getmgcategory').then(result=>{
                    if(result.body.status === 0){
                        //手动拼接完整列表
                        result.body.message.unshift({
                            title:'全部',
                            id:0
                        });
                        this.cates = result.body.message;
                    }
                })
            }

        }
    }


</script>

<style>
*{
    touch-action: pan-y;
}

</style>