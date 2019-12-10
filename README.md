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
   
    
##发表评论
1.把文本框做双向数据绑定
2.为发表按钮绑定一个事件
3.校验评论内容是否为空,如果为空,则通过toast提示用户,内容不能为空
4.通过vue-resource发送一个请求,把评论的内容提交给服务器
5.当发表评论后,重新刷新评论,查看最新的评论内容
    +如果调用getComments方法重新刷新评论列表，只能得到最后一页的评论内容，前面的数据无法得到
    +所以:我们在评论成功后,在客户端手动拼接出一个最新的评论对象,然后调用数组的unshift方法,把最新评论追加到data中的comments的开头
   

##改在图片分享按钮为路由的链接并显示对应的组件页面

##绘制图片列表组件页面结构并美化样式
1.制作顶部的滑动条
2.制作底部的图片列表 

###制作顶部滑动条： 
1.需要借助于mui中的tab-top-webview-main.html
2.需要把alider 区域中的mui-fullscreen去掉
3.滑动条无法正常触发滑动,通过查看官方文档,发现这是js组件需要初始化
    
    +导入mui.js
    +调用官方提供的初始化的方式
    '''
    mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    '''
4.在初始化滑动条的时候,导入mui.js报错
    +解决方法:1.把mui.js中的非严格模式的代码改动 --不现实;2.禁用webpack中的严格模式
    +移除严格模式方法:使用transform-remove-strict-mode插件
5.刚进入图片分享页面滑动条无法工作,如果要初始化滑动条,必须要DOM元素加载完毕
    必须要等DOM元素加载完毕,所以把滑动条的代码放到mounted函数中
6.当滑动条调试好后,发现tabber无法正常工作,这时候我们需要把每个tabber按钮中的样式'mui-tab-item'重新改名
7.获取所有分类并渲染分类列表


###制作图片列表区域
1.图片列表需要懒加载技术,在mint-ui中可以找到现成的组件
2.根据文档使用'lary-load'
3.渲染图片列表数据


###实现了图片列表的懒加载改造和样式美化

##实现了点击图片跳转到图片详情页面
1.在改造li成router-link时要使用tag属性指定渲染标签

##实现详情页面的布局和美化,同时获取数据渲染页面

##实现图片详情中缩略图的功能
1.使用插件vue-preview这个缩略图插件
2.获取到所有的图片列表,然后使用v-for指令渲染数据
3.注意:img标签上的class不能去掉
4.注意；每个图片数据对象中必须有w和h属性


##绘制商品列表并美化


##尝试在手机端去进行项目的预览和调试
1.要保证自己的手机可以正常运行
2.要保证手机和开发项目的电脑处于同一个wifi环境中,也就是说手机可以访问到电脑的ip
3.打开项目中的package.json文件在dev脚步中,添加一个 --host指令,把当前电脑的wifi ip地址　设置为--host指令
    +如何查看自己电脑wifi IP:在终端中输入ifconfig指令
    