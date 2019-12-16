<template>
    <div class="goodsinfo-container">

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量: <numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsinfo.goods_no}}</p>
                    <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间:{{goodsinfo.add_tiem|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
               <mt-button type="primary" size="large" plain="" @click="goDesc(id)">图文介绍</mt-button>
               <mt-button type="danger" size="large" plain="" @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>

</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    //导入数字选择框组件
    import numbox from '../subcomponents/goodsinfo_numbox.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id, //将路由参数中的id挂载在data上方便调用
                lunbotu:[],//轮播图的数据
                goodsinfo:[],//商品信息
                ballFlag:false,//控制小球显示和隐藏
                selectedCount:1//保存用户选中的商品数量,默认为1
            }
        },
        created(){
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status === 0){
                        //先循环轮播如数组的每一项,为item添加img属性,因为轮播图组件中
                        //只认识item.img
                        //this.lunbotu = result.body.message;
                        result.body.message.forEach(item=>{
                            item.img = item.src;
                        });
                        this.lunbotu = result.body.message;
                    }
                })
            },
            getGoodsInfo(){
                //获取商品信息
                this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.goodsinfo = result.body.message[0];
                    }
                })
            },
            goDesc(id){
                //点击跳转到图文介绍页面
                this.$router.push({name:'goodsdesc',params:{id}})
            },
            goComment(id){
                //点击跳转到评论页面
                this.$router.push({name:'goodscomment',params:{id}})
            },
            addToShopCar(){
                //添加到购物车
                this.ballFlag =! this.ballFlag;
                //拼接出一个要保存到stroe中car 数组的商品对象
                var goodsinfo = {
                    id:this.id,
                    count:this.selectedCount,
                    price:this.goodsinfo.sell_price,
                    selected:true
                };
                //调用store中的mutation来将商品加入购物车
                this.$store.commit("addToCar",goodsinfo);
            },
            beforeEnter(el){
                el.style.transfrom = "translate(0,0)";

            },
            /*小球动画优化思路
            * 1.先分析导致动画不准确的本质原因: 我们把小球最终移动到的位置，已经局限到了某一分辨率下
            * 　所有滚动条没有滚动的情况下
            * 2.只要分辨率和测试时不一样,或者滚动条发生位移后小球会发生变化
            * 3.所以不能把位置的坐标写死,而是应该根据不同情况,动态计算坐标值
            * 4.解决方案；先得到徽标的横纵坐标,再得到小球的横纵坐标,求出x,y轴的坐标差
            * 5.如何获取坐标差*/
            enter(el,done){
                el.offsetWidth;
                //获取小球在页面中的位置
                const ballPosition = this.$ref.ball.getBoundingClientRect();
                //获取徽标在页面中的位置
                const bagePosition = document.getElementById('badge').getBoundingClientRect();
                const xDist = bagePosition.left - ballPosition.left;
                const yDist = bagePosition.top - bagePosition.top;

                el.style.transfrom = "translate(${xDist}px,${yDist}px)";
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done()

            },
            afterEnter(el){
                this.ballFlag =! this.ballFlag;
            },
            /*如何实现小球加入购物车,拿到选择的数量
            * 1.经过分析:按钮属于goodsinfo页面,数字属于numbox组件
            * 2.由于涉及到了父子组件的嵌套,所以无法直接在页面中获取选中商品的数量值
            * 3.时间调用的本质;父向子传递方法,子调用这个方法,同时吧数据当做参数传递过来*/
            getSelectedCount(count){
                //当子组件把选中传递给父组件的时候,吧选中的值保存到data上
                this.selectedCount = count
            }

        },
        components:{
            swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
}

</style>