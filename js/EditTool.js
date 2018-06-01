    //工具框
    let tool_body = $('.tool_border');
    //拖动块的对象
    let Drag_ToolBar = $('.drag_bar');
    //整个窗体对象
    let window_obj = $(window);

    //记录初始点击时进度条的位置
    let divLeft,divTop;

    /*水波纹动画*/
    let addRippleEffect = function (e) {
        let target = e.currentTarget;
        if (!target.className.toLowerCase().indexOf('ripple-btn'))
            return false;
        let rect = target.getBoundingClientRect();
        let ripple = target.querySelector('.ripple');
        if (!ripple) {
            ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
            target.appendChild(ripple);
        }
        ripple.classList.remove('show');
        let top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
        let left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        ripple.classList.add('show');
        return false;
    };


    //定义函数方法
    function EditTools(){}

    //定义控制条内容
    EditTools.prototype.setToolBarContent = function (param) {
        let $ButtonFromStr;
        let totalWidth = 0;
        for(let v = 0; v < param.length ; v++){
            if(v !== param.length -1)
                $ButtonFromStr = $('<div id = "' +param[v][0] + '" class = "button-pattern button-pattern-border ripple-btn icon-color" title="按钮不可用" enable = "false">' +
                '<i class="'+param[v][2] +' icon-size"></i>' +
                '<span>'+param[v][1] + '</span>' +
                '</div>');
            else
                $ButtonFromStr = $('<div id = "' +param[v][0] + '" class = "button-pattern ripple-btn icon-color" title="按钮不可用" enable = "false">' +
                    '<i class="'+param[v][2] +' icon-size"></i>' +
                    '<span>'+param[v][1] + '</span>' +
                    '</div>');
            $ButtonFromStr.appendTo(tool_body);
            totalWidth = totalWidth + $ButtonFromStr.width() * 1.32;

        }
        //自动计算并设置工具条长度
        let width = window_obj.width();
        tool_body.width(totalWidth);
        tool_body.css('left',(width - totalWidth)/2);
    };

    //定义是否显示工具框的接口
    EditTools.prototype.setToolBarDisplay = function (param) {
        setToolDisplayMode(param);
    };


    //定义是否启用保存按钮的接口
    EditTools.prototype.setButtonEnable = function (ID,param) {
        setButtonState(ID,param);
    };

    //定义是否启用编辑按钮的接口
    EditTools.prototype.ButtonClickListener = function (CallBack) {

        $('.button-pattern').each(function(e) {
            $(this).on("click", function(e) {
               if($(this).attr('enable') === "true")
                   CallBack($(this).attr('id'));
            });
        });
    };

    //根据输入选择id和参数确定是否启用按钮
    function setButtonState(id,param) {
        const selector = '#' + id;
        const Button_obj = $(selector);

        const ButtonIcon_obj = $(selector).children('i');//这个是图标
        const ButtonContent_obj = $(selector).children('span');//这个是内容

        if(param === true){
            Button_obj.on('click',addRippleEffect);
            ButtonIcon_obj.css('color',"rgba(0,120,168,1)");
            ButtonContent_obj.css('color',"rgba(34,34,34,1)");
            Button_obj.attr('title',"按钮可用");
            Button_obj.attr('enable',"true");
        }else{
            Button_obj.off('click');
            ButtonIcon_obj.css('color',"rgba(0,0,0,0.2)");
            ButtonContent_obj.css('color',"rgba(0,0,0,0.2)");
            Button_obj.attr('title',"按钮不可用");
            Button_obj.attr('enable',"false");
        }
    }

    //设置工具条是否显示的函数
    function setToolDisplayMode(param){
        if(param === true){
            tool_body.css('visibility','visible');
        }else{
            tool_body.css('visibility','hidden');
        }
    }

    //工具条拖拽方法，绑定鼠标按下事件
    Drag_ToolBar.on('mousedown',MouseDown_ToolBar);

    function MouseDown_ToolBar(event){

        window_obj.on('mousemove',MouseMove_ToolBar);
        window_obj.on('mouseup',MouseUp_ToolBar);

        let e = event || window.event;//兼容event事件处理
        let main_div = tool_body.offset();
        divLeft = e.clientX - main_div.left;
        divTop = e.clientY - main_div.top;
        //阻止事件冒泡
        return false;
    }
    //鼠标移动时的执行函数
    function MouseMove_ToolBar(event){
        let e = event || window.event;//兼容event事件处理
        let pDiffX = e.clientX - divLeft;
        let pDiffY = e.clientY  - divTop;

        tool_body.css('left',pDiffX);
        tool_body.css('top',pDiffY);
    }
    //鼠标按键抬起时的执行函数
    function MouseUp_ToolBar() {
        window_obj.off('mousemove');
        window_obj.off('mouseup');
    }