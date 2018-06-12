# EditToolBar
css + javascript实现的可拖动工具条

写在前面：
====
该工具条中的水波纹特效非原创，是从[`幸凡学习网`](http://www.86y.org/art_detail.aspx?id=828)拿到的，网址：http://www.86y.org/art_detail.aspx?id=828

项目介绍：
====
一个简单易用的可拖动工具条控件，可自定义性强，使用时只需传入一组数据即可自动生成所需按钮。
<br>地图渲染引擎为[`leaflet`](https://leafletjs.com/)，使用按钮图标库为[`Font Awesome`](https://fontawesome.com/?from=io),项目使用了`JQuery`库<br>

兼容性
====
已测试Google Chrome浏览器、 FireFox浏览器、IE11浏览器可用，其他浏览器请自测

效果预览
====
![Image text](https://raw.githubusercontent.com/Victorfy1214/EditToolBar/master/preview/GIF.gif)

使用方法
====
请参照leaflet官网自行创建地图

引用样式`EditTool.css`文件
```html
 <link rel="stylesheet" href="css/EditTool.css"><link>
 ```
 引用font-awesome样式
 ```html
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
 ```
 引用JQuery库
 ```html
 <script src="js/jquery.min.js"></script>
 ```
 在`body`标签中添加如下标签
 ```html
<!--工具条-->
<div class = "tool_border">
    <div class = "drag_bar" title="按住拖动">
        <i class="fas fa-toolbox toolbox_icon"></i>
    </div>
</div>
 ```
 引用`EditTool.js`文件
  ```html
 <script src="js/EditTool.js"></script>
 ```
 
 新建EditTools对象
 ```javascript
 let mToolBar = new EditTools();
 ```
 创建工具条的按钮内容，根据您的需求定制
 ```javascript
    //工具条内容:按钮标识ID、按钮内容、按钮所对应的Font Awesome图标代码，此代码为4组按钮的数据
    let content = [['NewBtn','新建按钮','far fa-file'],
                    ['SaveBtn','保存按钮','far fa-save'],
                    ['DeleteBtn','删除按钮','far fa-trash-alt'],
                    ['EditBtn','编辑按钮','far fa-edit']];
 ```
 将内容传入工具条接口中
 ```javascript
    //设置工具条内容
    mToolBar.setToolBarContent(content);
 ```
 将初始化按钮状态，传入按钮的Id和启用状态，true为可用状态，false为不可用状态
 ```javascript
    //开启工具条的新建按钮
    mToolBar.setButtonEnable('NewBtn',true);
    //开启工具条的保存按钮
    mToolBar.setButtonEnable('SaveBtn',true);
 ```
 添加工具条按钮的的监听回调函数
 ```javascript
   //设置按钮监听
    mToolBar.ButtonClickListener(function(id){
        switch (id) {
            case "NewBtn"://新建按钮
                console.log(id);
                break;
            case "SaveBtn"://保存按钮
                console.log(id);
                break;
            case "DeleteBtn"://删除按钮
                console.log(id);
                break;
            case "EditBtn"://编辑按钮
                console.log(id);
                break;
            default:
                break;
        }
    });
 ```
 设置工具条是否显示
 ```javascript
   //设置工具条是否显示，true为显示，false为不显示，不调用该方法默认不显示工具条
    mToolBar.setToolBarDisplay(true);
 ```
封装方法介绍
====

* `setToolBarContent`： 此监听方法用于设置按钮的内容，参数`param`，传入你的按钮信息数组
* `setToolBarDisplay`：该方法用于控制工具条的显示，参数`param`，true未显示，false为不显示
* `setButtonEnable`：该方法用于启用工具条按钮，包含两个参数`ID`和`param`，ID传入要设置状态的按钮id,param控制是否启用，true为启用，false为不启用
* `ButtonClickListener`：该方法用于接收工具条按钮的结果回调
