<template>
    <div>
        <!--顶部滑动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id === 0 ? 'mui-active':'']" v-for="item in cates" :key="item.id"
                    @tap="getPhotoListByCateId(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>

                </div>
            </router-link>
        </ul>
    </div>

</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        data(){
            return {
                cates:[],//所有分类的列表数据
                list:[]//图片列表数据
            };
        },
        created(){
            this.getAllCategory();
            //默认进入页面就主动请求获取图片数据
            this.getPhotoListByCateId();
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
            },
            getPhotoListByCateId(cateid){
                this.$http.get('api/getimage/'+cateid).then(result=>{
                    if(result.body.status ===0){
                        this.list = result.body.message;
                    }
                })
            }

        }
    }


</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;
}

.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999 ;
        position: absolute;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}

</style>