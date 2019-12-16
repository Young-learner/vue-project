<template>
    <div class="shopcar-container">

        <!--商品列表区域-->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">¥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="" @click.prevent="remove(item.id,i)">删除</a>
                                <!--问题:如何从购物陈中获取商品的数量-->
                                <!--1.我们可以先创建一个空对象然后循环购物车所有商品的数据
                                    ,把当前循环这条商品的id作为对象的属性名,count值作为对象的属性值
                                   当把所有的商品循环一遍后,就会得到一个对象-->
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--结算区-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>以勾选商品
                            <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>
                            件,总价:¥
                            <span class="red">{{$store.getters.getGoodsCountAndAmount.amount }}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'
    export default {
        data(){
            return {
                goodslist:[]//购物车中所有商品的数据
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                /*1.获取到states中所有的商品id,然后拼接出一个用逗号分隔的字符串*/
                var idArr = [];
                this.$store.state.car.forEach(item=>idArr.push(item.id));
                //如果购物车中没有商品,则直接返回不需要请求接口
                if (idArr.length <= 0){
                    return;
                }
                //获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")
                    .then(resutl=>{
                        if (resutl.body.status === 0){
                            this.goodslist = resutl.body.message;
                        }
                    })
                )
            },
            remove(id,index){
                //点击删除,把商品从store中根据传递的id删除,同时吧当前组件中的goodslist中对应要删除的商品,使用index删除
                this.goodslist.splice(index,1);
                this.$store.commit('removeFromCar',id);
            },
            selectedChanged(id,val){
                //每当点击开关将最新的开关状态同步到store中
                this.$store.commit('updateGoodsSelected',{id,selected:val});
            }
        },
        components:{
            numbox
        }
    }

</script>

<style scoped lang="scss">
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>