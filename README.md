#这是一个学习vue所做的项目

##学习中...........

##首次提交　请指教.......

##制作首页app组件　
1.完成Header区域,使用的是mint-ui 中的Header组件
2.制作底部的Tabber区域,使用的是mui中的Tabber.html
    +在制作购物车小图标时,操作会相对多一些:
        +先把扩展图标的css样式,拷贝到项目中
        +拷贝扩展字体库ttf文件到项目中
        +为购物车小图标提交icon 类
3.要在中件区域放置一个router-view来展示匹配到的组件 


##改造tabber 为 router-link****


##设置路由为高亮

##点击tabber中的路由链接展示对应的路由组件

##加载首页轮播图数据
1.获取数据，如何获取,使用vue-resourse
2.使用vue-resourse的this.$http.get获取数据
3.获取的数据,要保存到data
4.使用v-for循环渲染每个item项

##改造九宫格区域的样式

##改造新闻咨询路由链接

##新闻资讯页面制作
1.绘制页面 使用MUI中的media-list.html
2.使用vue-resource获取数据
3.渲染真实数据

##实现新闻资讯列表点击跳转新闻详情
1.把列表中的每一项改造为router-link　同时在跳转的时候应该提供唯一的id标识符
2.创建新闻详情的组件页面 newsinfo.vue
3.在路由模块中将新闻详情的路由地址和组件页面对应起来

##实现新闻详情的页面布局和数据渲染

##单独封装一个comment.vue　评论子组件
1.先创建一个单独的comment.vue组件模板
2.在需要使用comment组件的页面中,先手动导入comment组件
3.在父组件中,使用'components'属性,将导入的comment组件注册为自己的子组件
4.将注册子组件时候的注册名称,以标签形式在页面中引用

##获取所有评论数据显示到页面中

##实现点击加载更多评论的功能
1.为加载更多按钮,绑定加载事件,在事件中请求下一页数据
2.点击加载更多,让pageindex++,然后重新获取最新一页的数据
3.为了防止新数据覆盖老数据的情况,我们在点击获取加载更多的时候,每当获取到了新数据应该让老数据调用数组的concat方法拼接上新数据