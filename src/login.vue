<template>
    <h1>这是通过.vue创建出来的组件</h1>
</template>

<script>
    export default{
        data(){//注意:组件中的ｄａｔａ必须是function
            return {
                msg:'123'
            };
        },
        methods:{
            show(){
                console.log("调用了login.vue中的show方法");
                }
            }
    }

</script>

<style>

</style>