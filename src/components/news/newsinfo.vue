<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time|dateFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>

        <hr>
    </div>

    <div class="content" v-html="newsinfo.content"></div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return {
                id:this.$router.params.id, //将url传递过来的id值,挂载到data上
                newsinfo:[]
            }
        },
        methods:{
            getNewsInfo(){//获取新闻详情
                this.$http.get('api/getnew/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.newsinfo = result.body.message[0];
                    }else {
                        Toast('获取新闻失败')
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: blue;
        }
        .subtitle{
            font-size: 13px;
            color: #000000;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>